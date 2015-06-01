module.exports = pdfInfo

var format = require('../utils/format')

var toUtcTimestamp = require('../utils/to-utc-timestamp')

/**
 *  supported document information
 *
 *  - Title
 *  - Author
 *  - Subject
 *  - Keywords
 *  - Creator: name of app that created original document
 *  - Producer: name of app that converted original document to PDF
 *  - CreationDate
 *  - ModDate
 *
 *  @see page 844 "10.2.1 Document Information Dictionary"
 **/
function pdfInfo (state) {
  var lines = []
  var options = state.options
  var id = state.ids.info

  if (options.title) {
    lines.push(format('/Title (%s)', options.title))
  }
  if (options.author) {
    lines.push(format('/Author (%s)', options.author))
  }
  if (options.subject) {
    lines.push(format('/Subject (%s)', options.subject))
  }
  if (options.keywords) {
    lines.push(format('/Keywords (%s)', options.keywords))
  }
  if (options.creator) {
    lines.push(format('/Creator (%s)', options.creator))
  }
  if (options.producer) {
    lines.push(format('/Producer (%s)', options.producer))
  }
  if (options.createdAt) {
    lines.push(format('/CreationDate (%s)', toUtcTimestamp(options.createdAt)))
  }
  if (options.updatedAt) {
    lines.push(format('/ModDate (%s)', options.updatedAt))
  }

  lines.unshift('<<')
  lines.unshift(format('%s 0 obj', id))
  lines.push('>>')
  lines.push('endobj')

  return {
    lines: lines,
    id: id
  }
}
