import deepDiff from 'deep-diff'

export const diff = deepDiff.diff

export function prettyAction(action) {
  let path = [], nested = action
  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
    if (nested.length == 0)
      path.push(nested.name)
    else {
      let name = ''
      for (var i = 0; i < nested.length - 1; i++) {
        name += nested[i] + ' '
      }
      path.push(nested.name + ' ' + name)
    }
    nested = nested[nested.length - 1]
  }
  path.push(nested.name)
  return `${path.join(' -> ')} : ${nested[0] ? nested[0] : 'none'}`
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
