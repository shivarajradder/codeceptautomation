module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    //'es6': true,
  },
  'extends': [
    // 'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    // "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  'plugins': [
    'dd-eslint-rules', "unused-imports", "cucumber"
  ],
  'rules': {

    "dd-eslint-rules/hard-coded-wait": ["warn"],
    "dd-eslint-rules/I.actions-removal": ["warn"],
    "dd-eslint-rules/dd-cc-zycus-automation-component-adoption": ["warn"],
    "dd-eslint-rules/Startup-automation-component-adoption": ["warn"],
    "dd-eslint-rules/Actionbot-automation-component-adoption": ["warn"],
    "dd-eslint-rules/i18nUtil-LMT-automation-component-adoption": ["warn"],
    "dd-eslint-rules/xpath-locators-inside-the_script": ["warn"],
    "unused-imports/no-unused-imports": "warn",
    "cucumber/async-then": "warn",
    "require-await": "warn",
    "dd-eslint-rules/wdio-in-codecept.config": "error"

  },
  "overrides": [
    {
      "files": ["*.conf.js", "*_report.js", "*_reports.js", "*_file.js", "*.d.ts", "*.run.js","*bootstrap.js"],
      "rules": {
        "dd-eslint-rules/hard-coded-wait": ["off"],
        "dd-eslint-rules/I.actions-removal": ["off"],
        "dd-eslint-rules/dd-cc-zycus-automation-component-adoption": ["off"],
        "dd-eslint-rules/Startup-automation-component-adoption": ["off"],
        "dd-eslint-rules/Actionbot-automation-component-adoption": ["off"],
        "dd-eslint-rules/i18nUtil-LMT-automation-component-adoption": ["off"],
        "dd-eslint-rules/xpath-locators-inside-the_script": ["off"],
        "unused-imports/no-unused-imports": "off",
        "cucumber/async-then": "off",
        "require-await": "off"
      }
    }
  ]
};
