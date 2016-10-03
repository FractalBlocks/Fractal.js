let logVal = (x, scope = '__') => {
  console.log(`%c ${x} in ${scope}`, 'color: purple; font-size: 20px')
  return x
}

export default {
  logVal,
}
