
/* eslint-env mocha, es6 */

const path = require('path');
const generate = require('@gerhobbelt/markdown-it-testgen');
const Md = require('@gerhobbelt/markdown-it');
const plugin = require('../');


describe('markdown-it-named-headings', function () {
  const md = Md({ linkify: true })
              .use(plugin);

  generate(path.join(__dirname, 'fixtures/named-headings.txt'), null, md, null, { desc: 'named-headings' });
});
