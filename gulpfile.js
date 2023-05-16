// Import external dependecies
const { path } = require('./package.json');

// Import main dependecies
const gulp   = require('gulp');

// Import work dependecies
const images = require('./gulp/images');
const icons = require('./gulp/icons');
const watch  = require('gulp-watch');
const del    = require('del');

// Watch images.
const _watch = () => {
  watch( 
    path.src + '/img/**/*',
    images
  );
  watch( 
    path.src + '/icons/**/*.svg',
    icons
  );
};

const reset = async () => {
  try {
    const deleted = await del([path.dist+'/img/']);
  } catch(e) {
    console.warn(e);
  }
}

// exports
module.exports = {
  images,
  icons,
  reset,
  build: gulp.series(
    reset,
    icons,
    images
  ) 
};
module.exports.default = gulp.parallel(
  images,
  icons,
  _watch
);