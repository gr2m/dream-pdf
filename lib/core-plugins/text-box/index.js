module.exports = textBoxPlugin

var textPlugin = require('../text')

function textBoxPlugin (resources, options) {
  setDefault(options)

  var lines = splitTextToSize(options.content, options)
  options.content = lines.join('\n')

  return textPlugin(resources, options)
}

function setDefault (options) {
  if (!options.at) {
    options.at = {
      left: 100,
      top: 100
    }
  }

  if (!options.width) {
    options.width = options.pdfOptions.dimensions.width - options.at.left * 2
  }

  if (!options.fontSize) {
    options.fontSize = 14
  }
}

var internals = {
  scaleFactor: 2
}

/**
 * Returns an array of length matching length of the 'word' string, with each
 * cell ocupied by the width of the char in that position.
 */
function getCharWidthsArray (text, options) {
  return text.split('').map(toCharacterWidth)
}

function toCharacterWidth (char) {
  return 1
}

/**
 * returns array of lines
 */
function splitLongWord (word, widthsArray, firstLineMaxLen, maxLen) {
  var answer = []

  // 1st, chop off the piece that can fit on the hanging line.
  var i = 0
  var l = word.length
  var workingLen = 0
  while (i !== l && workingLen + widthsArray[i] < firstLineMaxLen) {
    workingLen += widthsArray[i]
    i++
  }
  // this is first line.
  answer.push(word.slice(0, i))

  // 2nd. Split the rest into maxLen pieces.
  var startOfLine = i
  workingLen = 0
  while (i !== l) {
    if (workingLen + widthsArray[i] > maxLen) {
      answer.push(word.slice(startOfLine, i))
      workingLen = 0
      startOfLine = i
    }
    workingLen += widthsArray[i]
    i++
  }
  if (startOfLine !== i) {
    answer.push(word.slice(startOfLine, i))
  }

  return answer
}

function splitParagraphIntoLines (text, maxlen, options) {
  if (!options) {
    options = {}
  }

  var line = []
  var lines = [line]
  var lineLength = 0
  var separatorLength = 0
  var currentWordLength = 0
  var word
  var widthsArray
  var words = text.split(' ')
  var spaceCharWidth = getCharWidthsArray(' ', options)[0]
  var i, l, tmp

  for (i = 0, l = words.length; i < l; i++) {
    var force = 0

    word = words[i]
    widthsArray = getCharWidthsArray(word, options)
    currentWordLength = getArraySum(widthsArray)

    if (lineLength + separatorLength + currentWordLength > maxlen || force) {
      if (currentWordLength > maxlen) {
        // this happens when you have space-less long URLs for example.
        // we just chop these to size. We do NOT insert hiphens
        tmp = splitLongWord(word, widthsArray, maxlen - (lineLength + separatorLength), maxlen)

        // first line we add to existing line object
        line.push(tmp.shift()) // it's ok to have extra space indicator there

        // last line we make into new line object
        line = [tmp.pop()]

        // lines in the middle we apped to lines object as whole lines
        while (tmp.length) {
          lines.push([tmp.shift()]) // single fragment occupies whole line
        }
        currentWordLength = getArraySum(widthsArray.slice(word.length - line[0].length))
      } else {
        // just put it on a new line
        line = [word]
      }

      // now we attach new line to lines
      lines.push(line)
      lineLength = currentWordLength
      separatorLength = spaceCharWidth

    } else {
      line.push(word)

      lineLength += separatorLength + currentWordLength
      separatorLength = spaceCharWidth
    }
  }

  var postProcess = function (ln) {
    return ln.join(' ')
  }

  return lines.map(postProcess)
}

/**
Splits a given string into an array of strings. Uses 'size' value
(in measurement units declared as default for the jsPDF instance)
and the font's "widths" and "Kerning" tables, where availabe, to
determine display length of a given string for a given font.

We use character's 100% of unit size (height) as width when Width
table or other default width is not available.

@public
@function
@param text {String} Unencoded, regular JavaScript (Unicode, UTF-16 / UCS-2) string.
@param size {Number} Nominal number, measured in units default to this instance of jsPDF.
@param options {Object} Optional flags needed for chopper to do the right thing.
@returns {Array} with strings chopped to size.
*/
function splitTextToSize (text, options) {
  'use strict'

  var maxlen = options.width
  var fontSize = options.fontSize
  var newOptions = {
    widths: {0: 1},
    kerning: {}
  }

  // first we split on end-of-line chars
  var paragraphs = Array.isArray(text) ? text : text.split(/\r?\n/)

  // now we convert size (max length of line) into "font size units"
  // at present time, the "font size unit" is always 'point'
  // 'proportional' means, "in proportion to font size"
  var fontUnitMaxLen = 1.0 * internals.scaleFactor * maxlen / fontSize

  var i, l
  var output = []
  for (i = 0, l = paragraphs.length; i < l; i++) {
    output = output.concat(
      splitParagraphIntoLines(
        paragraphs[i]
        , fontUnitMaxLen
        , newOptions
      )
    )
  }

  return output
}

function getArraySum (array) {
  var i = array.length
  var output = 0
  while (i) {
    i--
    output += array[i]
  }
  return output
}
