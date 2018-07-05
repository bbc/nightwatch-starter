require('dotenv').config();
var fs = require('fs');
var browsers = JSON.parse(fs.readFileSync('./browsers.json', 'utf8'));

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
    start_process : false,
    host : 'hub-cloud.browserstack.com',
    port : 80,
  },

  common_capabilities: {
    build: process.env.BROWSERSTACK_USERNAME + '-' + process.env.ENV + '-cd-nightwatchjs-' +
      new Date().toLocaleDateString([], {year: 'numeric', month: '2-digit', day: '2-digit'}) + ' ' +
      new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    project: 'CD-Nightwatch',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.debug': true,
  },

  test_workers: true,

  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots/failures',
      },
      javascriptEnabled: true,
      skip_testcases_on_fail: false,
    },
  },
};

var config = nightwatch_config.test_settings || {};

browsers.forEach(function (browser) {
  config[browser.name] = {};
  config[browser.name].selenium_host = nightwatch_config.selenium.host;
  config[browser.name].selenium_port = nightwatch_config.selenium.port;
  config[browser.name].desiredCapabilities = browser.desiredCapabilities || {};
  for (var i in nightwatch_config.common_capabilities) {
    config[browser.name].desiredCapabilities[i] = nightwatch_config.common_capabilities[i];
  }
});

module.exports = nightwatch_config;
