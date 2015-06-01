module.exports = textPlugin

var format = require('../utils/format')

function textPlugin (resources, options) {
  setDefault(options)

  var body = [
    'BT',
    format('/%s %s Tf', resources.fonts.helvetica.name, options.fontSize),
    format('%s %s Td', options.at.left, options.at.bottom),
    format('(%s) Tj', options.content),
    'ET'
  ]
  var bodyLength = body.join('\n').length + 1
  var lines = [
    format('%s 0 obj', options.id),
    format('<< /Length %s >>', bodyLength),
    'stream',
    body.join('\n'),
    'endstream',
    'endobj'
  ]
  return lines
}

function setDefault (options) {
  if (!options.at) {
    options.at = {
      left: 100,
      bottom: 100
    }
  }
  // set at.bottom form at.top
  if (typeof options.at.bottom === 'undefined' && typeof options.at.top === 'number') {
    options.at.bottom = options.pdfOptions.dimensions.height - options.at.top
  }
  if (!options.fontSize) {
    options.fontSize = 14
  }
}
