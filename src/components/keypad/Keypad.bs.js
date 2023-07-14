

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as JsxRuntime from "react/jsx-runtime";
import * as KeypadModuleScss from "./Keypad.module.scss";
import MechMp3 from "../../assets/mech.mp3";

var style = KeypadModuleScss;

var mech_audio = MechMp3;

var qwertyKeys = {
  topRow: [
    {
      TAG: /* Single */0,
      _0: "Q"
    },
    {
      TAG: /* Single */0,
      _0: "W"
    },
    {
      TAG: /* Single */0,
      _0: "E"
    },
    {
      TAG: /* Single */0,
      _0: "R"
    },
    {
      TAG: /* Single */0,
      _0: "T"
    },
    {
      TAG: /* Single */0,
      _0: "Y"
    },
    {
      TAG: /* Single */0,
      _0: "U"
    },
    {
      TAG: /* Single */0,
      _0: "I"
    },
    {
      TAG: /* Single */0,
      _0: "O"
    },
    {
      TAG: /* Single */0,
      _0: "P"
    },
    {
      TAG: /* Dual */1,
      _0: "{",
      _1: "["
    },
    {
      TAG: /* Dual */1,
      _0: "}",
      _1: "]"
    },
    {
      TAG: /* Dual */1,
      _0: "|",
      _1: "\\"
    }
  ],
  middleRow: [
    {
      TAG: /* Single */0,
      _0: "A"
    },
    {
      TAG: /* Single */0,
      _0: "S"
    },
    {
      TAG: /* Single */0,
      _0: "D"
    },
    {
      TAG: /* Single */0,
      _0: "F"
    },
    {
      TAG: /* Single */0,
      _0: "G"
    },
    {
      TAG: /* Single */0,
      _0: "H"
    },
    {
      TAG: /* Single */0,
      _0: "J"
    },
    {
      TAG: /* Single */0,
      _0: "K"
    },
    {
      TAG: /* Single */0,
      _0: "L"
    },
    {
      TAG: /* Dual */1,
      _0: ":",
      _1: ";"
    },
    {
      TAG: /* Dual */1,
      _0: "\"",
      _1: "'"
    }
  ],
  bottomRow: [
    {
      TAG: /* Single */0,
      _0: "Z"
    },
    {
      TAG: /* Single */0,
      _0: "X"
    },
    {
      TAG: /* Single */0,
      _0: "C"
    },
    {
      TAG: /* Single */0,
      _0: "V"
    },
    {
      TAG: /* Single */0,
      _0: "B"
    },
    {
      TAG: /* Single */0,
      _0: "N"
    },
    {
      TAG: /* Single */0,
      _0: "M"
    },
    {
      TAG: /* Dual */1,
      _0: "<",
      _1: ","
    },
    {
      TAG: /* Dual */1,
      _0: ">",
      _1: "."
    },
    {
      TAG: /* Dual */1,
      _0: "?",
      _1: "/"
    }
  ]
};

function Keypad$Keys(props) {
  var listen = props.listen;
  var s = props.s;
  var listen$1 = listen !== undefined ? listen : true;
  var match = React.useState(function () {
        return false;
      });
  var setIsDown = match[1];
  React.useEffect((function () {
          var aud = (new Audio(mech_audio));
          console.log(aud);
          console.log("loggin");
          var song = new Audio(mech_audio);
          var keydown_listner = function (evt) {
            if (typeof s === "number") {
              if (s === /* Spacebar */0) {
                console.log(evt, evt.keyCode);
                if (evt.keyCode !== 32) {
                  return ;
                }
                Curry._1(setIsDown, (function (param) {
                        return true;
                      }));
                var clone = song.cloneNode();
                clone.play();
                return ;
              }
              if (evt.key !== "Backspace") {
                return ;
              }
              Curry._1(setIsDown, (function (param) {
                      return true;
                    }));
              var clone$1 = song.cloneNode();
              clone$1.play();
              return ;
            } else {
              if (s.TAG === /* Single */0) {
                if (s._0 !== evt.key.toUpperCase()) {
                  return ;
                }
                Curry._1(setIsDown, (function (param) {
                        return true;
                      }));
                var clone$2 = song.cloneNode();
                clone$2.play();
                return ;
              }
              if (!(s._0 === evt.key.toUpperCase() || s._1 === evt.key.toUpperCase())) {
                return ;
              }
              Curry._1(setIsDown, (function (param) {
                      return true;
                    }));
              var clone$3 = song.cloneNode();
              clone$3.play();
              return ;
            }
          };
          var keyup_listner = function (evt) {
            if (typeof s === "number") {
              if (s === /* Spacebar */0) {
                if (evt.keyCode === 32) {
                  return Curry._1(setIsDown, (function (param) {
                                return false;
                              }));
                } else {
                  return ;
                }
              } else if (evt.keyCode === 8) {
                return Curry._1(setIsDown, (function (param) {
                              return false;
                            }));
              } else {
                return ;
              }
            } else if (s.TAG === /* Single */0) {
              if (s._0 === evt.key.toUpperCase()) {
                return Curry._1(setIsDown, (function (param) {
                              return false;
                            }));
              } else {
                return ;
              }
            } else if (s._0 === evt.key.toUpperCase() || s._1 === evt.key.toUpperCase()) {
              return Curry._1(setIsDown, (function (param) {
                            return false;
                          }));
            } else {
              return ;
            }
          };
          if (listen$1) {
            window.addEventListener("keydown", keydown_listner);
            window.addEventListener("keyup", keyup_listner);
          }
          return (function (param) {
                    Curry._1(setIsDown, (function (param) {
                            return false;
                          }));
                    removeEventListener("keydown", keydown_listner);
                    removeEventListener("keyup", keyup_listner);
                  });
        }), [listen$1]);
  var tmp;
  tmp = typeof s === "number" ? (
      s === /* Spacebar */0 ? "" : "delete"
    ) : (
      s.TAG === /* Single */0 ? s._0 : JsxRuntime.jsxs(JsxRuntime.Fragment, {
              children: [
                JsxRuntime.jsx("div", {
                      children: s._0
                    }),
                JsxRuntime.jsx("div", {
                      children: s._1
                    })
              ]
            })
    );
  return JsxRuntime.jsx("div", {
              children: tmp,
              className: style.button + " " + (
                match[0] ? style.down : ""
              ),
              style: {
                width: Belt_Option.getWithDefault(props.width, "")
              }
            });
}

var Keys = {
  make: Keypad$Keys
};

function Keypad(props) {
  var listen = props.listen;
  var listen$1 = listen !== undefined ? listen : true;
  return JsxRuntime.jsxs("div", {
              children: [
                JsxRuntime.jsxs("div", {
                      children: [
                        JsxRuntime.jsx("span", {
                              className: style.tab
                            }),
                        Belt_Array.mapWithIndex(qwertyKeys.topRow, (function (i, ch) {
                                return JsxRuntime.jsx(Keypad$Keys, {
                                            s: ch
                                          }, String(i));
                              })),
                        JsxRuntime.jsx(Keypad$Keys, {
                              s: /* Backspace */1,
                              listen: listen$1
                            })
                      ],
                      className: style.horizontal
                    }),
                JsxRuntime.jsxs("div", {
                      children: [
                        JsxRuntime.jsx("span", {
                              className: style.caps_lock
                            }),
                        Belt_Array.mapWithIndex(qwertyKeys.middleRow, (function (i, ch) {
                                return JsxRuntime.jsx(Keypad$Keys, {
                                            s: ch,
                                            listen: listen$1
                                          }, String(i));
                              }))
                      ],
                      className: style.horizontal
                    }),
                JsxRuntime.jsxs("div", {
                      children: [
                        JsxRuntime.jsx("span", {
                              className: style.shift
                            }),
                        Belt_Array.mapWithIndex(qwertyKeys.bottomRow, (function (i, ch) {
                                return JsxRuntime.jsx(Keypad$Keys, {
                                            s: ch,
                                            listen: listen$1
                                          }, String(i));
                              }))
                      ],
                      className: style.horizontal
                    }),
                JsxRuntime.jsx("div", {
                      children: JsxRuntime.jsx(Keypad$Keys, {
                            s: /* Spacebar */0,
                            width: "18em",
                            listen: listen$1
                          }),
                      className: style.horizontal_spacebar
                    })
              ],
              className: style.keypad
            });
}

var make = Keypad;

export {
  style ,
  mech_audio ,
  qwertyKeys ,
  Keys ,
  make ,
}
/* style Not a pure module */
