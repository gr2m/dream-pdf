module.exports = pdfTrailer

var format = require('../utils/format')
var toLength = require('../utils/to-length')

/**
 * @see page 97 "3.4.4 File Trailer"
 */
function pdfTrailer (state, doc) {
  var endOfFileMark = '%%EOF'
  var numBodyParts = doc.body.length
  var docBodyBytes = calculateLength(doc)
  var lines = [
    'trailer',
    format('<< /Size %s', numBodyParts + 1),
    format('   /Root %s 0 R', state.ids.catalog),
    format('   /Info %s 0 R', state.ids.info),
    '>>',
    'startxref',
    docBodyBytes,
    endOfFileMark
  ]

  return {
    lines: lines
  }
}

function calculateLength (doc) {
  var length = toLength(doc.header)
  doc.body.forEach(function (part) {
    length += toLength(part)
  })
  return length
}
