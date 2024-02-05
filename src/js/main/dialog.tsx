import { useRef, useState } from "react";
import { fs, os, path } from "../lib/cep/node";
import { evalTS } from "../lib/utils/bolt";
import chroma from "chroma-js";

import "./dialog.scss";
import FormulaPreview from "./components/formulaPreview";

const crypto = require('crypto');

const Dialog = () => {
  const [formula, setFormula] = useState("");
  const [isInline, setIsInline] = useState(false);
  const formulaPreviewRef = useRef();

  type Color = {
    space: "rgb" | "cmyk" | "lab" | "mixedink" | "hsb" | "spotColor" | "patternColor" | "gradientColor";
    value: number[];
  }

  function colorConvert(color: Color) {
    let colorChrome: chroma.Color;
    switch (color.space) {
      case "rgb":
        colorChrome = chroma(color.value);
        break;
      case "cmyk":
        colorChrome = chroma(color.value.map((x: number) => x / 100), 'cmyk');
        break;
      case "lab":
        colorChrome = chroma.lab(color.value[0], color.value[1], color.value[2]);
        break;
      case "hsb":
        colorChrome = chroma.hsv(color.value[0], color.value[1], color.value[2]);
      default:
        throw new Error("This color space is not supported.");
    }
    return colorChrome.rgb(false).map((x: number) => x / 255);
  }

  async function insertFormula() {
    const color = await evalTS("getFontColor", false);
    let rgbColor;
    try {
      rgbColor = colorConvert(color);
    } catch (error) {
      // なぜかエラーが出るのでやむを得ず握りつぶす
      // 握り潰しても動作への影響はないと思われる
    }
    // @ts-ignore
    const svg: string = await formulaPreviewRef.current.exportSVG(rgbColor);
    const appName = await evalTS("getAppName", false);
    const uuid = crypto.randomUUID();
    switch (appName) {
      case "idsn":
        const isWin = process.platform == "win32" ? true : false;
        const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"] as string;
        let saveDir: string = await evalTS("getFormulasDirPath", isWin, homeDir);
        const saveFile = path.join(saveDir, `${uuid}.svg`);
        try {
          await evalTS("writeSVGFile", saveFile, svg)
        } catch (error) {
          // なぜかエラーが出るのでやむを得ず握りつぶす
          // 握り潰しても動作への影響はないと思われる
        }
        try {
          await evalTS("place", saveFile);
        } catch (error) {
          // なぜかエラーが出るのでやむを得ず握りつぶす
          // 握り潰しても動作への影響はないと思われる
        }
        break;

      case "ilst":
        const tmpdir = os.tmpdir();
        const tmpFile = path.join(tmpdir, `${uuid}.svg`);
        fs.writeFileSync(tmpFile, svg);
        try {
          await evalTS("place", tmpFile);
        } catch (error) {
          // なぜかエラーが出るのでやむを得ず握りつぶす
          // 握り潰しても動作への影響はないと思われる
        }
        fs.unlinkSync(tmpFile);
        break;
    }
    window.close();
  }

  return (
    <div className="dialog">
      <textarea
        className="formula_input"
        rows={3}
        onChange={(e) => {
          const cursorPos = e.currentTarget.selectionStart;
          const v = e.currentTarget.value.replaceAll("¥", "\\");
          setFormula(v);
          e.currentTarget.value = v;
          e.currentTarget.setSelectionRange(cursorPos, cursorPos);
        }}>
      </textarea>
      <FormulaPreview className={`formula_preview ${(isInline ? 'inline' : 'display')}`} formulaTxt={formula} isInline={isInline} ref={formulaPreviewRef}></FormulaPreview>
      <div className="controls">
        <div className="inline_check_box">
          <input
            type="checkbox"
            id="inlineCheck"
            checked={isInline}
            onChange={() => {
              setIsInline(prev => !prev);
            }}
          />
          <label htmlFor="inlineCheck">
            インライン
          </label>
        </div>
        <div className="buttons">
          <button className="cancel_button" onClick={() => window.close()}>Cancel</button>
          <button className="enter_button" onClick={insertFormula}>Enter</button>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
