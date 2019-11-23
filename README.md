# dream-pdf

> A modular JavaScript library to create PDFs

[![Build Status](https://travis-ci.org/gr2m/dream-pdf.svg?branch=master)](https://travis-ci.org/gr2m/dream-pdf)
[![Coverage Status](https://coveralls.io/repos/gr2m/dream-pdf/badge.svg?branch=master)](https://coveralls.io/r/gr2m/dream-pdf?branch=master)
[![Dependency Status](https://david-dm.org/gr2m/dream-pdf.svg)](https://david-dm.org/gr2m/dream-pdf)
[![devDependency Status](https://david-dm.org/gr2m/dream-pdf/dev-status.svg)](https://david-dm.org/gr2m/dream-pdf#info=devDependencies)

[![NPM](https://nodei.co/npm/dream-pdf.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dream-pdf/)

## Motivations

- Create PDFs with the same APIs in both browsers and Node.js
- Tiny core, many plugins
- low barrier of entry for contributors (e.g. full test coverage)

## API

```js
var DreamPDF = require('dream-pdf')
var doc = new DreamPDF(/* options */)

doc.add('Hello, DreamPDF reader!')
doc.getContent(function(error, content) {
  // content can be written to file, or turned
  // into a data-url. It's out of scope for dream-pdf core.

  // Browser Example:
  // var dataUrl = 'data:application/pdf;base64,' + btoa(content)
  // Node Example:
  // fs.writeFileSync('my.pdf', new Buffer(content, 'binary'))
})
```

### Plugins

By default, `dream-pdf` only supports adding text.

```js
doc.add('Hello, PDF reader!')
```

Which is just a shortcut for

```js
doc.add({ type: 'text', content: 'Hello, PDF reader!' })
```

To add other things than 'text' to your PDF, a plugin
needs to be registered that handles the types.

```js
// register new plugins
DreamPDF.plugin({
  'image': require('dream-pdf-image'),
  'password': require('dream-pdf-password')
})
// start new PDF and add objects with
// type matching the keys above
var doc = new DreamPDF(/* options */)
pdf.add({
  type: 'image',
  path: './path/to/image.png'
})
pdf.add({
  type: 'password',
  content: 'secret'
})
```

## Resources

- Official specifications: https://www.adobe.com/devnet/pdf/pdf_reference_archive.html
- Twitter thread with great slide decks and cheat sheets: https://mobile.twitter.com/angealbertini/status/1194219247112785920

## License

MIT
