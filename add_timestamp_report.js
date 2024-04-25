const fs = require('fs');
const path = require('path')

const getPathAndData = (fileName) => {
  return {
    filePath: path.resolve(__dirname, `./node_modules/allure-js-commons/beans/${fileName}.js`),
    fileData: fs.readFileSync(path.resolve(__dirname, `./node_modules/allure-js-commons/beans/${fileName}.js`), 'utf8')
  }
}

const {filePath: stepPath, fileData: stepData} = getPathAndData('step')
const {filePath: screenshotPath, fileData: screenshotData} = getPathAndData('attachment')
const newStep = stepData.replace('title: this.name', 'title: `${this.name}, ${new Date(this.stop).toLocaleString()}`')
const newScreenshot = screenshotData.replace('title: this.title', 'title: `${this.title}, ${new Date().toLocaleString()}`')

module.exports = () => {
  fs.writeFileSync(stepPath, newStep, {encoding: 'utf8'})
  fs.writeFileSync(screenshotPath, newScreenshot, {encoding: 'utf8'})
}