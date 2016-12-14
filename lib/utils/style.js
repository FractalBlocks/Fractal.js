// A set of css useful function helpers
const FreeStyle = require('free-style')

// the div element for injecting styles
let styles = document.getElementById('F-app-styles')

function createStylesContainer(target, id) {
  let styles = document.createElement('div')
  styles.id = id
  target.appendChild(styles)
  return styles
}

if (!styles) {
  styles = createStylesContainer(document.head, 'F-app-styles')
}

function createModuleStylesContainer(styles, name, scope = '') {
  let container = document.createElement('div')
  if (document.getElementById('fractalModuleStyles_' + scope + name)) {
    console.warn('WARNING!!! there are a duplicated module definition name!!: ' + scope + name)
  }
  container.id = scope + name
  styles.appendChild(container)
  return container
}

function createStyle(styles, name, scope = '') {
  let namespace = ''
  return {
    Style: FreeStyle.create(s => `_${namespace}__${FreeStyle.stringHash(s)}`),
    container: createModuleStylesContainer(styles, name, scope),
    setNamespace: ns => namespace = ns,
  }
}


function r(styleInstance, styleName, styleObj) {
  styleInstance.setNamespace(styleName)
  let classHash = styleInstance.Style.registerStyle(styleObj)
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

function rs(moduleName, styleInstance, stylesObj) {
  function rs_func(styleName, stylesObj) {
    if (!hasBaseObject(stylesObj)) {
      return r(styleInstance, styleName, stylesObj)
    }
    let classObj = {}
    for (let key in stylesObj) {
      if (hasBaseObject(stylesObj[key])) {
        classObj[key] = rs_func(`${styleName}_${key}`, stylesObj[key])
      } else if (stylesObj[key] != null && typeof stylesObj[key] === 'object') {
        classObj[key] = r(styleInstance, `${styleName}_${key}`, stylesObj[key])
      } else { // function
        classObj[key] = stylesObj[key]
      }
    }
    return classObj
  }

  let classObj = rs_func(moduleName, stylesObj)

  let styleElement = document.createElement('style')
  styleElement.textContent = styleInstance.Style.getStyles()
  styleInstance.container.appendChild(styleElement)

  return classObj
}

function registerAnimations(moduleName, styleInstance, animationsObj) {
  let animations = {}
  for (let key in animationsObj) {
    styleInstance.setNamespace(`${moduleName}-${key}`)
    animations[key] = styleInstance.Style.registerKeyframes(animationsObj[key])
  }
  return animations
}

let noSelectable = {
  '-webkit-touch-callout': 'none', /* iOS Safari */
  '-webkit-user-select': 'none',   /* Chrome/Safari/Opera */
  '-khtml-user-select': 'none',    /* Konqueror */
  '-moz-user-select': 'none',      /* Firefox */
  '-ms-user-select': 'none',       /* Internet Explorer/Edge */
  'user-select': 'none',
}

let absoluteCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default {
  styles,
  r,
  rs,
  registerAnimations,
  createStyle,
  createStylesContainer,
  createModuleStylesContainer,
  hasBaseObject,
  // helpers
  absoluteCenter,
  noSelectable,
}
