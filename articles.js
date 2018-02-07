const express = require('express');
const fs = require('fs');
const util = require('util');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const path = require('path');

const router = express.Router();
const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

const md = new MarkdownIt();
const articlePath = './articles';

/*
  tekur hverja grein sem við möppum í readArticlesList og skilar
  bæði contentinu í html og data-inu í breytum sem við þekkjum
*/
async function readArticle(filepath) {
  const file = await readFileAsync(filepath);
  const data = matter(file);

  const {
    content,
    data: {
      title,
      slug,
      date,
      image,
    },
  } = data;

  return {
    content: md.render(content),
    title,
    slug,
    date: Date.parse(date),
    image,
    path: filepath,
  };
}


async function readArticlesList() {
  const files = await readdirAsync(articlePath);
  const articles = files.filter(file => path.extname(file) === '.md')
    .map(file => readArticle(`${articlePath}/${file}`));

  return Promise.all(articles);
}


/*
  list býr til forsíðuna með því að kalla á föll
  eins og readArticlesList og fl. sem vinna vinnuna
*/
async function list(req, res) {
  const title = 'Greinasafnið';
  const articles = await readArticlesList();
  const articlesNewestFirst = articles.sort((a, b) => a.date < b.date);

  // tökum síðan listann af greinum og birtum í ejs template
  res.render('index.ejs', { title, articles: articlesNewestFirst });
}

async function article(req, res) {
  res.send('Hello');
}

router.get('/', list);

router.get('/:slug', article);

module.exports = router;
