module.exports = {
  'Demo test index page': function(browser) {
    browser.url('http://localhost:4000/')
      .waitForElementVisible('body', 1000)
      .assert.containsText('h3', 'Message from the store: Hello World from the API')
      .end();
  }
}