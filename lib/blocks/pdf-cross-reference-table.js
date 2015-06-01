module.exports = pdfCrossReferenceTable

var format = require('../utils/format')
var toLength = require('../utils/to-length')

/**
 * Cross-Reference Table
 *
 * @see page 93 "3.4.3 Cross-Reference Table"
 **/
function pdfCrossReferenceTable (state, doc) {
  var numBodyParts = doc.body.length
  var lines = [
    'xref',
    format('0 %s', numBodyParts + 1),
    // allways (f)ree with max generation number of 65535 as per specification
    // line must be exactly 20 bytes, last space is significant
    '0000000000 65535 f '
  ]

  var offset = toLength(doc.header)
  doc.body.forEach(function (part) {
    var offsetString = ('0000000000' + offset).slice(-10)
    // line must be exactly 20 bytes, last space is significant
    lines.push(format('%s 00000 n ', offsetString))
    offset += toLength(part)
  })

  return {
    lines: lines
  }
}
