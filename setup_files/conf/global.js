var chromedriver = require('chromedriver');

module.exports = {

  // Global settings
  waitForConditionTimeout: 10000, // time in ms

  // screenshot visual regression options
  visual_regression_settings: {
    latest_screenshots_path: 'screenshots/' + process.env.location + '/latest',
    latest_suffix: '',
    baseline_screenshots_path: 'screenshots/' + process.env.location + '/baseline',
    baseline_suffix: '',
    diff_screenshots_path: 'screenshots/' + process.env.location + '/diff',
    diff_suffix: '',
    threshold: 0,
    prompt: false,
    always_save_diff_screenshot: false,
  },

  // If running locally start the chromedriver
  before: function (done) {
    if (process.env.location === 'local') {
      chromedriver.start();
    }

    done();
  },

  // This will be run before each test suite is started
  beforeEach: function (browser, done) {
    done();
  },

  // If running locally stop the chromedriver
  after: function (done) {
    if (process.env.location === 'local') {
      chromedriver.stop();
    }

    done();
  },

  // This will be run after each test suite has finished
  afterEach: function (browser, done) {
    // Ensure the browser closed
    browser.end();
  },
};
