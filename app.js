const express = require('express');
const articles = require('./articles');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use('/', articles);

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
