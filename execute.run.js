#!/usr/bin/env node

const {
  maxSessionCount,
  formCommand,
  getReruner,
  getFeatureFiles,
  cleanUpTempConfigs
} = require('./execute-tests')

async function runRetrier() {
  // get reRunner
  const reRunner = getReruner({
    attemptsCount: 1,
    maxSessionCount,
    debugProcess: true,
    pollTime: 250,
    longestProcessTime: 600000 * 10,
  });
  // execute run
  const modernRun = await reRunner(getFeatureFiles().map(formCommand));
  // add addition info to allure report
  const exitCode = modernRun.failedCommands.length || modernRun.failedByAssert.length ? 1 : 0;

  // remove temp configs
  cleanUpTempConfigs()

  process.exit(exitCode);
}

runRetrier();
