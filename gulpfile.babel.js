import { src, dest, series, parallel } from 'gulp';
import sass from 'gulp-sass';
import shell from 'gulp-shell';
import ghPages from 'gulp-gh-pages';
import nunjucksGulp from 'gulp-nunjucks';
import data from 'gulp-data';
import markdown from 'gulp-markdown';
import gap from 'gulp-append-prepend';
import cleanCSS from 'gulp-clean-css';

import path from 'path';
import fs from 'fs';
import gm from 'gm';
import moment from 'moment';
import nunjucks from 'nunjucks';
import fm from 'front-matter';
import through from 'through2';
import Highlights from 'highlights';
import { Feed } from 'feed';

const logo = 'src/assets/images/logo.svg';
const touchDir = './.dist/assets/images/touch';

const dateFormat = 'YYYY-MM-DD HH:mm Z';
const imageSizes = [16, 32, 144, 152, 192, 512];

let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['./src/', './.build/']))
    .addFilter('formatDate', (str, format) => moment(str, dateFormat).format(format));

let posts = [];

// Tasks

export function clean(cb) {
  shell.task(['rm -rf .build', 'rm -rf .dist', 'rm -rf .publish'])(cb);
}

function createTouchDir(cb) {
  shell.task([`mkdir -p ${touchDir}`])(cb);
}

export async function generateTouch() {
  const promises = imageSizes.map(size => new Promise((resolve, reject) => {
    gm(logo)
      .in('-size', 1024)
      .background('none')
      .resize(size, size)
      .write(`${touchDir}/${size}x${size}.png`, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
  }));

  await Promise.all(promises);
}

function compressTouch(cb) {
  shell.task(imageSizes.map(size =>
    `optipng ${touchDir}/${size}x${size}.png`
  ))(cb);
}

const createIcons = series(createTouchDir, generateTouch, compressTouch);

function scss() {
  return src('./src/sass/main.scss')
    .pipe(sass({includePaths: 'node_modules'}).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(dest('./.build'));
}

function copyRoot() {
  return src(['./src/*'], { nodir: true }).pipe(dest('./.dist'));
}

function copyAssets() {
  return src(['./src/assets/**/*'], { base: './src' }).pipe(dest('./.dist'));
}

function copyPostAssets() {
  return src(['./src/posts/**/*', '!./src/posts/**/*.md'], { base: './src' })
    .pipe(dest('./.dist'));
}

const copyStatic = parallel(copyRoot, copyAssets, copyPostAssets);

function buildPostData() {
  return src(['./src/posts/**/index.md'], { base: './src' })
    .pipe(through.obj((file, enc, cb) => {
      const content = fm(String(file.contents));
      const post = content.attributes;
      post.url = '/' + path.relative('./src', file.path);
      post.url = post.url.replace('index.md', '');
      posts.push(post);
      cb(null, file);
    }));
}

function buildAtomFeed(data) {
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

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${site.url}${post.url}`,
      link: `${site.url}${post.url}`,
      description: post.excerpt,
      author: [author],
      date: moment(post.date, dateFormat).toDate()
    });
  }

  return feed.atom1();
}

function buildFeed(cb) {
  const data = JSON.parse(fs.readFileSync('./src/site.json'));
  fs.writeFile('./.dist/feed.xml', buildAtomFeed(data), cb);
}

function buildThePosts({ production = false } = {}) {
  return src(['./src/posts/**/index.md'], { base: './src' })
    .pipe(data(file => JSON.parse(fs.readFileSync('./src/site.json'))))
    .pipe(data(() => ({ environment: production ? 'production' : 'development' })))
    .pipe(data(file => {
      const content = fm(String(file.contents));
      file.contents = Buffer.from(content.body);
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
    .pipe(nunjucksGulp.compile(null, { env: env }))
    .pipe(dest('./.dist'));
}

const buildPostsDev = series(copyPostAssets, function buildPosts() {
  return buildThePosts({ production: false });
});

const buildPostsProd = series(copyPostAssets, function buildPosts() {
  return buildThePosts({ production: true });
});

function buildThePages(production) {
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

  return src('./src/index.html', { base: './src' })
    .pipe(data(file => JSON.parse(fs.readFileSync('./src/site.json'))))
    .pipe(data(() => ({ environment: production ? 'production' : 'development' })))
    .pipe(data(() => ({ posts: posts })))
    .pipe(nunjucksGulp.compile(null, { env: env }))
    .pipe(dest('./.dist'));
}

function buildPagesDev() {
  return buildThePages({ production: false });
};

function buildPagesProd() {
  return buildThePages({ production: true });
};

const buildDocumentsDev = series(buildPostData, buildPostsDev, buildPagesDev, buildFeed);
const buildDocumentsProd = series(buildPostData, buildPostsProd, buildPagesProd, buildFeed);

export const buildDev = series(clean, scss, parallel(buildDocumentsDev, copyStatic, createIcons));
export const buildProd = series(clean, scss, parallel(buildDocumentsProd, copyStatic, createIcons));

function copyCname() {
  return src(['./CNAME']).pipe(dest('./.dist'));
}

function pushToGithub() {
  return src('./.dist/**/*', {base: './.dist'}).pipe(ghPages());
}

export const deploy = series(buildProd, copyCname, pushToGithub);
