var request = require('request');

var options = {
  url: 'https://api.browserstack.com/automate/builds.json?status=running',
  auth: {
    'user': process.env.BROWSERSTACK_USERNAME,
    'pass': process.env.BROWSERSTACK_ACCESS_KEY,
  }
};

module.exports = {

  // Global settings
  waitForConditionTimeout: 10000, // time in ms

  // screenshot visual regression options
  visual_regression_settings: {
    latest_screenshots_path: 'screenshots/' + process.env.LOCATION + '/latest',
    latest_suffix: '',
    baseline_screenshots_path: 'screenshots/' + process.env.LOCATION + '/baseline',
    baseline_suffix: '',
    diff_screenshots_path: 'screenshots/' + process.env.LOCATION + '/diff',
    diff_suffix: '',
    threshold: 0,
    prompt: false,
    always_save_diff_screenshot: false,
  },

  // Things to do before all tests
  before: function (done) {
    done();
  },

  // Things to do at the start of each test
  beforeEach: function (browser, done) {
    // If using Browserstack, show the build/session id in the console, so we can quickly go to it
    if (process.env.LOCATION == 'remote') {
      request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          builds = JSON.parse(body);
          builds.forEach(function (item) {
            if (item.automation_build.name == browser.options.desiredCapabilities.build) {
              console.log('https://automate.browserstack.com/builds/' + item.automation_build.hashed_id + '/sessions/' + browser.sessionId)
            }
          });
        }
      });
    }
    done();
  },

  // Things to do after all tests
  after: function (done) {
    done();
  },

  // Things to do after each test
  afterEach: function (browser, done) {
    // Ensure the browser closed
    browser.end();
  },
};
