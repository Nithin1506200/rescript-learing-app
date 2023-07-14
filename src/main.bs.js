

import * as React from "react";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.bs.js";
import * as Client from "react-dom/client";
import * as JsxRuntime from "react/jsx-runtime";
import * as App$RescriptLearningApp from "./App.bs.js";

import "./styles/Styles.css"
;

Client.createRoot(Core__Option.getExn(Caml_option.nullable_to_opt(document.querySelector("#root")))).render(JsxRuntime.jsx(React.StrictMode, {
          children: JsxRuntime.jsx(App$RescriptLearningApp.make, {})
        }));

export {
  
}
/*  Not a pure module */
