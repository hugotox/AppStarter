module.exports = (app, server) => {
  server.get('/dynamic/:id', (req, res) => {
    const actualPage = '/dynamic'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })
}
