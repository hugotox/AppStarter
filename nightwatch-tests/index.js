
function indexShowsMessageFromRedux(browser) {
  const indexPage = browser.page.index()

  indexPage.navigate()
  indexPage.expect.element('@mainTitle').to.be.visible
  indexPage.expect.element('@mainTitle').text.to.equal('Message from the store: Hello World from the API')

  browser.end()
}

module.exports = {
  'Demo test index page': indexShowsMessageFromRedux
}