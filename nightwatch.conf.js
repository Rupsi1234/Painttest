

module.exports = (function(config) {
    const argv = require('yargs').argv
   
    config.test_settings.default = {
        "launch_url": "http://localhost",
            "selenium_host": "127.0.0.1",
            "selenium_port": 4444,
            "silent": true,
            "persist_globals": true,
            "skip_testcases_on_fail": true,
            "disable_colors": false,
            "globals": {
                "visual_regression_settings": {
               
                    "generate_screenshot_path": "defaultScreenshotPathGenerator",
                    "latest_screenshots_path": "output/reports/vrt/latest",
                    "latest_suffix": "",
                    "baseline_screenshots_path": "output/reports/vrt/baseline",
                    "baseline_suffix": "",
                    "diff_screenshots_path": "output/reports/vrt/diff",
                    "diff_suffix": "",
                    "threshold": 0.8,
                    "prompt": false,
                    "always_save_diff_screenshot": false
                }
            },
            selenium: {
	        start_process: true,
	        server_path: require('selenium-server').path,
	        host: 'localhost',
	        port: 4444,
	        cli_args: {
	          'webdriver.chrome.driver': "/home/runner/Painttest/node_modules/chromedriver/lib/chromedriver/chromedriver",
	        },
  },
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "test_runner": {
                "type": "mocha",
                "options": {
                    "ui": "bdd",
                    "reporter": "mochawesome",
                    "grep": "",
                    "reporterOptions": {
                        "reportTitle": "Leonardo",
                        "overwrite": false
                    }
                }
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "marionette": true
            },
            "globals": {
                "waitForConditionTimeout": 5000,
                "retryAssertionTimeout": 5000
            }
    };
    if (argv.grep) {
        config.test_settings.default.test_runner.options.grep = argv.grep
    }

    if (argv.srcFolder) {
        config.src_folders = argv.srcFolder
    }
    return config;
})(require('./nightwatch.json'));