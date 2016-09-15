import deepDiff from 'deep-diff'

export const diff = deepDiff.diff

export function prettyAction(action) {
  let actionInfo = actionModuleInfo(action)
  return `${actionInfo.modulePath.join(' -> ')} / ${actionInfo.lastAction.name}: ${prettyParams(actionInfo.lastAction)}`
}


export function prettyActionDetailed(action) {
  let path = [], nested = action
  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
    if (nested.length == 0) {
      path.push(nested.name)
    } else {
      path.push(nested.name + ' ' + prettyParams(nested))
    }
    nested = nested[nested.length - 1]
  }
  path.push(nested.name)
  return `${path.join(' -> ')} : ${prettyParams(nested)}`
}

// deep extract info from an Action: log, modulePath, lastAction
export function actionModuleInfo(action) {
  let modulePath = [], nested = action, log, logAll = false
  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
    logAll = logAll || nested._logAll
    modulePath.push(nested._moduleName)
    nested = nested[nested.length - 1]
  }
  log = logAll || nested._log || nested._logAll
  modulePath.push(nested._moduleName)
  return {
    log,
    modulePath,
    lastAction: nested,
  }
}

export function prettyParams(params) {
  let paramString = params.map(param => {
    if (typeof(param) === 'function' || typeof(param) === 'object') {
      if (Array.isArray(param)) {
        return 'array'
      } else {
        return typeof param
      }
    }
    return param
  }).join(', ')
  return (paramString === '') ? 'none' : paramString
}

export function prettyDiff(diffArray) {
  diffArray = diffArray || []
  let logs = []
  diffArray.forEach(diff => {
    let getType = diff => {
      if (diff.kind == 'N')
        return 'added'
      else if (diff.kind == 'D')
        return 'deleted'
      else if (diff.kind == 'E')
        return 'edited'
      else if (diff.kind == 'A')
        return 'array'
    }

    let type = getType(diff)

    if(type == 'array') // if an array is modified
      logs.push(`${type} ${diff.path.join('.')} : index ${diff.index} ${getType(diff.item)}`)
    else
      logs.push(`${type} ${diff.path.join('.')} : ${diff.lhs} -> ${diff.rhs}`)
  })
  return logs
}

export function logAction(action) { console.log(`%c${prettyAction(action)}`, 'color: green') }

export function displayFromDiff(diffArray) {
  prettyDiff(diffArray).forEach(log => console.log(`%c${log}`, 'color: darkblue'))
}
