require('dotenv').config();
var selenium = require('selenium-server-standalone-jar');
var chromedriver = require('chromedriver');

// Read in the common nightwatch configuration
var nightwatch_config = require('./common-config');

Object.assign(nightwatch_config.selenium, {
  start_process: true,
  server_path: selenium.path,
  host: '127.0.0.1',
  port: 9515,
  cli_args: {
    'webdriver.chrome.driver': chromedriver.path,
  },
});

nightwatch_config.test_workers = false;

Object.assign(nightwatch_config.test_settings, {
  default: {
    default_path_prefix: '',
    browserName: 'chrome',
    desiredCapabilities: {
      acceptSslCerts: true,
      acceptInsecureCerts: true,
      chromeOptions: {
        args: [
          'incognito',
          'window-size=1366,768',
        ],
      },
    },
  },
});

// Code to support common capabilites
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config.selenium_host = nightwatch_config.selenium.host;
  config.selenium_port = nightwatch_config.selenium.port;
  config.desiredCapabilities = config.desiredCapabilities || {};
  for (var j in nightwatch_config.common_capabilities) {
    config.desiredCapabilities[j] = config.desiredCapabilities[j] || nightwatch_config.common_capabilities[j];
  }
  if (process.env.CHROME_HEADLESS) {
    config.desiredCapabilities.chromeOptions.args.push('headless', 'disable-gpu');
    console.log('\033[0m\033[1;33mRunning Chrome in headless mode');
  }
}

module.exports = nightwatch_config;
