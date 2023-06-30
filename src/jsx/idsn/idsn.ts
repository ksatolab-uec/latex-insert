export const getAppName = () => {
  return "idsn";
}

export const getFontColor = () => {
  const color: {
    value: number[],
    space: "rgb" | "cmyk" | "lab" | "mixedink" | "hsb"
  } = {
    value: [0, 0, 0, 100],
    space: "cmyk"
  };
  // @ts-ignore
  const selection = app.selection[0];
  if (selection == undefined || selection == NothingEnum.NOTHING) {
    return color;
  }
  const fillColor: Color = selection.fillColor;
  const colorSpace = fillColor.space;
  const colorValue = fillColor.colorValue;
  color.value = colorValue;
  switch (colorSpace) {
    case ColorSpace.CMYK:
      color.space = "cmyk"
      break;
    case ColorSpace.RGB:
      color.space = "rgb"
      break;
    case ColorSpace.LAB:
      color.space = "lab"
      break;
    case ColorSpace.MIXEDINK:
      color.space = "mixedink"
      break;
    // @ts-ignore
    case ColorSpace.HSB:
      color.space = "hsb"
      break;
  }
  return color;
}

export const convertWinPath = (path: string) => {
  return path.replace("\\", "").replace("\\", ":\\");
}

export const convertPath = (path: string, isWin: boolean, homeDir: string) => {
  if (isWin) {
    return path.replace("/", "").replace("/", ":/");
  } else {
    if (path.slice(0, 1) == "~") {
      path = path.replace("~", homeDir);
    }
    return path;
  }
}

const getAssetsFolder = () => {
  const editingFile = app.activeDocument.filePath.fullName;
  const assetsFolder = Folder(`${editingFile}/Assets`);
  assetsFolder.create();
  return assetsFolder.fullName;
}

const getFormulasFolder = () => {
  const formulasFolder = Folder(`${getAssetsFolder()}/formulas`);
  formulasFolder.create();
  return formulasFolder.fullName;
}

export const getAssetsDirPath = (isWin: boolean, homeDir: string) => {
  return convertPath(getAssetsFolder(), isWin, homeDir);
}

export const getFormulasDirPath = (isWin: boolean, homeDir: string) => {
  return convertPath(getFormulasFolder(), isWin, homeDir)
}

export const place = (placeFilePath: string) => {
  const placeFile = File(placeFilePath);
  // @ts-ignore
  const selection = app.selection[0];
  if (selection != undefined && selection != NothingEnum.NOTHING) {
    selection.place(placeFile);
  } else {
    app.activeDocument.place(placeFile);
  }
}