module.exports = pdfPages

var format = require('../utils/format')
var toReference = require('../utils/to-reference')

/**
 *
 **/
function pdfPages (state) {
  var pageBlocks = state.pages.map(toPageBlock.bind(null, state))
  pageBlocks = pageBlocks.concat.apply(pageBlocks, state.pages.map(toContents.bind(null, state)))

  return pageBlocks
}

function toContents (state, page) {
  return page.contents.map(handleContent.bind(null, state))
}

function handleContent (state, what) {
  what.pdfOptions = state.options
  return {
    id: what.id,
    lines: state.plugins[what.type](state.resources, what)
  }
}

function toPageBlock (state, page) {
  var pageTreeId = state.ids.pageTree
  var resourcesId = state.ids.resources

  var pageBlock = {
    id: page.id,
    lines: [
      format('%s 0 obj', page.id),
      '<<',
      '/Type /Page',
      format('/Parent %s 0 R', pageTreeId),
      format('/Contents [%s]', page.contents.map(toReference).join(' ')),
      format('/Resources %s 0 R', resourcesId),
      '>>',
      'endobj'
    ]
  }

  return pageBlock
}
