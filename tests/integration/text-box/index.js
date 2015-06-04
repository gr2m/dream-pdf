var test = require('tape')
var fs = require('fs')

var PDF = require('../../../pdf')

test('textBox plugin', function (t) {
  t.plan(1)

  var pdf = new PDF({
    dimensions: {
      width: 800,
      height: 600
    },
    createdAt: new Date(Date.UTC(2015, 4, 9))
  })

  pdf.add({
    type: 'textBox',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
  pdf.getContent(function (error, content) {
    if (error) throw error

    var bufferGenerated = new Buffer(content, 'binary')
    var bufferFixture = fs.readFileSync(__dirname + '/fixture.pdf')

    t.equal(bufferGenerated.toString('binary'), bufferFixture.toString('binary'), 'should match fixture')
  })
})
