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
const Highlights = require('highlights');
const Feed = require('feed');

const logo = 'src/assets/images/logo.svg';
const touchDir = './.dist/assets/images/touch';

const dateFormat = 'YYYY-MM-DD HH:mm Z';

let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['./src/', './.build/']))
    .addFilter('formatDate', (str, format) => moment(str, dateFormat).format(format));

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

function buildFeed() {
  const data = JSON.parse(fs.readFileSync('./src/site.json'));
  const site = data.site;

  const author = {
    name: site.author,
    email: site.email,
    link: site.url
  };

  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: site.url,
    link: site.url,
    image: `${site.url}/logo.svg`,
    author: author
  });

  for (post of posts) {
    feed.addItem({
      title: post.title,
      id: `${site.url}${post.url}`,
      link: `${site.url}${post.url}`,
      description: post.excerpt,
      author: [author],
      date: moment(post.date, dateFormat).toDate()
    });
  }

  return feed.render('atom-1.0');
}
gulp.task('build-feed', ['build-post-data'], cb => {
  fs.writeFile('./.dist/feed.xml', buildFeed(), cb);
});

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
        const highlighter = new Highlights();
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
  posts.sort((a,b) => {
    const dateA = moment(a.date, dateFormat).toDate();
    const dateB = moment(b.date, dateFormat).toDate();

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    }

    return 0;
  });

  return gulp.src('./src/index.html', { base: './src' })
    .pipe(data(file => JSON.parse(fs.readFileSync('./src/site.json'))))
    .pipe(data(() => ({ environment: production ? 'production' : 'development' })))
    .pipe(data(() => ({ posts: posts })))
    .pipe(nunjucksGulp.compile(null, {env: env}))
    .pipe(gulp.dest('./.dist'));
}
gulp.task('build-pages-dev', ['sass', 'build-post-data', 'copy-root'], () => buildPages(false));
gulp.task('build-pages-prod', ['sass', 'build-post-data', 'copy-root'], () => buildPages(true));

gulp.task('build-dev',
    ['build-pages-dev', 'build-posts-dev', 'build-feed', 'copy-assets', 'copy-post-assets', 'generate-touch']);
gulp.task('build-prod',
    ['build-pages-prod', 'build-posts-prod', 'build-feed', 'copy-assets', 'copy-post-assets', 'generate-touch']);

gulp.task('copy-cname', () => gulp.src(['./CNAME'])
  .pipe(gulp.dest('./.dist'))
);

gulp.task('deploy', ['build-prod', 'copy-cname'], () => {
  return gulp.src('./.dist/**/*', {base: './.dist'})
    .pipe(ghPages());
});
