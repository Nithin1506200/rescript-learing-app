@react.component
let make = () => {
  let (focus, setFocus) = React.useState(_ => false)
  <div
    style={ReactDOM.Style.make(
      ~display="flex",
      ~justifyContent="center",
      ~flexDirection="column",
      ~alignItems="center",
      ~columnGap="3em",
      (),
    )}>
    <textarea
      style={ReactDOM.Style.make(~width="50%", ~height="30vh", ())}
      onFocus={_ => {setFocus(_ => true)}}
      onBlur={_ => {setFocus(_ => false)}}
    />
    <Keypad listen=focus />
  </div>
}
