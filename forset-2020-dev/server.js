const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const app_port = 3016;

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(app_port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + app_port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
