// Read in the common nightwatch configuration
var nightwatch_config = require('./common.conf');

Object.assign(nightwatch_config.webdriver, {
  start_process: false,
  host: '127.0.0.1',
  port: 9515,
});

nightwatch_config.test_workers = false;

Object.assign(nightwatch_config.test_settings.default, {
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
});

// Code to support common capabilites
if (process.env.CHROME_HEADLESS) {
  nightwatch_config.test_settings.default.desiredCapabilities.chromeOptions.args.push('headless', 'disable-gpu');
  console.log('\033[0m\033[1;33mRunning Chrome in headless mode');
}

module.exports = nightwatch_config;
