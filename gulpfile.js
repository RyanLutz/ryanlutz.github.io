var gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    prefix = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files');


var config = {
  sassPath: './source/sass/',
  jadePath: './source/jade/',
  coffeePath: './source/coffee/',
  imgPath: './source/img/',
  bowerDir: './bower_components/'
};


gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});


gulp.task('bower-files', function() {
  return gulp.src(mainBowerFiles({
    dependencies: {
      "swiper": "~3.0.7",
      "jquery-knob": "~1.2.11",
      "tooltipster": "~3.3.0",
      "jquery-parallax": "~1.1.3"
    },
    debugging: 'true'
  }))
    .pipe(gulp.dest('./lib'));
});


gulp.task('icons', function() { 
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
    .pipe(gulp.dest('./public/fonts')); 
});


gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});


gulp.task('styles', function () {
  return sass(config.sassPath, {
    loadPath: [
      config.sassPath,
      config.bowerDir + 'fontawesome/scss',
      config.bowerDir + 'bourbon/app/assets/stylesheets',
      config.bowerDir + 'neat/app/assets/stylesheets'
    ],
    style: 'compressed'
  })
  .on('error', function (err) {
    console.error('Error', err.message);
  })
  .pipe(prefix('last 2 versions'))
  .pipe(gulp.dest('./public/css'));
});


gulp.task('templates', function() {

  gulp.src(config.jadePath + '*.jade')
    .pipe(plumber()) //run plumber before task(s)
    .pipe(jade({
      pretty: true,
      layout: false
    }))
    .pipe(gulp.dest('./public/'));
});


gulp.task('images', function(){
  gulp.src(config.imgPath + '**/*[.jpg,.jpeg,.png,.svg,.gif]')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/img'));
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['scripts'] );
  gulp.watch(config.jadePath + '**/*.jade', ['templates'] );
  gulp.watch(config.sassPath + '**/*[.sass, .scss]', ['styles'] );
});

gulp.task('default', ['bower', 'scripts', 'scripts', 'styles', 'templates', 'images', 'watch']);
