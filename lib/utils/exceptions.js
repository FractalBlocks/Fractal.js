let exceptions = {
  driverExecution: info => [`There are an error in the ${info.name} interface with the model:`, info.model],
}

// captures exceptions in code
module.exports = (type, info, fn) => {
  // TODO: evaluate and validate this
  return fn()
  /*try {
    return fn()
  } catch (exception) {
    if (!exceptions[type]) {
      console.error(`Exception type '${type}' not handled by exceptions module ... see: lib/utils/exceptions.js utility`)
      console.log(info)
    } else {
      let exceptionMsg = exceptions[type](info)
      if (exceptionMsg instanceof Array) {
        console.log(`%cError description: ${exceptionMsg[0]}`, 'color: red')
        for (var i = 1; i < exceptionMsg.length; i++) {
          if (typeof exceptionMsg[i] == 'string') {
            console.log(`%c${exceptionMsg[i]}`, 'color: red')
          } else {
            console.log(exceptionMsg[i])
          }
        }
      } else {
        console.log(`%cError description: ${exceptionMsg}`, 'color: red')
      }
      console.log(`%cException: ${exception}`, 'color: red')
    }
  }*/
}
