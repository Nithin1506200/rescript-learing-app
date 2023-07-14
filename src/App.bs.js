

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as JsxRuntime from "react/jsx-runtime";
import * as Keypad$RescriptLearningApp from "./components/keypad/Keypad.bs.js";

function App(props) {
  var match = React.useState(function () {
        return false;
      });
  var setFocus = match[1];
  return JsxRuntime.jsxs("div", {
              children: [
                JsxRuntime.jsx("textarea", {
                      style: {
                        height: "30vh",
                        width: "50%"
                      },
                      onFocus: (function (param) {
                          Curry._1(setFocus, (function (param) {
                                  return true;
                                }));
                        }),
                      onBlur: (function (param) {
                          Curry._1(setFocus, (function (param) {
                                  return false;
                                }));
                        })
                    }),
                JsxRuntime.jsx(Keypad$RescriptLearningApp.make, {
                      listen: match[0]
                    })
              ],
              style: {
                display: "flex",
                columnGap: "3em",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }
            });
}

var make = App;

export {
  make ,
}
/* react Not a pure module */
