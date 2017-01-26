const gulp = require('gulp');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const csso = require('gulp-csso');
const ghPages = require('gulp-gh-pages');
const nunjucksGulp = require('gulp-nunjucks');
const data = require('gulp-data');
const markdown = require('gulp-markdown');
const gap = require('gulp-append-prepend');

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const nunjucks = require('nunjucks');
const fm = require('front-matter');
const through = require('through2');
const highlights = require('highlights');

const logo = 'src/assets/images/logo.svg';
const touchDir = './.dist/assets/images/touch';

let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['./src/', './.build/']))
    .addFilter('formatDate', (str, format) => moment(str, "YYYY-MM-DD HH:mm Z").format(format));

let posts = [];

// Tasks

gulp.task('clean', shell.task(['rm -rf .build', 'rm -rf .dist']));

gulp.task('create-touch-dir', shell.task([`mkdir -p ${touchDir}`]));

gulp.task('generate-touch', ['create-touch-dir'],
  shell.task([16, 32, 144, 152, 192].map(size =>
    `convert -background none -density 512 -resize ${size}x ${logo} ${touchDir}/${size}x${size}.png`
  ))
);

gulp.task('sass', () => gulp.src('./src/sass/main.scss')
  .pipe(sass({includePaths: 'node_modules'}).on('error', sass.logError))
  .pipe(csso())
  .pipe(gulp.dest('./.build'))
);

gulp.task('copy-root', () => gulp.src(['./src/*'], { nodir: true })
  .pipe(gulp.dest('./.dist'))
);

gulp.task('copy-assets', () => gulp.src(['./src/assets/**/*'], { base: './src' })
  .pipe(gulp.dest('./.dist'))
);

gulp.task('copy-post-assets', () => gulp.src(['./src/posts/**/*', '!./src/posts/**/*.md'], { base: './src' })
  .pipe(gulp.dest('./.dist'))
);

gulp.task('build-post-data', () => gulp.src(['./src/posts/**/index.md'], { base: './src' })
  .pipe(through.obj((file, enc, cb) => {
    const content = fm(String(file.contents));
    const post = content.attributes;
    post.url = '/' + path.relative('./src', file.path);
    post.url = post.url.replace('index.md', '');
    posts.push(post);
    cb(null, file);
  }))
);

function buildPosts(production) {
  return gulp.src(['./src/posts/**/index.md'], { base: './src' })
    .pipe(data(file => JSON.parse(fs.readFileSync('./src/site.json'))))
    .pipe(data(() => ({ environment: production ? 'production' : 'development' })))
    .pipe(data(file => {
      const content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return { post: content.attributes };
    }))
    .pipe(nunjucksGulp.compile(null, {env: env}))
    .pipe(markdown({
      highlight: (code, lang) => {
        const highlighter = new highlights();
        let scopeName = null;

        switch(lang) {
          case 'html':
            scopeName = 'text.html.basic';
            break;
          case 'js':
            scopeName = 'source.js';
            break;
          case 'css':
            scopeName = 'source.css';
            break;
          case 'scss':
            scopeName = 'source.css.scss';
            break;
          default:
            scopeName = 'text.plain';
        }

        let highlighted = highlighter.highlightSync({
          fileContents: code,
          scopeName: scopeName
        });
        // HACK: remove <pre> block around the highlighted code.
        highlighted = highlighted.replace('<pre class="editor editor-colors">', '');
        highlighted = highlighted.substr(0, highlighted.length - 6);
        return highlighted;
      }
    }))
    .pipe(gap.prependText('{% extends "layouts/post.html" %}\n{% block postcontent %}\n'))
    .pipe(gap.appendText('\n{% endblock %}'))
    .pipe(nunjucksGulp.compile(null, {env: env}))
    .pipe(gulp.dest('./.dist'));
}
gulp.task('build-posts-dev', ['sass', 'copy-post-assets'], () => buildPosts(false));
gulp.task('build-posts-prod', ['sass', 'copy-post-assets'], () => buildPosts(true));

function buildPages(production) {
  return gulp.src('./src/index.html', { base: './src' })
    .pipe(data(file => JSON.parse(fs.readFileSync('./src/site.json'))))
    .pipe(data(() => ({ environment: production ? 'production' : 'development' })))
    .pipe(data(() => ({ posts: posts })))
    .pipe(nunjucksGulp.compile(null, {env: env}))
    .pipe(gulp.dest('./.dist'));
}
gulp.task('build-pages-dev', ['sass', 'build-post-data', 'copy-root'], () => buildPages(false));
gulp.task('build-pages-prod', ['sass', 'build-post-data', 'copy-root'], () => buildPages(true));

gulp.task('build-dev', ['build-pages-dev', 'build-posts-dev', 'copy-assets', 'copy-post-assets', 'generate-touch']);
gulp.task('build-prod', ['build-pages-prod', 'build-posts-prod', 'copy-assets', 'copy-post-assets', 'generate-touch']);

gulp.task('deploy', ['build-prod'], () => {
  return gulp.src('./.dist', {base: './.dist'})
    .pipe(ghPages());
});
