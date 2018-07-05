var selenium = require('selenium-server-standalone-jar');
var chromedriver = require('chromedriver');

var nightwatch_config = {
  src_folders: ['tests'],
  page_objects_path: ['pages'],
  globals_path: 'global.js',
  custom_commands_path : [
    'commands',
    'node_modules/nightwatch-commands/commands',
    'node_modules/nightwatch-vrt/commands',
  ],
  custom_assertions_path : [
    'assertions',
    'node_modules/nightwatch-commands/assertions',
    'node_modules/nightwatch-vrt/assertions',
  ],

  selenium: {
    start_process : true,
    server_path : selenium.path,
    host: '127.0.0.1',
    port : 9515,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
    },
  },

  common_capabilities: {
    build: 'cd-nightwatchjs',
    project: 'CD-Nightwatch',
  },

  test_workers: false,

  test_settings: {
    default: {
      default_path_prefix: '',
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots/failures',
      },
      skip_testcases_on_fail: false,
      browserName: 'chrome',
      desiredCapabilities: {
        chromeOptions: {
          args: [
            'incognito',
            'window-size=1366,768',
          ],
        },
      },
    },
  },
};

// Code to support common capabilites
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config.selenium_host = nightwatch_config.selenium.host;
  config.selenium_port = nightwatch_config.selenium.port;
  config.desiredCapabilities = config.desiredCapabilities || {};
  for (var j in nightwatch_config.common_capabilities) {
    config.desiredCapabilities[j] = config.desiredCapabilities[j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
