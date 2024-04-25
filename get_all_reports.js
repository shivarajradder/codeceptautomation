// const ncp = require('ncp').ncp
// const { readdirSync } = require('fs')
// const outputPath = '.\\output\\' 

const ncp = require('ncp').ncp
const { readdirSync } = require('fs')
const { tearDownAll } = require('./dist/Framework/FrameworkUtilities/Bootstrap/teardownAll.js')
const outputPath = './output/'
const FailureAnalyzer = require("./dist/Framework/FrameworkUtilities/FailureAnalyzer").FailureAnalyzer;
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const allFodlers = getDirectories(outputPath)

module.exports = async function() {
  for (const folder of allFodlers) {
    ncp.limit = 0;
    ncp(`${outputPath}${folder}`, outputPath, (error) => {
      if (error) {
        return console.error(error);
      }
    })
    console.log("Report Done");
  }
  await FailureAnalyzer.writeToDb();
  console.log("tearDown All executed");
  await tearDownAll.teardownAllMethod();
  }