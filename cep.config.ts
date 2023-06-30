import { CEP_Config } from "vite-cep-plugin";
import { version } from "./package.json";


const config: CEP_Config = {
  version,
  id: "com.latex.insert.cep",
  displayName: "Latex.insert",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [
    {
      name: "ILST",
      version: "[0.0,99.9]"
    },{
      name: "IDSN",
      version: "[0.0,99.9]"
    }
  ],
  type: "Modeless",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 650,
  height: 350,
  minWidth: 500,
  minHeight: 350,
  maxWidth: 1300,
  maxHeight: 950,

  panels: [
    {
      mainPath: "./main/index.html",
      name: "main",
      panelDisplayName: "Latex.insert",
      autoVisible: true,
    },
  ],
  build: {
    jsxBin: "off",
    sourceMap: true,
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off",
  },
  installModules: [],
  copyAssets: [],
  copyZipAssets: [],
};
export default config;
