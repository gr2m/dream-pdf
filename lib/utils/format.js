module.exports = format

/**
 * reduced util.format implementation,
 * only supporting '%s' placeholders,
 * to keep the browserified version small.
 **/
var formatRegExp = /%s/g
function format (template) {
  var argIndex = 1
  var args = arguments
  var len = args.length
  var str = String(template).replace(formatRegExp, function (x) {
    if (argIndex >= len) return x
    return String(args[argIndex++])
  })

  return str
}
