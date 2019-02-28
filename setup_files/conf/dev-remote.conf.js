// Read in the common nightwatch configuration
var nightwatch_config = require('./common.conf');

Object.assign(nightwatch_config.common_capabilities, {
  'browserstack.local': true,
});

module.exports = nightwatch_config;
