// Helper functions taken from https://github.com/garth/snabbdom-material/tree/master/src/helpers

let screenSize = () => {
  return {
    width: (!!window && (window.innerWidth || document.body.clientWidth)) || 1024,
    height: (!!window && (window.innerHeight || document.body.clientHeight)) || 768
  }
}

const types = [ 'xs', 'sm', 'md', 'lg' ]

let screenInfo = () => {
  const { width, height } = screenSize()
  const size = width >= 1200 ? 4 : width >= 992 ? 3 : width >= 768 ? 2 : 1

  return {
    size,
    type: types[size - 1],
    isLandscape: width >= height,
    isPortrait: width < height
  }
}

module.exports = {
  screenSize,
  screenInfo,
}
