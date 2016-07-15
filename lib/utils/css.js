// A set of css useful function helpers

const FreeStyle = require('free-style')

function r(styleObj) {

  let Style = FreeStyle.create()

  let classHash = Style.registerStyle(styleObj)

  Style.inject()

  return classHash

}

function hasBaseObject(obj) {
  for (let key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object' && key == 'base') {
      return true
    }
  }
  return false
}

function rs(stylesObj) {
  if (!hasBaseObject(stylesObj)) {
    return r(stylesObj)
  }
  let classObj = {}
  for (let key in stylesObj) {
    if (hasBaseObject(stylesObj[key])) {
      classObj[key] = rs(stylesObj[key])
    } else if (stylesObj[key] != null && typeof stylesObj[key] === 'object') {
      classObj[key] = r(stylesObj[key])
    } else { // function
      classObj[key] = stylesObj[key]
    }
  }
  return classObj
}

let noSelectable = {
  '-webkit-touch-callout': 'none', /* iOS Safari */
  '-webkit-user-select': 'none',   /* Chrome/Safari/Opera */
  '-khtml-user-select': 'none',    /* Konqueror */
  '-moz-user-select': 'none',      /* Firefox */
  '-ms-user-select': 'none',       /* Internet Explorer/Edge */
  'user-select': 'none',
}

module.exports = {
  noSelectable,
  r,
  rs,
}
