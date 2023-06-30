import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import Dialog from "./dialog";
import { MathJaxContext } from "better-react-mathjax";

initBolt();

const config = {
  loader: {
    load: [
      '[tex]/physics'
    ]
  },
  tex: {
    inlineMath: [['$', '$']],
    packages: {
      '[+]': ['physics']
    }
  },
  svg: {
    fontCache: 'local'
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MathJaxContext version={3} config={config} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg-full.js">
      <Dialog></Dialog>
    </MathJaxContext>
  </React.StrictMode>
);
