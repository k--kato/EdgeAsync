var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-html-minifier');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var js_edge_dir = [
    'src/js/edge/**/*.js'
];

var js_babel_dir = [
    'src/js/babel/**/*.js'
];

var css_dir = [
    'node_modules/bootstrap/dist/css/bootstrap.css'
  , 'src/css/style.css'
];

var html_dir = [
    'src/**/*.html'
];

var data_dir = [
    'src/data/**/*'
];

// ESLint Task
gulp.task('lint', function () {
    return gulp.src(js_dir)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// Concatenate & Minify JS
gulp.task('js-edge', function () {
    return gulp.src(js_edge_dir)
        .pipe(concat('all.edge.js'))
        .pipe(gulp.dest('dist/js'));
        //.pipe(rename('all.edge.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'));
});

// Babel & Concatenate
gulp.task('js-babel', function () {
    return gulp.src(js_babel_dir)
        .pipe(sourcemaps.init())
        .pipe(babel({ optional: ['runtime'] }))
        .pipe(concat('all.babel.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(sourcemaps.write('.'));
        //.pipe(rename('all.babel.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
    return gulp.src(css_dir)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss({processImport: false}))
        .pipe(gulp.dest('dist/css'));
});

// Minify HTML
gulp.task('html', function() {
    gulp.src(html_dir)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});


// Copy Data
gulp.task('data', function() {
    gulp.src(data_dir)
        .pipe(gulp.dest('dist/data'))
});

// Watch
gulp.task('watch', function(){
    gulp.watch(js_edge_dir, ['default']);
    gulp.watch(js_babel_dir, ['default']);
    gulp.watch(css_dir, ['default']);
    gulp.watch(html_dir, ['default']);
});

// Default Task
gulp.task('default', [/*'lint',*/ 'js-edge', 'js-babel', 'css', 'html', 'data']);
