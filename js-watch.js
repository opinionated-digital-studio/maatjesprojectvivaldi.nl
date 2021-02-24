const browserify = require("browserify");
const babelify = require("babelify");
const fs = require('fs')
const path = require('path')
const watch = require('node-watch')

const buildJs = (jsPath, compiledPath) => {
  return browserify()
    .transform(babelify)
    .require(jsPath, { entry: true })
    .bundle()
    .on('error', (err) => {throw err})
    .pipe(fs.createWriteStream(compiledPath))
}

module.exports = (jsPath, compiledPath) => {
  if (!fs.existsSync(path.dirname(compiledPath))) {
    console.log(`Creating new dist directory: ${path.dirname(compiledPath)}`)
    fs.mkdir(path.dirname(compiledPath), {recursive: true}, (mkdirErr) => {
      if (mkdirErr) throw mkdirErr
      console.log('JS directory created.')
    })
  }
  buildJs(jsPath, compiledPath)
  watch('./src/_js/', {recursive: true}, (evType, filename) => {
    console.log(`JS file changed: ${path.dirname(jsPath)}/${filename}`)
    buildJs(jsPath, compiledPath)
  })
}
