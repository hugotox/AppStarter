module.exports = {
  "src_folders": ['nightwatch-tests'],
  "output_folder" : "nightwatch-reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : true,
    "start_session" : true,
    "server_path" : "bin/selenium-server-standalone.jar",
    "log_path" : "./selenium-logs",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./bin/chromedriver",
      "webdriver.gecko.driver" : "./bin/geckodriver"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://app-starter.com",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    }
  }
}