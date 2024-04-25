const fs = require('fs');
const path = require('path')

const getPathAndData = (fileName) => {
  return {
    filePath: path.resolve(__dirname, `./node_modules/selenium-standalone/lib/${fileName}.js`),
    fileData: fs.readFileSync(path.resolve(__dirname, `./node_modules/selenium-standalone/lib/${fileName}.js`), 'utf8')
  }
}

const {filePath: urlsPath, fileData: urlsData} = getPathAndData('compute-download-urls')
const newUrls = urlsData.replace('getIeDriverArchitecture(opts.drivers.ie.arch)', 'getIeDriverArchitecture(`ia32`)')

module.exports = () => {
  fs.writeFileSync(urlsPath, newUrls, {encoding: 'utf8'})
}