import { MathJax, MathJaxBaseContext } from "better-react-mathjax";
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"

const Formula = forwardRef((
  props: {
    className: string,
    formulaTxt: string,
    isInline: boolean
  },
  ref) => {
  const [fullFormula, setFullFormula] = useState("");
  const mjContext = useContext(MathJaxBaseContext);

  const buildFormula = (formula: string, isInline: boolean, rgbColor: number[] | null = null) => {
    let color = "";
    if (rgbColor != null) {
      color = `\\color[rgb]{${rgbColor.join(',')}}`;
    }
    if (isInline) {
      return(`\\begin{equation}\\textstyle ${color}${formula}\\end{equation}`)
    } else {
      return(`\\begin{align}${color}${props.formulaTxt}\\end{align}`)
    }
  }

  useImperativeHandle(ref, () => ({
    exportSVG: async function (rgbColor: number[]) {
      const mathJax = await mjContext?.promise as any;
      const formula = buildFormula(props.formulaTxt, props.isInline, rgbColor);
      const container = mathJax.tex2svg(formula);
      const [svg] = container.children;
      const svgString = (svg.outerHTML as string);
      return svgString;
    }
  }))

  useEffect(() => {
    setFullFormula(buildFormula(props.formulaTxt, props.isInline));
  }, [props]);
  return (
    <div className={props.className}>
      <p>
        <MathJax dynamic={true}>
          {fullFormula}
        </MathJax>
      </p>
    </div>
  );
});
export default Formula;
