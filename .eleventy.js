const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Nicer Markdown: smart quotes/dashes + clickable heading anchors
  const md = markdownIt({ html: true, breaks: false, linkify: true, typographer: true })
    .use(markdownItAnchor, { permalink: false });
  eleventyConfig.setLibrary("md", md);

  // Articles collection: every file in src/articles, newest first,
  // with drafts hidden unless ELEVENTY_ENV=development
  eleventyConfig.addCollection("articles", (collectionApi) => {
    const isDev = process.env.ELEVENTY_ENV === "development";
    return collectionApi
      .getFilteredByGlob("src/articles/*.md")
      .filter((item) => isDev || !item.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Date formatting filter, e.g. "March 3, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // ISO date for <time datetime="">
  eleventyConfig.addFilter("isoDate", (dateObj) => new Date(dateObj).toISOString());

  // Rough reading time estimate based on word count
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || "").toString().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
