module.exports = PDF

var add = require('./lib/add')
var getContent = require('./lib/get-content')
var uniqueNr = require('./lib/utils/unique-nr')

PDF.version = '1.3'
PDF.plugins = require('./lib/core-plugins')
PDF.plugin = require('./lib/plugin').bind(null, PDF.plugins)

/**
 * Constructor
 *
 * doc = new PDF(options)
 **/
function PDF (options) {
  var state = {
    version: PDF.version,
    ids: {},
    options: setDefault(options),
    resources: {
      fonts: {}
    },
    internals: {
      uniqueNr: 0
    },
    plugins: PDF.plugins
  }

  state.ids.info = uniqueNr(state)
  state.ids.catalog = uniqueNr(state)
  state.ids.pageTree = uniqueNr(state)
  state.ids.resources = uniqueNr(state)
  state.ids.firstPage = uniqueNr(state)

  state.currentPage = {
    id: state.ids.firstPage,
    contents: []
  }
  state.pages = [state.currentPage]

  var api = {
    add: add.bind(null, state),
    getContent: getContent.bind(null, state)
  }

  return api
}

function setDefault (options) {
  if (!options) options = {}
  if (!options.creator) options.creator = 'dream-pdf'
  if (!options.producer) options.producer = 'dream-pdf'
  if (!options.createdAt) options.createdAt = new Date()
  if (!options.dimensions) {
    options.dimensions = {
      // A4 portrait in pdf points (1/72 inch)
      width: 595.28,
      height: 841.89
    }
  }
  return options
}
