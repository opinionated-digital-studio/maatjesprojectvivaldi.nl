const sassWatch = require("./sass-watch");
const jsWatch = require("./js-watch")
const fs = require("fs");

module.exports = function (eleventyConfig) {
  if (process.argv.includes("--watch")) {
    // Watch Sass directory for updates.
    sassWatch("./src/_sass/main.scss", "./src/css/main.css");
    jsWatch("./src/_js/main.js", "./src/js/bundle.js")
    // Refresh the browser when there are updates in the Sass directory.
    eleventyConfig.addWatchTarget("./src/_js/**/*");
    eleventyConfig.addWatchTarget("./src/_sass/**/*");
  }

  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      layouts: "_layouts",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
