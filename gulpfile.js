const { src, dest, parallel, series, watch } = require ('gulp');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const newer         = require('gulp-newer');
const del           = require('del');


function browsersync() {
  browserSync.init({
    server: {baseDir: "app/"},
    notify: false,
    online: true
  })
}

function scripts() {
  return src([
    'node_modules/gsap/dist/gsap.js',
    'node_modules/gsap/dist/ScrollTrigger.js',
    'node_modules/jquery/dist/jquery.min.js',
    "node_modules/inputmask/dist/jquery.inputmask.min.js",
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/parallax-js/dist/parallax.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/app.js',
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js/'))
  .pipe(browserSync.stream())
}

function styles() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'app/scss/style.scss',


    "node_modules/slick-carousel/slick/slick.css",
  ])
  .pipe(sass({
    // outputStyle: "expanded"
    }))
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleancss(( {lvel: {1: {specailComents: 0} } } )))
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream())
}

function images() {
  return src('app/images/src/**/*')
  .pipe(newer('app/images/dest/'))
  .pipe(
    imagemin({
      progressive:true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 0 // 0 to 7
    })
  )
  .pipe(dest('app/images/dest/'))
}

function cleanimg() {
 return del('app/images/dest/**/*', {force: true})
}
function cleandist() {
  return del('dist/**/*', {force: true})
 }

function buildcopy() {
  return src([
    'app/css/**/*.min.css',
    'app/js/**/*.min.js',
    'app/images/dest/**/*',
    'app/fonts/**/*',
    'app/**/*.html',
  ], { base: 'app' })
  .pipe(dest('dist'));
}

function startwatch() {
  watch('app/scss/**/*.scss', styles);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/images/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;

exports.build = series(cleandist, styles, scripts, images, buildcopy);

exports.default = parallel(scripts, styles, browsersync, startwatch );