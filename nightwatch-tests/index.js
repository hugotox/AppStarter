
function indexShowsMessageFromRedux(browser) {
  const indexPage = browser.page.index()

  indexPage.navigate()

  browser.waitForElementVisible('body', 10000)

  indexPage.expect.element('@mainTitle').to.be.visible
  indexPage.expect.element('@mainTitle').text.to.equal('App Starter')

  browser.end()
}

module.exports = {
  'Demo test index page': indexShowsMessageFromRedux
}