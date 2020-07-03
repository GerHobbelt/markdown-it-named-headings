import kebabcase from 'lodash.kebabcase';
import unidecode from 'unidecode';

module.exports = function plugin(md, options) {
  md.core.ruler.push('named_headings', namedHeadings.bind(null, md));
};

function namedHeadings(md, state) {
  let ids = {};

  state.tokens.forEach(function (token, i) {
    if (token.type === 'heading_open') {
      let text = md.renderer.render(state.tokens[i + 1].children, md.options);
      let id = kebabcase(unidecode(text));
      let uniqId = uncollide(ids, id);
      ids[uniqId] = true;
      setAttr(token, 'id', uniqId);
    }
  });
}

function uncollide(ids, id) {
  if (!ids[id]) return id;
  let i = 1;
  while (ids[id + '-' + i]) { i++; }
  return id + '-' + i;
}

function setAttr(token, attr, value, options) {
  let idx = token.attrIndex(attr);

  if (idx === -1) {
    token.attrPush([ attr, value ]);
  } else if (options && options.append) {
    token.attrs[idx][1] =
      token.attrs[idx][1] + ' ' + value;
  } else {
    token.attrs[idx][1] = value;
  }
}
