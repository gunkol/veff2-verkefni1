const express = require('express');
const fs = require('fs');
const util = require('util');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const router = express.Router();
const readFileAsync = util.promisify(fs.readFile);

const encoding = 'utf8';
const path = './articles';
const file = 'deloren-ipsum.md';

async function read(filename) {
  const data = await readFileAsync(filename);
  const md = new MarkdownIt();
  const result = await md.render(matter(data.toString(encoding)).content);
  return result;
}

router.get('/:slug', (req, res) => {
  res.send(req.params.slug);
});

async function main() {
  const data = await read(`${path}/${file}`);
  router.get('/', (req, res) => {
    res.send(data);
  });
}

main();
module.exports = router;
