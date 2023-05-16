// Import external dependecies
const { path } = require('../package.json');

const del = require('del');
const replace = require('gulp-replace');

// Import main dependecies
const gulp = require('gulp');

// Import working dependecies
const cheerio = require('gulp-cheerio');
const cleanSvg = require('gulp-cheerio-clean-svg');

// Make icons sprite
const icons = () => {
  return gulp.src(path.src + '/icons/**/*.svg')
    .pipe(cheerio(cleanSvg({
      removeSketchType: true,
      removeEmptyGroup: true,
      removeEmptyDefs: true,
      removeEmptyLines: true,
      removeComments: true,
      tags: ["title", "desc"],
      attributes: ["fill*", "stroke*"]
    })))
    .pipe(replace("&gt;", ">"))
    .pipe(gulp.dest(path.src + '/app/icons/'))
}

module.exports = icons;