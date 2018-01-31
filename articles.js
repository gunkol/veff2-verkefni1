const fs = require('fs');

const path = './articles';

fs.readdir(path, (err, items) => {
  items.forEach(i => console.log(i));
});

