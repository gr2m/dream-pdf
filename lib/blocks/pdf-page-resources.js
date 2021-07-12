module.exports = pdfPageResources

var format = require('../utils/format')

var uniqueNr = require('../utils/unique-nr')

/**
 * Page resources
 *
 * @see page 153 "3.7.2 Resource Dictionaries"
 */
function pdfPageResources (state) {
  var resourcesId = state.ids.resources
  var fonts = {
    helvetica: {
      id: uniqueNr(state),
      name: 'F1'
    }
  }

  state.resources.fonts = fonts
  var pageResourcesBlock = {
    id: resourcesId,
    lines: [
      format('%s 0 obj', resourcesId),
      '<<',
      '/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]',
      format('/Font << /%s %s 0 R >>',
        fonts.helvetica.name,
        fonts.helvetica.id),
      '>>',
      'endobj'
    ]
  }

  var helveticaFontBlock = {
    id: fonts.helvetica.id,
    lines: [
      format('%s 0 obj', fonts.helvetica.id),
      '<<',
      '/Type /Font',
      '/Subtype /Type1',
      format('/Name /%s', fonts.helvetica.name),
      '/BaseFont /Helvetica',
      '/Encoding /MacRomanEncoding',
      '>>',
      'endobj'
    ]
  }

  return [
    pageResourcesBlock,
    helveticaFontBlock
  ]
}
