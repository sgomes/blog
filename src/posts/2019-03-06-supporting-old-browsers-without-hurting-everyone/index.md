---
title:  Supporting old browsers without hurting everyone
date:   2019-03-06 11:00:00 +0000
excerpt: >
  Supporting old browsers doesn’t necessarily mean sending loads of JS to everyone.
tags:
  - bundling
  - performance
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

Many of us work in JS-heavy projects that need to support old browsers which are no longer maintained. As new features are released into the web platform, both as new syntax and as new APIs, old browsers get further and further away from modern ones simply by standing still.

Of course, as developers, we want to be able to take advantage of the new features, instead of sticking to the lowest common denominator in our code. So we write modern code and rely on two sets of tools to convert it into that lowest common denominator: build-time syntax transformation (with tools such as [`Babel`](https://babeljs.io/)) and run-time libraries that patch over missing functionality ([polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) and [ponyfills](https://github.com/sindresorhus/ponyfill)).

## The cost of support

Neither of these come for free, however. Run-time libraries have an obvious cost in that they’re plain JS that needs to be sent over to the user so that their browser can do what it doesn’t natively support. Syntax transformations have a cost too, in that they often lead to more verbose code, and they often rely on features (such as [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)) that need to be implemented as run-time libraries.

Where run-time support is concerned, [`core-js`](https://www.npmjs.com/package/core-js) alone often accounts for over 30KB after minification and compression. That’s 30KB going over the wire, and 140KB being parsed, compiled, and partially executed by the end-user’s browser (which, in a mobile device with a slow CPU, can take a long time). Syntax transformations can add a non-trivial amount of bytes too, depending on the size of your codebase.

And importantly, much of this is often code that needs to run before any other JS, leading to an increased time-to-interactive and an overall worse experience.

For old browsers, this is unavoidable; they need to run that code, after all! But for modern browsers, that’s extra cruft that will never be needed. So how can we avoid sending it to those users?

## Multiple build targets

If this were less fundamental code, such as a polyfill for a particular web feature that you only use here and there, you might be able to get away with a dynamic-loading strategy where you make your code asynchronous and determine, at run-time, whether you need to load extra JS before running it.

That’s a good, fine-grained approach, but for the purposes of this article we’ll assume that it’s impractical to apply to your entire codebase, and go with a simpler (albeit blunter) solution: multiple build targets.

The idea is straightforward: instead of having a single version of your JS files that you send to everyone, you instead have a version that you send to modern browsers, and a different, fallback version that you send to everyone else.

**The approach I’m about to lay out isn’t new, nor is it necessarily the best one for your scenario.** However, it is relatively incremental and simple, and works with any other optimisations you’re already doing (such as code splitting). If nothing else, it may give you some ideas for your own approach!

As a bonus, it works with CSS too, if you’re doing [autoprefixing](https://www.npmjs.com/package/autoprefixer); dropping prefixes for old browsers will save some bytes as well.

Also, for the sake of conciseness, I’ll assume that you’re using `npm` scripts and `WebPack`, but this approach should still work with similar tools, with the right configuration.

## Step 1: set up your `browserslist`

Many of the tools commonly run in our build processes nowadays use [`browserslist`](https://www.npmjs.com/package/browserslist), a library that makes it easy to define a set of supported browsers and have everything configure itself in order to support them. You’ve probably added something like this to your `package.json`:

```json
{
  "browserslist": [
    "last 2 versions",
    "Safari >= 10",
    "iOS >= 10",
    "not ie <= 10",
    "> 1%"
  ]
}
```

One excellent feature of `browserslist` is that it actually supports multiple configurations, which it calls "environments". This means you could write:

```json
{
  "browserslist": {
    "defaults": [
      "last 2 versions",
      "Safari >= 10",
      "iOS >= 10",
      "not ie <= 10",
      "> 1%"
    ],
    "evergreen": [
      "last 2 Chrome versions",
      "last 2 ChromeAndroid versions",
      "last 2 Firefox versions",
      "last 2 FirefoxAndroid versions",
      "last 2 Safari versions",
      "last 2 iOS versions",
      "last 2 Edge versions",
      "last 2 Opera versions"
    ]
  }
}
```

You now have a definition of what each target means, which you’ll make use of later. `defaults` will get used by default, by the way, so making this particular change shouldn’t break anything in your application.

Do make sure that all of your build tools are using this configuration, however. You may find that you have different lists defined elsewhere, such as in your `.babelrc` or your `WebPack` config, which you will need to remove so that the tools fall back to what’s in your `package.json`.

For `Babel`, make sure that you’re using [the `env` preset](https://babeljs.io/docs/en/babel-preset-env) instead of an explicit set of transforms, otherwise it’ll ignore your `browserslist` configuration.

## Step 2: handle tools that don’t support `browserslist`

Unfortunately, not everything supports `browserslist`. One example of this is [`Terser`](https://www.npmjs.com/package/terser), a JS minifier that can handle the newer JS syntax.

For tools like this, you have two choices: either you swap them for a tool that does understand `browserslist`, or you write some custom code that provides a configuration based on `browserslist`.

An overly simplified but usable approach for `Terser` would be to modify your `WebPack` configuration like this:

```js
const browserslist = require( 'browserslist' );
const caniuse = require( 'caniuse-api' );
const TerserPlugin = require( 'terser-webpack-plugin' );

// We'll look at this in the next step.
const env = process.env.BROWSERSLIST_ENV || 'defaults';
const supportedBrowsers = browserslist( null, { env } );

function chooseTerserEcmaVersion( browsers ) {
  if ( ! caniuse.isSupported( 'arrow-functions', browsers ) ) {
    return 5;
  }
  if ( ! caniuse.isSupported( 'es6-class', browsers ) ) {
    return 5;
  }

  return 6;
}

const webpackConfig = {
  [...]

  minimizer: [
    new TerserPlugin( {
      terserOptions: {
        ecma: chooseTerserEcmaVersion( supportedBrowsers ),
        safari10: supportedBrowsers.some(
          browser => browser.includes( 'safari 10' ) ||
            browser.includes( 'ios_saf 10' ) ),
        // You can compute this too if you really have to.
        ie8: false,
      },
    } ),
  ],
};

module.exports = webpackConfig;
```

You’ll need a deep understanding of the tool and its configuration to make this work well, and you’ll probably need to revisit and update your code as new versions come out. The best long-term approach is really to file an issue with the tool requesting `browserslist` support, or to contribute that work yourself, if you’ve got the chance.

## Step 3: environment variables

The easiest way of choosing which `browserslist` environment to use is through the `BROWSERSLIST_ENV` environment variable. If you’re using npm scripts, it could end up looking something like this:

```json
{
  "scripts": {
    "build": "npm run build:fallback && npm run build:evergreen",
    "build:fallback": "BROWSERSLIST_ENV=defaults webpack",
    "build:evergreen": "BROWSERSLIST_ENV=evergreen webpack"
  }
}
```

You could even use something like [`concurrently`](https://www.npmjs.com/package/concurrently) to make them run in parallel, which could help with build times.

Handling things at the `npm` script level allows you to keep your `WebPack` configuration simple, with only some small changes to support both builds. And even if your `build` scripts are using other tools outside of `WebPack` as part of the process, they’ll still pick up the environment variable and adjust their output, as long as they support `browserslist`.

## Step 4: configure build paths in WebPack

Since the goal is to have multiple targets, we’ll need to make sure that they actually get output to different paths and don’t just end up rewriting each other.

This involves some tweaks to your `WebPack` configuration, e.g.:

```js
const env = process.env.BROWSERSLIST_ENV || 'defaults'
const extraPath = env === 'defaults' ? 'fallback' : env;

const webpackConfig = {
  [...]

  output: {
    path: path.join( __dirname, 'public', extraPath ),
    publicPath: `/${ extraPath }/`,
  },
};

module.exports = webpackConfig;
```

This reads the `BROWSERSLIST_ENV` environment variable to figure out which build it’s working on, and saves the build files to either `public/fallback` or `public/evergreen`, accordingly.

## Step 5: choose which build to serve

Now that we have two builds in place, we need to decide which one to provide to users when serving the page.

For `Node`-based environments, we can easily make use of `browserslist` here as well, through [`browserslist-useragent`](https://www.npmjs.com/package/browserslist-useragent). This library allows you to check whether a specific browser (as defined by its user agent string) is supported by your `browserslist` configuration.

We can therefore use it to see if the user’s browser is supported by the evergreen build, and serve that if so, falling back to the fallback one otherwise. This will of course be heavily dependent on your server-side code, but the basic gist of it is:

```js
import { matchesUA } from 'browserslist-useragent';

function getAssetPath( userAgentString ) {
  const options = {
    env: 'evergreen',
    // Try to get newer versions to match, too.
    ignorePatch: true,
    ignoreMinor: true,
    allowHigherVersions: true,
  };

  if ( matchesUA( userAgentString, options ) ) {
    return 'evergreen/';
  }

  return 'fallback/';
}
```

## Step 6: fix newer syntax bugs

Now that you can have an evergreen version you can run, you’re possibly going to find it comes with a few bugs. These are bugs that **were already present in your source code**, but never got a chance to actually run when that source was being transformed into older syntax.

One example of this is using an arrow function as a constructor:

```js
const Foo = () => {
  // Some code goes here.
};

const foo = new Foo();
// => Uncaught TypeError: Foo is not a constructor
```

This is an error, and comes up as such in the evergreen build. But in the fallback build, where arrow functions get transpiled into regular functions, that’s not a problem:

```js
// An approximation of what Babel outputs
var Foo = function Foo() {
  // Some code goes here.
};

var foo = new Foo();
// => No errors
```

Another category of issues you may run into comes from differences in scoping rules between `const` / `let` and `var`.

## Step 7 (optional): safeguards

We’re now serving the evergreen build to browsers that are part of a well-defined approved list, based on the user agent string that they provide. Everyone else gets the fallback build which, although slower, should work for all of the supported browsers.

That said, it is conceivable that an old browser would misreport its user agent string to impersonate a newer browser. Depending on how you want to handle that situation, you could add a safeguard to the evergreen version of your site which would do a quick litmus test to guarantee that evergreen functionality is indeed supported.

```html
<script nomodule>
  (function() {
    var url = window.location.href;
    if ( url.indexOf( 'forceFallback=1' ) === -1 ) {
      url += ( url.indexOf( '?' ) !== -1 ? '&' : '?' );
      url += 'forceFallback=1';
      window.location.href = url;
    }
  })();
</script>
```

This isn’t perfect, but it’s a quick check to see if the user’s browser supports native modules, since support for that is correlated with support for newer JS syntax. If the support is there, it won’t run. If the support isn’t there, it’ll run and redirect the user to the same page, with `forceFallback=1` appended as a URL parameter.

You’d then need to add support for this to the server-side, so that it would always return the fallback build when `forceFallback=1` is provided.

## Caveats

Do remember that you now have extra dependencies in the form of `browserslist` and `browserslist-useragent`, on the server-side. This means that you should build and deploy often, making sure to pick up new versions of these dependencies (perhaps using a service like [Renovate](https://renovatebot.com/) or [Greenkeeper](https://greenkeeper.io/)), so that they’re aware of new browser releases.

This is particularly important if you’re using rules in the form of `latest 2 firefox versions`, since the meaning of “latest” is based on what version of `browserslist` you’re using and what browser versions were out at the time. The call to `matchesUA` we added above has some safeguards for unknown new versions, but these safeguards are not guaranteed to work.

Still, even in this scenario, the failure mode is to serve up the fallback bundle instead of the evergreen one. That’s not ideal, but it is what would be happening anyway before you implemented multiple build targets!

Another important consideration is to make sure that you’re testing regularly, and doing so in multiple browsers. This is something you should try to do anyway, but it becomes particularly relevant when you’re providing different code to different users, and doubly so when one of those versions is unlikely to run in the developer’s browser. An automated set of end-to-end tests is an excellent practice that helps with this.

## Conclusions

At the end of this process, you should now have two builds, with minimal changes to your build process and application code.

Users of old browsers will still get slow, large builds — but they actually need to. Everyone who keeps their browser up-to-date will instead get a leaner, faster build that makes use of the functionality already built into their browsers.

This comes with some extra maintenance costs for you, as a developer. But it’s largely automatable, and until you can drop support for older browsers, that tradeoff may well be worth it. Users come first 🙂
