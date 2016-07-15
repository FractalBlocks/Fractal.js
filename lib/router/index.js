
const children = (ctx, m) => (ctx._md.childModules[m.childName]) ? ctx._md.childModules[m.childName].interfaces.view(m.childStates[m.childName]) : () => 0

module.exports = {
  def: require('./router'),
  children,
  driver: require('./driver'),
  ...require('./task'), // merge types and task
}
