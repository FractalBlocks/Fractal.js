
// mori and ramda integration for provide persistent data structures to Fractal
// a good functional interface for mori.js or a hack to ramda.js to use PDS
// working in: http://jsbin.com/ziyelozadi/edit?js,console

/* TODOs:
  - Include arrays (mori vectors)
*/

let mori = require('mori')
const R = {
  curry: require('ramda/src/curry'),
}

var objToMori = obj => {
  var moriArgs = []
  for (var key in obj) {
    if (obj[key] instanceof Object)
      moriArgs.push(key, (mori.isMap(obj[key])) ? obj[key] : objToMori(obj[key]))
    else
      moriArgs.push(key, obj[key])
  }
  return mori.hashMap.apply(null, moriArgs)
}

var evolve = R.curry((obj, imobj) => {
  var res = imobj
  // var res = (mori.isMap(imobj)) ? imobj : objToMori(imobj) // not necesary
  for (var key in obj) {
    res = mori.conj(res, mori.vector(key, obj[key](mori.get(res, key))))
  }
  return res
})

var map = R.curry((fn, imobj) => {
  let obj = imobj, keys = mori.keys(imobj)
  for (let key in keys)
    obj = mori.conj(obj, mori.vector(key, fn(mori.get(key, imobj))))
  return obj
})

export default {
  ...R,
  // mori methods
  mori,
  // new methods
  objToMori,
  // methods overwrited
  evolve,
  map,
}
