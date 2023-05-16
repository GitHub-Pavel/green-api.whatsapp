// Import external dependences
const { path } = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependecies
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

// Minify and cache images
const images = () => {
  return gulp.src( path.src + '/img/**/*' )
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
    ])))
    .pipe(gulp.dest( path.dist + '/img/' ));
};

module.exports = images;