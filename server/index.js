require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeMasking = require('./route-masking');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    // dynamic URLS
    routeMasking(app, server);

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
