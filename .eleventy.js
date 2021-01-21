const sassWatch = require("./sass-watch");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  if (process.argv.includes("--watch")) {
    // Watch Sass directory for updates.
    sassWatch("./src/_sass/_main.scss", "./dist/css/main.css");
    // Refresh the browser when there are updates in the Sass directory.
    eleventyConfig.addWatchTarget("./src/_sass/**/*");
  }

  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("dist");
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
