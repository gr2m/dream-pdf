module.exports = pdfHeader

/**
 * @see page 92 "3.4.1 File Header"
 **/
function pdfHeader (state) {
  var lines = [
    '%PDF-' + state.version,
    // 4 binary chars, as recommended by
    // "3.4.1 File Header" note
    '%\xFF\xFF\xFF\xFF'
  ]

  return {
    lines: lines
  }
}
