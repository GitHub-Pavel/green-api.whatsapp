
const mix = require('laravel-mix');
const { path } = require('./package.json');

require('intervi-mix');

mix
  .setPublicPath(path.dist)
  .alias({
    app: path.src+'/app/'
  })
  .ts( 
    path.src+'/app/index.tsx', 
    path.dist + '/js/app.js' 
  )
  .react()
  .useInterviSvgLoader()
  .webpackConfig({
    devServer: {
      open: true
    }
  });