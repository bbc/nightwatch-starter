// Declare a common configuration which can be used on all the subsequent configurations of nightwatch
var nightwatch_config = module.exports = {
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

  common_capabilities: {
    build: process.env.BROWSERSTACK_USERNAME + '-' + process.env.ENV + '-orbit-nightwatchjs-' +
      new Date().toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'}) + ' ' +
      new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', hour12: false}),
    project: 'CD-Orbit-Nightwatch',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.debug': true,
  },

  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
  },

  test_workers: true,

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
    },
  },
};
