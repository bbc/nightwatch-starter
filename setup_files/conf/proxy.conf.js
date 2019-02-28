// Read in the common nightwatch configuration
var nightwatch_config = require('./common.conf');

var proxy = {
  protocol: process.env.PROXY_PROTOCOL,
  host: process.env.PROXY_HOST,
  port: process.env.PROXY_PORT,
};

for(i in nightwatch_config.test_settings) {
  nightwatch_config.test_settings[i].proxy = {};
  Object.assign(nightwatch_config.test_settings[i].proxy, proxy);
}

module.exports = nightwatch_config;
