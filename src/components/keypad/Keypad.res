// %%raw(`import style from "./Keypad.module.css"`)
// @val external style :'a=>string="style"
@module external style: {..} = "./Keypad.module.scss"
@module("../../assets/mech.mp3") external mech_audio: string = "default"
type audio
type actions
@send external play: audio => unit = "play"
@send external cloneNode: audio => audio = "cloneNode"
@new external audio: string => audio = "Audio"

// %raw(`import MechMp3 from "../../assets/mech.mp3";`)
type key =
  | Single(string)
  | Dual(string, string)
  | Spacebar
  | Backspace

// Module contents

let qwertyKeys = {
  "topRow": [
    Single("Q"),
    Single("W"),
    Single("E"),
    Single("R"),
    Single("T"),
    Single("Y"),
    Single("U"),
    Single("I"),
    Single("O"),
    Single("P"),
    Dual("{", "["),
    Dual("}", "]"),
    Dual("|", "\\"),
  ],
  "middleRow": [
    Single("A"),
    Single("S"),
    Single("D"),
    Single("F"),
    Single("G"),
    Single("H"),
    Single("J"),
    Single("K"),
    Single("L"),
    Dual(":", ";"),
    Dual("\"", "'"),
  ],
  "bottomRow": [
    Single("Z"),
    Single("X"),
    Single("C"),
    Single("V"),
    Single("B"),
    Single("N"),
    Single("M"),
    Dual("<", ","),
    Dual(">", "."),
    Dual("?", "/"),
  ],
}

module Keys = {
  type evt = {"key": string, "keyCode": int}
  @val @scope("window")
  external addKeyEvt: (~k: string, (~evt: evt) => unit) => unit = "addEventListener"
  external removeKeyEvt: (~k: string, (~evt: evt) => unit) => unit = "removeEventListener"

  @react.component
  let make = (~s: key, ~width: option<string>=?, ~listen: bool=true) => {
    let (isDown, setIsDown) = React.useState(_ => false)
    React.useEffect1(() => {
      let aud: {"play": unit => unit} = %raw(`new Audio(mech_audio)`)
      Js.log(aud)
      Js.log("loggin")
      let song = audio(mech_audio)
      let keydown_listner: (~evt: evt) => unit = (~evt) => {
        switch s {
        | Single(s) =>
          if s == evt["key"]->String.toUpperCase {
            setIsDown(_ => true)
            // %raw(`aud.play()`)
            // song->play
            let clone = song->cloneNode
            clone->play
          }
        | Dual(s1, s2) =>
          if s1 == evt["key"]->String.toUpperCase || s2 == evt["key"]->String.toUpperCase {
            setIsDown(_ => true)
            // %raw(`aud.play()`)
            // song.play(.)
            // song->play
            let clone = song->cloneNode
            clone->play
          }
        | Spacebar => {
            Js.log2(evt, evt["keyCode"])
            if evt["keyCode"] == 32 {
              setIsDown(_ => true)
              // %raw(`aud.play()`)
              // song.play(.)
              // song->play
              let clone = song->cloneNode
              clone->play
            }
          }
        | Backspace =>
          if evt["key"] == "Backspace" {
            setIsDown(_ => true)
            let clone = song->cloneNode
            clone->play
          }
        }
      }
      let keyup_listner: (~evt: evt) => unit = (~evt) => {
        switch s {
        | Single(s) =>
          if s == evt["key"]->String.toUpperCase {
            setIsDown(_ => false)
          }
        | Dual(s1, s2) =>
          if s1 == evt["key"]->String.toUpperCase || s2 == evt["key"]->String.toUpperCase {
            setIsDown(_ => false)
          }
        | Spacebar =>
          if evt["keyCode"] == 32 {
            setIsDown(_ => false)
          }
        | Backspace =>
          if evt["keyCode"] == 8 {
            setIsDown(_ => false)
          }
        }
      }
      if listen {
        addKeyEvt(~k="keydown", keydown_listner)
        addKeyEvt(~k="keyup", keyup_listner)
      }

      Some(
        () => {
          setIsDown(_ => false) // when the focus is up clear the color
          removeKeyEvt(~k="keydown", keydown_listner)
          removeKeyEvt(~k="keyup", keyup_listner)
        },
      )
    }, [listen])
    <div
      // style={
      //     ReactDOM.Style.make(
      //         ~color=Styles.colors["primary-white"],
      //         ~backgroundColor=Styles.colors["background-grey"],
      //         ~maxWidth="1em",
      //         ~display="flex",
      //     ())}
      className={style["button"] ++ " " ++ (isDown ? style["down"] : "")}
      style={ReactDOM.Style.make(~width=width->Belt.Option.getWithDefault(""), ())}>
      {switch s {
      | Single(s) => s->React.string
      | Dual(s1, s2) =>
        <>
          <div> {s1->React.string} </div>
          <div> {s2->React.string} </div>
        </>
      | Spacebar => ""->React.string
      | Backspace => "delete"->React.string
      }}
      // <div> {isDown ? "true"->React.string : "false"->React.string} </div> // debug
    </div>
  }
}
@react.component
let make = (~listen: bool=true) => {
  <div className={style["keypad"]}>
    <div className={style["horizontal"]}>
      <span className={style["tab"]} />
      {qwertyKeys["topRow"]
      ->Belt.Array.mapWithIndex((i, ch) => <Keys key={Belt.Int.toString(i)} s={ch} />)
      ->React.array}
      <Keys s={Backspace} listen />
    </div>
    <div className={style["horizontal"]}>
      <span className={style["caps_lock"]} />
      {qwertyKeys["middleRow"]
      ->Belt.Array.mapWithIndex((i, ch) => <Keys key={Belt.Int.toString(i)} s={ch} listen />)
      ->React.array}
    </div>
    <div className={style["horizontal"]}>
      <span className={style["shift"]} />
      {qwertyKeys["bottomRow"]
      ->Belt.Array.mapWithIndex((i, ch) => <Keys key={Belt.Int.toString(i)} s={ch} listen />)
      ->React.array}
    </div>
    <div className={style["horizontal_spacebar"]}>
      <Keys s={Spacebar} width="18em" listen />
    </div>
  </div>
}
