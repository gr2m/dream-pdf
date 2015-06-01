module.exports = textPlugin

var format = require('../utils/format')

function textPlugin (resources, options) {
  setDefault(options)

  var textLines = options.content.split('\n')
  var textContent = textLines.map(toTextLine).join('\n').substr(3)

  var body = [
    'BT',
    format('/%s %s Tf', resources.fonts.helvetica.name, options.fontSize),
    format('%s TL', options.lineHeight),
    format('%s %s Td', options.at.left, options.at.bottom),
    textContent,
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
      top: 100
    }
  }
  // set at.bottom form at.top
  if (typeof options.at.bottom === 'undefined' && typeof options.at.top === 'number') {
    options.at.bottom = options.pdfOptions.dimensions.height - options.at.top
  }
  if (!options.fontSize) {
    options.fontSize = 14
  }
  if (!options.lineHeight) {
    options.lineHeight = options.fontSize * 1.4
  }
}

function toTextLine (text) {
  return format('T* (%s) Tj', text)
}
