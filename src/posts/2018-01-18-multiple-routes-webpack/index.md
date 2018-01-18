---
title:  Multiple routes, bundling and lazy-loading with webpack
date:   2018-01-18 17:30:00 +0000
excerpt: >
  Splitting your JavaScript bundler per route sounds difficult, but webpack
  makes it pretty easy.
tags:
  - modules
  - javascript
  - bundling
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

## Looking at the problem

My coworkers and I are writing a client-side vanilla application that is split up into routes. Routes are a way of thinking about and organizing a site’s structure, and they’re usually tied to individual URLs. So in an online shop you might have different routes like home, category listing, product page, and checkout, all of which might have their own JavaScript. For example, a category listing might need code to handle filtering, whereas the checkout route will need code to validate form entries.

We’re not building a fully client-side application, however. A user might get to the site through different pages, such as typing the URL into their address bar and loading the main page, or finding an interesting product in a search engine and clicking through directly to that product’s description page. So each of these routes should have its own URL structure:

```
Home: /
Category listing: /category/42
Product page: /product/1234
Checkout: /checkout
```

In addition, we don’t really need all the JavaScript for every route when the site is first loaded. Ideally, we just want the JavaScript for the route that was loaded, and the rest can be lazily loaded as the user navigates through the site. But if you do naive bundling, you’re going to get a single massive file that would have to be fully loaded and parsed before anything happened:

```
dist/
  big-bundle.js
```

This is not ideal as it loads a lot of JavaScript that is not needed. On slow connections, this can mean that the user will have to wait a long time before the page becomes interactive. That is why big upfront bundles are an anti-pattern.

This is where the concept of entry points comes in. Instead of having a single conceptual “main” file that loads everything and boots up the entire application, we chose to have an entry point for each route, with the remaining routes being lazily loaded as needed. So what we’d end up with would be something along the lines of:

```
dist/
  bundle-home.js
  bundle-category.js
  bundle-product.js
  bundle-checkout.js
  home.js
  category.js
  product.js
  checkout.js
```

Only one of the bundle files would be loaded, depending on which route the user takes to get to the site. This file would then lazily load the other modules, as needed, without loading its own. So if the user were to come in through a product, they would load bundle-product.js, which would boot up the page and then would only fetch home.js, category.js and checkout.js if needed.

This solution loads all the necessary code for executing the user’s immediate request while only loading the rest if needed. And while it involves having the same code in multiple files, the user should really only download one version of each module as they navigate through the site.


## Webpack and modules

There’s a myth that webpack is hard to use and takes a ton of configuration to get anywhere. I haven’t been using it for long enough to know if that was ever the case, but it turns out that webpack is actually quite easy to use nowadays! If you’re familiar with ES modules, static imports and dynamic imports, you’re pretty much all set to build some complex apps with good loading practices and without much in the way of configuration.

Webpack understands the standardized syntax for ES modules, as well as static and dynamic module loading. It looks at your code and decides how to split things into bundles depending on what type of importing you’re doing. So, if you load a module statically, it’s going to get bundled in:

```js
import Foo from './foo.js';
Foo.doSomething();
```

The above results in a single `bundle.js` file (or whatever you chose to name it) with all the code.

If instead you load it dynamically, webpack will create a separate bundle and only fetch the extra code on demand:

```js
import('./foo.js').then(module => {
  module.doSomething();
});
```

The above results in a `bundle.js` file with some lazy-loading magic, and a `0.js` file with the code for Foo.

`0.js` is called a “chunk” in webpack terminology, designed to be lazily loaded by other webpack code, and not directly handled by your own code.


## Multiple entry points and routing

Alright, so it sounds like you’re all set! You can write standardized module code, which will work both natively in the browser (if your browser already has rolled out support), or through some bundling magic in webpack.

So let’s write some code and see what this actually looks like. I’ll circle back to the original example and use the routes for Home, Category, Product and Checkout, as well as a corresponding entry point for each one.

The modules are pretty simple. You can make them all have a single method with the same name, since the contents don’t really matter for the example:

```js
export function printMessage() {
  console.log('Hi! This is the Checkout module.');
}
```

Each entry point file would then load its respective module statically, and the others dynamically. In order to avoid tons of code duplication, you’ll need to come up with a simple, consistent interface for exposing everything else. Here’s an example one which I’m calling `Router`.

> **Note:** while it won’t be doing any actual routing, in the traditional sense, this is where the routing code would go if there were any, to be fair! So I still think it’s an OK name :)

```js
const _modules = {
  Home: import('./home.js'),
  Category: import('./category.js'),
  Product: import('./product.js'),
  Checkout: import('./checkout.js'),
};

export default class Router {
  static get modules() {
    return _modules;
  }
}
```

Each module is kept as an entry in the _modules object, with the value being the loading promise returned by `import()`. Note that this will start loading the other routes immediately, which you might not want, but in that case you could always delay the load with an explicit call that would trigger the actual import. For example:

```js
const _modules = {
  Home: () => import('./home.js'),
  Category: () => import('./category.js'),
  Product: () => import('./product.js'),
  Checkout: () => import('./checkout.js'),
};

export default class Router {
  static get modules() {
    return _modules;
  }
}
```

But if all four modules are being lazily loaded, how do you avoid duplicating the code in the entry point? Surely one of those needs to be null?

There’s actually no need! Both the browser (with native module support) and webpack do deduplication, where they keep track of which modules have been loaded so that they don’t get loaded twice. So you as a developer don’t need to worry about keeping track of any of it. This makes the entry point really clean and easy to understand:

```js
import * as Home from './home.js';
import Router from './router.js';

console.log('Hello from the Home entry point!');

// Here we go through the router to prove a point,
// but we could of course use Home directly too,
// e.g. `Home.printMessage()`.
Router.modules.Home().then(module => module.printMessage());
Router.modules.Category().then(module => module.printMessage());
Router.modules.Product().then(module => module.printMessage());
Router.modules.Checkout().then(module => module.printMessage());
```

Home is loaded statically, so that it’s immediately available and doesn’t require waiting for a lazy load. The router is loaded statically, too. Once you make a request to the router, it checks to see if that module is already loaded, either statically or dynamically at some point. If it has been loaded, the promise resolves immediately. If it hasn’t, it fetches the file, loads the code, and continues the promise chain after that.

This means that all modules can be used the exact same way, whether by the entry module or, if this were a real application with proper URL routing, by the router itself.


## So how do I get this to work in webpack?

As I mentioned before, all of this should work natively on the browser with no changes, if your browser supports ES modules and ES module loading. You won’t get the performance benefits of bundling without some further work, but the code is still functional.

That said, since most of us are still bundling, we need to find a way to get this to work with webpack. And it turns out it’s very simple! Here’s the `webpack.config.js` file:

```js
const path = require('path');

module.exports = {
  entry: {
    'bundle-home': './entry-home.js',
    'bundle-category': './entry-category.js',
    'bundle-product': './entry-product.js',
    'bundle-checkout': './entry-checkout.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  }
}
```

The key thing here is to make sure that all entry points are part of the same generation, so that you only generate one set of dynamically-loaded chunks. The output filename is based on the key for each entry point, thanks to the use of ‘`[name]`’, so the output looks like this:

```
dist/
  0.js
  1.js
  2.js
  3.js
  bundle-category.js
  bundle-checkout.js
  bundle-home.js
  bundle-product.js
```

The numeric files include a module each, wrapped in JSONP. The bundle files each have the code for that entry point, bundled together with the router code and some webpack methods that handle the lazy loading.

If you load `bundle-checkout.js` in a test page and look at Chrome Developer Tools, you can confirm that only three chunks get loaded, as expected. You can also see that the message from the Checkout module is coming from `bundle-checkout.js`, meaning that the Checkout module got bundled into that file.

{% set figure = { filename: 'devtools.png', width: 1330, height: 676, caption: 'DevTools shows correct deduplication' } %}
{% include 'includes/figure.html' %}


## Conclusions and caveats

Note that this example is pretty simple, and a real-world application would have further requirements and complexities, such as the need to use the [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) for more easily splitting out shared bits of code, or perhaps some potential complexities introduced by using NPM modules as dependencies. These would likely require some extra work on your webpack config.

That said, I felt this was an interesting problem and a decent enough solution to share, so I hope you find it useful and it at least serves as a starting point!

> Special thanks to Surma and Sam Dutton for reviewing this article, pointing out some issues, and helping me figure out a cleaner solution!
