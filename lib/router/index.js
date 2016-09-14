
const children = (ctx, m) => (ctx._md.childModules && ctx._md.childModules[m.childName]) ? ctx._md.childModules[m.childName].interfaces.view(m.childStates[m.childName]) : ''

export default {
  def: require('./router').default,
  children,
  driver: require('./driver').default,
  ...require('./task').default, // merge types and task
}
