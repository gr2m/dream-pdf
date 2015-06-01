module.exports = pdfPageTree

var format = require('../utils/format')
var toReference = require('../utils/to-reference')

/**
 * @see page 143 "3.6.2 Page Tree"
 */
function pdfPageTree (state) {
  var pageTreeId = state.ids.pageTree
  var pageTreeBlock = {
    id: pageTreeId,
    lines: [
      format('%s 0 obj', pageTreeId),
      '<<',
      '/Type /Pages',
      format('/Count %s', state.pages.length),
      format('/Kids [%s]', state.pages.map(toReference).join(' ')),
      format('/MediaBox [0 0 %s %s]',
        state.options.dimensions.width,
        state.options.dimensions.height
      ),
      '>>',
      'endobj'
    ]
  }

  return pageTreeBlock
}
