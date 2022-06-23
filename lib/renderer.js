
/* global hexo */
'use strict';

const path = require('path');
const fs = require('fs').promises;
const btex = require('btex');
const rExcerpt = /^%\s*more\s*$/mi;
const rExcerpt1 = 'TEX_EXCERPT_POSITION_RESERVED';

function render(data, options) {
  var text = data.text.replace(rExcerpt, 'TEX_EXCERPT_POSITION_RESERVED');
  if (data.path)
    return fs.readFile(path.join(path.dirname(data.path), '_preamble.tex'), { encoding: 'utf8' })
      .then(function(result) {
        return btex.render(text, result);
      }).catch(function(err) {
        if (err.code != 'ENOENT') throw err;
        return btex.render(text);
      });
  else
    return btex.render(text);
}

function after_render(data) {
  data.content = data.content.replace(rExcerpt1, function(match, index) {
    console.log('qwq');
    if (typeof data.excerpt == 'undefined' || data.excerpt == '')
      data.excerpt = data.content.substring(0, index).trim();
    return '<span id="more"> </span>';
  });
  //console.log(data.excerpt);
}

module.exports = {
  render: render,
  after_render: after_render
}
