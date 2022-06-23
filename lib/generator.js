'use strict';

const pagination = require('hexo-pagination');
const { sort } = require('timsort');

module.exports = function(locals) {
  const config = this.config;
  const posts = locals.posts.sort(config.index_generator.order_by);
  const texposts = locals.pages.filter(function(post) {
    return post.source.slice(-4) == '.tex';
  });
  posts.data = posts.data.concat(texposts.data);

  sort(posts.data, (a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
