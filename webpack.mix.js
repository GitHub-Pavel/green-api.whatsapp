
const dotenv = require("dotenv");
const mix = require('laravel-mix');
const { path } = require('./package.json');

require('intervi-mix');
require('laravel-mix-definitions');


if (mix.inProduction()) {
  mix.define({
    'process.env': JSON.stringify(dotenv.config({ path: './config/.env.production'}).parsed)
  });
} else {
  mix.define({
    'process.env': JSON.stringify(dotenv.config({ path: './config/.env.development'}).parsed)
  });
}

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