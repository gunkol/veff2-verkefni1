const fs = require('fs');
const util = require('util');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const encoding = 'utf8';
const path = './articles';
const file = 'batman-ipsum.md';

async function read(filename) {
  const data = await readFileAsync(filename);

  return data.toString(encoding);
}

/*
async function write(filepath, content) {
  const md = new MarkdownIt();
  const result = md.render(content);

  return writeFileAsync(filepath, result, { encoding });
}
*/

async function main() {
  const data = await read(`${path}/${file}`);
  const md = new MarkdownIt();
  const result = md.render(matter(data).content);
  console.log(result);
  // console.log(matter(data).data.title);
  // console.log(data);
  // await write(output, data);
}

main();
/*
const fs = require('fs');
const matter = require('gray-matter');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const path = './articles';

async function read(file) {
  const data = await readFileAsync(file);

  return data.toString('utf-8');
}

async function write(content) {
  const md = new MarkdownIt();
  console.log(content);

  // return writeFileAsync(filepath, result, { encoding });
}

async function main() {
  fs.readdir(path, (err, items) => {
    items.forEach(file => {
      const data = read(file);
      write(data);
    });
  });
}

main();
*/
