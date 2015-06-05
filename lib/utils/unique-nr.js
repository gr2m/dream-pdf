module.exports = uniqueNr

function uniqueNr (state) {
  return ++state.internals.uniqueNr
}

