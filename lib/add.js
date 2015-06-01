module.exports = add

var uniqueNr = require('./utils/unique-nr')

function add (state, what) {
  if (typeof what === 'string') {
    what = {
      type: 'text',
      content: what
    }
  }

  if (!state.plugins[what.type]) {
    throw new Error('Plugin missing for "' + what.type + '" content')
  }
  what.id = uniqueNr()
  state.currentPage.contents.push(what)
}
