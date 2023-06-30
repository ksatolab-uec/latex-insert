// @include './lib/json2.js'

import { ns } from "../shared/shared";

import * as ilst from "./ilst/ilst";
import * as idsn from "./idsn/idsn";

let main: any;

switch (BridgeTalk.appName) {
  case "illustrator":
  case "illustratorbeta":
    main = ilst;
    break;
  case "indesign":
    main = idsn;
}
//@ts-ignore
const host = typeof $ !== "undefined" ? $ : window;
host[ns] = main;

export type Scripts = typeof ilst &
  typeof idsn;
