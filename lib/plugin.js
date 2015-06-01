module.exports = addPlugins

function addPlugins (currentPlugins, pluginMap) {
  Object.keys(pluginMap).forEach(function (key) {
    currentPlugins[key] = pluginMap[key]
  })
}
