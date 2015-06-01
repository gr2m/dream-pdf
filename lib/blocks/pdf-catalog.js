module.exports = pdfCatalog

var format = require('../utils/format')

/**
 * @see page 137 "3.6.1 Document Catalog"
 **/
function pdfCatalog (state) {
  var catalogId = state.ids.catalog
  var pageTreeId = state.ids.pageTree

  var lines = [
    format('%s 0 obj', catalogId),
    '<<',
    '/Type /Catalog',
    format('/Pages %s 0 R', pageTreeId),
    '>>',
    'endobj'
  ]

  return {
    lines: lines,
    id: catalogId
  }
}
