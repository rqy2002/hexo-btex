/* global hexo */
'use strict';

const fs = require('hexo-fs');
const path = require('path');
const renderer = require('./lib/renderer');

hexo.extend.renderer.register('tex', 'html', renderer.render);

hexo.extend.filter.register('after_post_render', renderer.after_render);

const css = hexo.extend.helper.get('css').bind(hexo);
const js = hexo.extend.helper.get('js').bind(hexo);

hexo.extend.generator.register('btex_asset', () => [{
  path: 'css/btex_styles.css',
  data: function() {
    return fs.createReadStream(path.resolve(path.resolve(__dirname, './assets'), 'btex_styles.css'));
  }
}]);

hexo.extend.injector.register('head_end', () => {
  var i = css('https://cdn.bootcdn.net/ajax/libs/KaTeX/0.15.3/katex.min.css');
  i += css(`${hexo.config.root}css/btex_styles.css`);
  return i;
}, 'default');

hexo.config.index_generator = Object.assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.index_generator);

hexo.extend.generator.register('index', require('./lib/generator'));
