const gulp = require('gulp');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const csso = require('gulp-csso');
const ghPages = require('gulp-gh-pages');

const logo = 'assets/images/logo.svg';
const touchDir = 'assets/images/touch';

gulp.task('clean', shell.task(['rm -rf _site', `rm -rf ${touchDir}`]));

gulp.task('create-touch-dir', shell.task([`mkdir -p ${touchDir}`]));

gulp.task('generate-touch', ['create-touch-dir'],
  shell.task([16, 32, 144, 152, 192].map(size =>
    `convert -background none -density 512 -resize ${size}x ${logo} ${touchDir}/${size}x${size}.png`
  ))
);

gulp.task('sass', ['generate-touch'], () => gulp.src('./_sass/main.scss')
  .pipe(sass({includePaths: 'node_modules'}).on('error', sass.logError))
  .pipe(csso())
  .pipe(gulp.dest('./_includes'))
);

gulp.task('build', ['sass']);

gulp.task('serve', ['build'], shell.task(['bundle exec jekyll serve']));

gulp.task('deploy', ['build'], () => {
  return gulp.src(['./**/*'])
    .pipe(ghPages());
});
