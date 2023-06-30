export const getAppName = () => {
  return "ilst";
}

export const getFontColor = () => {
  let color: {
    value: number[],
    space: "rgb" | "cmyk" | "lab" | "spotColor" | "patternColor" | "gradientColor"
  } = {
    value: [0, 0, 0, 100],
    space: "cmyk"
  }
  let fillColor = app.activeDocument.defaultFillColor;
  switch (fillColor.constructor) {
    case LabColor:
      const labColor = fillColor as LabColor;
      color = {
        value: [labColor.l, labColor.a, labColor.b],
        space: "lab"
      }
      break;
    case RGBColor:
      const rgbColor = fillColor as RGBColor;
      color = {
        value: [rgbColor.red, rgbColor.green, rgbColor.blue],
        space: "rgb"
      }
      break;
    case CMYKColor:
      const cmykColor = fillColor as CMYKColor;
      color = {
        value: [cmykColor.cyan, cmykColor.magenta, cmykColor.yellow, cmykColor.black],
        space: "cmyk"
      }
      break;
    case GrayColor:
      const grayColor = fillColor as GrayColor;
      color = {
        value: [0, 0, 0, grayColor.gray],
        space: "cmyk"
      }
      break;
    case NoColor:
      color = {
        value: [0, 0, 0, 100],
        space: "cmyk"
      }
      break;
    case SpotColor:
      color = {
        value: [],
        space: "spotColor"
      }
      break;
    case PatternColor:
      color = {
        value: [],
        space: "patternColor"
      }
    case GradientColor:
      color = {
        value: [],
        space: "gradientColor"
      }

  }
  return color;
}

export const place = (placeFilePath: string) => {
  const groupItems = app.activeDocument.groupItems;
  const placeItem = File(placeFilePath);
  // @ts-ignore
  groupItems.createFromFile(placeItem);
}