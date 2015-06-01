var test = require('tape')
var fs = require('fs')

var PDF = require('../../../pdf')

test('hello world', function (t) {
  t.plan(1)

  var pdf = new PDF({
    dimensions: {
      width: 800,
      height: 600
    },
    createdAt: new Date(Date.UTC(2015, 4, 9))
  })

  pdf.add('Hello,\nPDF world!')
  pdf.getContent(function (error, content) {
    if (error) throw error

    var bufferGenerated = new Buffer(content, 'binary')
    var bufferFixture = fs.readFileSync(__dirname + '/fixture.pdf')

    // console.log(bufferDiff(bufferGenerated, bufferFixture))
    t.equal(bufferGenerated.toString('binary'), bufferFixture.toString('binary'), 'should match fixture')
  })
})
