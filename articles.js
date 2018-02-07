const express = require('express');
const fs = require('fs');
const util = require('util');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const path = require('path');

const router = express.Router();
const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

const encoding = 'utf8';

async function read(filename) {
  const data = await readFileAsync(filename);
  const md = new MarkdownIt();
  const result = await md.render(matter(data.toString(encoding)).content);
  return result;
}

router.get('/', (req, res) => {
  res.send('Hæ forsíða');
});

router.get('/:slug', (req, res) => {
  res.send(`Hæ undirsíða ${req.params.slug}`); /* eslint-disable-line */
});

module.exports = router;
