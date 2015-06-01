module.exports = getContent

var pdfHeader = require('./blocks/pdf-header')

var pdfInfo = require('./blocks/pdf-info')
var pdfCatalog = require('./blocks/pdf-catalog')
var pdfPageTree = require('./blocks/pdf-page-tree')
var pdfPageResources = require('./blocks/pdf-page-resources')
var pdfPages = require('./blocks/pdf-pages')

var pdfCrossReferenceTable = require('./blocks/pdf-cross-reference-table')
var pdfTrailer = require('./blocks/pdf-trailer')

/**
 * get file content of PDF, to write it into
 * a file or whatnot.
 **/
function getContent (state, callback) {
  var header = pdfHeader(state)

  var body = [].concat(
    pdfInfo(state),
    pdfCatalog(state),
    pdfPageTree(state),
    pdfPageResources(state),
    pdfPages(state)
  ).sort(byId)

  var footer = [
    pdfCrossReferenceTable(state, {
      body: body,
      header: header
    }),
    pdfTrailer(state, {
      body: body,
      header: header
    })
  ]

  var parts = [header].concat(body, footer)
  var lines = toLines(parts)

  callback(null, lines.join('\n') + '\n')
}

function toLines (parts) {
  return [].concat.apply([], parts.map(function (part, i) {
    return part.lines
  }))
}

function byId (part1, part2) {
  return part1.id < part2.id ? -1 : 1
}
