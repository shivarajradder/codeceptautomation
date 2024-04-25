const prop = require("./dist/Framework/FrameworkUtilities/config").prop;
const addTimeStampToReport = require('./src/COE_AUTOMATION/add_timestamp_report');
addTimeStampToReport();
require("./dist/COE_AUTOMATION/src/Framework/FrameworkUtilities/FailureAnalyzer/EventListenerFA").eventListener();
require('events').EventEmitter.prototype._maxListeners = 100;
prop.enableInfraDetailsScript = true;
prop.dir = __dirname;

exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {

    WebDriver: {
      url: prop.url,
      browser: prop.browser,
      host: 'test:test-password@172.30.225.88',
      port: 4444,
      path: "/wd/hub",
      restart: true,
      keepCookies: false,
      windowSize: prop.windowSize,
      waitForTimeout: 90000,
      smartWait: 5000,
      timeouts: {
        "script": 90000000,
        "page load": 150000
      },
      default_low_wait: prop.DEFAULT_LOW_WAIT,
      default_medium_wait: prop.DEFAULT_MEDIUM_WAIT,
      default_high_wait: prop.DEFAULT_HIGH_WAIT,
      desiredCapabilities: {
        pageLoadStrategy: 'none',
        chromeOptions: {
          args: ["--disable-gpu", "--no-sandbox", "--ignore-certificate-errors"],
          prefs: {
            download: {
              'prompt_for_download': false,
              'default_directory': '/home/selenium/Downloads'

            }
          }
        },
        selenoidOptions: {
          sessionTimeout: "10000s",
          enableVNC: false,
          enableVideo: false

        }
      }


    },
    REST: { timeout: 900000 },
    ChaiWrapper:
    {
      require: "codeceptjs-chai"
    },
    MyHelper: {
      require: "./dist/Framework/CustomHelper/myHelper.js",
    },
    ApiHelper: {

      require: "./dist/dd_api_automation/src/Framework/ApiHelper.js"

    },
    CoeHelper:
    {
      require: "./dist/COE_AUTOMATION/src/Framework/CustomHelper/CoeHelper.js",
    },

  },
  bootstrapAll: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrapAll,
  bootstrap: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrap,
  teardown: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").teardown,
  teardownAll: require("./src/COE_AUTOMATION/get_all_reports.js"),
  include: {
    I: prop.stepFilePath,
  },
  multiple: {
    parallel: {
      chunks: 1
    }
  },
  gherkin: {
    features: "./src/AppEnablement/src/**/**/*.feature",
    steps: "./dist/**/implementation/**/**/*.js"
  },
  name: prop.projectName,
  plugins: {
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true,
      maxTimeout: 15000,
      minTimeout: 1000,
      retries: 7,
    },

    screenshotOnFail: {
      enabled: true
    },

    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    }
  }
};