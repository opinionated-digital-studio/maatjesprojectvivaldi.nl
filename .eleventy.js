const sassWatch = require("./sass-watch");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  if (process.argv.includes("--watch")) {
    // Watch Sass directory for updates.
    sassWatch("./src/_sass/main.scss", "./src/css/main.css");
    // Refresh the browser when there are updates in the Sass directory.
    eleventyConfig.addWatchTarget("./src/_sass/**/*");
  }

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/assets");
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
