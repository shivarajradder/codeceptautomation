require("source-map-support").install();
const startup = require("./dist/Framework/FrameworkUtilities/Startup/Startup").Startup;
const PropertiesConfigurator = require("./dist/Framework/PropertiesConfigurator/PropertiesConfigurator");
const prop = require("./dist/Framework/FrameworkUtilities/config").prop;
const coeStartup = require("./dist/COE_AUTOMATION/src/Framework/FrameworkUtilities/Startup/Startup").Startup;
const addTimeStampToReport = require('./src/COE_AUTOMATION/add_timestamp_report');
const customChunks = require('./src/COE_AUTOMATION/customChunk');
startup.lang = 'en'
PropertiesConfigurator.parseJson();
const path =require('path');
prop.downloadDir = path.join(__dirname, 'tempDownload'); 
//const customChunks=require('./customChunk');
const changeIeVesrion = require('./ie_change_bit_version');
changeIeVesrion();
addTimeStampToReport();

exports.config = {
  tests: "./*_test.js",
  output: "./output",
  gherkin: {
    features: ["./src/iSupplier/features/**/*.feature","./src/AppEnablement/src/**/**/*.feature"],
    //steps: "./dist/iSupplier/implementation/**/*.js",
    steps: "./dist/**/implementation/**/**/*.js"
},
  helpers: {
    WebDriver: {
      url: prop.url,
      browser: prop.browser,
      path: "/wd/hub",
      host:prop.host,
     // host: "test:test-password@172.30.225.88",
       port: prop.port,
      restart: true,
      //keepCookies: true,
      windowSize: prop.windowSize,
      waitForTimeout: 300000,
      smartWait:5000, 
      timeouts: {
        "script": 50000,
        "page load": 50000
      },
      default_low_wait: prop.DEFAULT_LOW_WAIT,
      default_medium_wait: prop.DEFAULT_MEDIUM_WAIT,
      default_high_wait: prop.DEFAULT_HIGH_WAIT,

      desiredCapabilities: 
      {
        // chromeOptions: 
        // {
        //   // excludeSwitches: ['enable-automation'],

        //   // args: ["--disable-gpu", "--no-sandbox", "--ignore-certificate-errors","--disable-dev-shm-usage"],
        //   // prefs: 
        //   // {
        //   //   download: 
        //   //   {
        //   //     'default_directory':prop.downloadDir,
        //   //     'prompt_for_download': false,
        //   //   }
        //   // }
        // },
          // 'selenoid:options': 
        // {
        //   enableVNC: true,
        //   enableVideo: false
        // },
        pageLoadStrategy: 'none',
        chromeOptions: {
          binary: 'C:/Users/suraj.singh/Desktop/chrome-win64/chrome-win64/chrome.exe', // Set the path to the Chrome executable
          args: ["--disable-gpu", "--no-sandbox", "--ignore-certificate-errors"],
        },
        'selenoid:options': {
          enableVNC: true,
          enableVideo: false
        }
      }
    },
    
    REST: {
      timeout: 900000
    },
   ChaiWrapper:
    {
      require: "codeceptjs-chai"
    },
    xpathValidate: 
    { 
    require: "./src/COE_AUTOMATION/xpathValidation.js",
    enabled: true 
    },
    MyHelper:
    {
      require: "./dist/Framework/CustomHelper/myHelper.js",
    },
    ApiHelper: {

      require: "./dist/dd_api_automation/src/Framework/ApiHelper.js"
      
      },
      CoeHelper:
{ 
    require: "./dist/COE_AUTOMATION/src/Framework/CustomHelper/CoeHelper.js",
},
REST: {timeout:900000},
  },
  bootstrapAll: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrapAll,
  bootstrap: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrap,
  teardown: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").teardown,
  teardownAll: require("./src/COE_AUTOMATION/get_all_reports.js"),
  include: {
    I: prop.stepFilePath,
  },
  // multiple: {
  //   parallel: {
  //     "chunks": (files) => {
  //       return customChunks(files, 17 )
  //   }
  // }
  // },
   
  name: prop.projectName,
  plugins: {
//     stepByStepReport: {
// "enabled": true,
// "deleteSuccessful": false,
// "animateSlides": true,
// "fullPageScreenshots": true,
// "screenshotsForAllureReport": true
// },
    tryTo: {
      enabled:true
    },
    check_MST_Key: {
      require: "./check_MST_Key.js",
      enabled: true
      },
    "mocha": {
      "reporterOptions": {
          "reportDir": "output"
      }
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
    wdio: {
     enabled: true,
      services: ["selenium-standalone"]
    },
    allure: {
      enabled: true
    },
    require: ["ts-node/register"]
  }
};