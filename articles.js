const express = require('express');
const fs = require('fs');
const util = require('util');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const articles = express.Router();
const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

const encoding = 'utf8';
const path = './articles';
const file = 'batman-ipsum.md';

async function read(filename) {
  const data = await readFileAsync(filename);

  return data.toString(encoding);
}

async function main() {
  const data = await read(`${path}/${file}`);
  const md = new MarkdownIt();
  const result = md.render(matter(data).content);
  articles.get('/', (req, res) => {
    res.send(result);
  });
  // console.log(matter(data).data.title);
}

main();
module.exports = articles;