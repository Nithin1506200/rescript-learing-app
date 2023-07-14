


function cssVar(k) {
  return "var(--" + k + ")";
}

var colors = {
  "background-grey": "var(--background-grey)",
  "primary-white": "var(--primary-white)",
  "primary-shadow": "var(--primary-shadow)"
};

export {
  cssVar ,
  colors ,
}
/* No side effect */
