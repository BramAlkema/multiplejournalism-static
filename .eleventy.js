const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItContainer = require('markdown-it-container');

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("93d0270");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("*.html");

  // Configure Markdown
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  const md = markdownIt(mdOptions)
    .use(markdownItAttrs)
    .use(markdownItContainer, 'soundcloud', {
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const content = tokens[idx + 2]?.content || '';
          const lines = content.split('\n').filter(l => l.trim());
          const src = lines[0] || '';
          const title = lines[1] || '';
          const meta = lines[2] || '';

          let html = '<div class="section-media soundcloud">\n';
          if (src.includes('soundcloud.com')) {
            html += `<iframe width="100%" height="450" allow="autoplay" src="${src}"></iframe>\n`;
          }
          html += '<div class="credits credits--right">\n';
          html += `<span class="credits__title">${title}</span> <span class="credits__meta">${meta}</span>\n`;
          html += '</div>\n';

          return html;
        } else {
          return '</div>\n';
        }
      }
    })
    .use(markdownItContainer, 'video', {
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const info = tokens[idx].info.trim().slice('video'.length).trim();

          // Parse attributes from {src="..." title="..." credit="..."}
          const srcMatch = info.match(/src="([^"]+)"/);
          const titleMatch = info.match(/title="([^"]*)"/);
          const creditMatch = info.match(/credit="([^"]*)"/);

          const src = srcMatch ? srcMatch[1] : '';
          const title = titleMatch ? titleMatch[1] : '';
          const credit = creditMatch ? creditMatch[1] : '';

          let html = '<div class="section-media">\n';
          html += '<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">\n';
          if (src) {
            html += `<iframe src="${src}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>\n`;
          } else {
            html += '<span class="play-button"></span>\n';
          }
          html += '</div>\n';
          html += '<figcaption class="credits credits--right">\n';
          html += `<span class="credits__title">${title}</span> <span class="credits__meta">${credit}</span>\n`;
          html += '</figcaption>\n';

          return html;
        } else {
          return '</div>\n';
        }
      }
    });

  eleventyConfig.setLibrary("md", md);

  // Add category filter
  eleventyConfig.addFilter("byCategory", function(collection, category) {
    if (!category) return collection;
    return collection.filter(item => item.data.category === category);
  });

  // Add filter to find case by slug
  eleventyConfig.addFilter("findBySlug", function(collection, slug) {
    if (!slug || slug === "") return null;
    return collection.find(item => item.data.slug === slug);
  });

  // Add collection for cases
  eleventyConfig.addCollection("cases", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/cases/*.md");
  });

  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    pathPrefix: "/multiplejournalism-static/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
