require('dotenv').config();

// Declare a common configuration which can be used on all the subsequent configurations of nightwatch
var nightwatch_config = {
  src_folders: ['tests'],
  page_objects_path: ['pages'],
  globals_path: 'global.js',
  custom_commands_path: [
    'commands',
    'node_modules/@bbc/nightwatch-commands/commands',
    'node_modules/@bbc/nightwatch-vrt/commands',
  ],
  custom_assertions_path: [
    'assertions',
    'node_modules/@bbc/nightwatch-commands/assertions',
    'node_modules/@bbc/nightwatch-vrt/assertions',
  ],

  webdriver: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
    default_path_prefix: '/wd/hub',
  },

  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots/' + process.env.LOCATION + '/failures',
      },
      javascriptEnabled: true,
      skip_testcases_on_fail: false,
      desiredCapabilities: {
        build: process.env.BROWSERSTACK_USERNAME + '-' + process.env.ENV + '-' + process.env.PROJECT_NAME + '-nightwatchjs-' +
          new Date().toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'}) + ' ' +
          new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', hour12: false}),
        project: 'CD-' + process.env.PROJECT_NAME + '-Nightwatch',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
        'browserstack.debug': true,
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'Chrome',
        os: 'Windows',
        os_version: '7',
        resolution: '1366x768',
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'Firefox',
        os: 'Windows',
        os_version: '7',
        resolution: '1366x768',
      }
    },
    ie: {
      desiredCapabilities: {
        browserName: 'IE',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '7',
        resolution: '1366x768',
        'browserstack.customSendKeys': 400,
      }
    },
    edge: {
      desiredCapabilities: {
        browserName: 'Edge',
        os: 'Windows',
        os_version: '10',
        resolution: '1366x768',
      }
    },
    safari: {
      desiredCapabilities: {
        browserName: 'Safari',
        os: 'OSX',
        os_version: 'Sierra',
        resolution: '1366x768',
      }
    },
    iphone: {
      desiredCapabilities: {
        browserName: 'iPhone',
        platform: 'MAC',
        device: 'iPhone XS',
        realMobile: 'true',
      }
    },
    galaxyS7Edge: {
      desiredCapabilities: {
        browser: 'Chrome',
        browserName: 'galaxyS7Edge',
        browser_version: '62.0',
        os: 'OSX',
        os_version: 'High Sierra',
        chromeOptions: {
          args: [
            'hide-scrollbars',
          ]
        },
      },
    },
  },
};

module.exports = nightwatch_config;