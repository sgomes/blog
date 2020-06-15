---
title:  Everything you never wanted to know about side effects
date:   2020-06-15 13:30:00 +0000
excerpt: >
  Side effects can have a large influence on bundle sizes with bundlers like `webpack`.
tags:
  - side-effects
  - bundling
  - tree-shaking
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

A lot of projects use `webpack` as their bundler, which can reduce the size of its output bundles by using tree-shaking (a type of dead code removal). However, tree-shaking can only work effectively if it knows about side effects in your code and in the packages you make use of. In this blog post I’ll explain what side effects are, why `webpack` needs to know about them, and what it does with this knowledge.

## What are side effects?

A side effect, in an ECMAScript module context, is code that performs some externally-visible behaviour (that is, behaviour which is visible outside the module) when the module is loaded.

Here is an example:

```js
import { registerThing } from 'thing-registry';
const store = registerThing( THING_KEY, { /* ... */ } );
```

`registerStore` is being called at the top level, which means that it will run as soon as the module first gets imported. These changes are visible externally, since things are being modified in an external store that lives in another module (`thing-registry`). Other examples of side effects include setting globals on `window`, or adding browser behaviour through polyfills.

However, if this were to happen inside of an `init` function that doesn’t get called on module load, then that would no longer be a side effect:

```js
import { registerThing } from 'thing-registry';

export function init() {
  const store = registerThing( THING_KEY, { /* ... */ } );
}

// `init` doesn't get called at the top level of the module,
// therefore importing the module doesn't cause side effects.
```

Declaring a variable or performing any modification at the top level that only affects the current module isn’t a side effect either, since it’s contained to the module:

```js
import list from './list';

// Not a side effect.
let localVariable = [];

// Not a side effect, either.
for ( const entry of list ) {
  localVariable.push( processListEntry( entry ) );
}
```

## The influence of side effects on bundling

Most modern bundlers implement tree-shaking, where unused code is removed from the final bundles, as it’s not necessary. This becomes important in libraries that offer a lot of different functionality, since consumers of that library may only be using a small portion of it and don’t want their bundles to be larger than necessary.

Packages and libraries should thus take steps to ensure they can indeed be correctly tree-shaken, especially when published to the world.

This brings us back to side effects. As we’ve seen, side effects are code that runs simply by virtue of importing a module, and has an external influence of some sort. This means that the code cannot be tree-shaken away; it needs to run, because it changes things outside of the module that may be needed elsewhere.

Unfortunately, side effects are hard to determine automatically, and some bundlers (like `webpack`) err on the side of caution, assuming that every module potentially has side effects. This becomes a problem for `index` modules which re-export things from other modules, as that effectively means everything in there must now be bundled together:

```js
// index.js

export { a, b } from './module1';
export { c, d, e } from './module2';
export { f } from './module3';

// Nothing can be tree-shaken away, because the bundler doesn't
// know if this or the re-exported modules have any side effects.
```

## Telling bundlers about side effects

Since bundlers can’t figure out side effects for themselves, we need to explicitly declare them. That’s done in a package’s `package.json`.

This means that declaring side effects is the responsibility of the package, and for packages that don’t do it, `webpack` will likely be unable to tree-shake anything away. Users of such a package may then end up pulling all of it into their build, even if they only use a small portion of the package, often with no easy way of getting around it. This is sadly the case for `diff`, `react‑dates`, and many other popular packages, at time of writing.

So how **do** you declare side effects? The best way of doing that depends on how much use you make of them and where they are in your code.

Very frequently your package won’t be using any side effects at all. In that situation, you can simply set `sideEffects` to `false`:

```json
{
  "name": "package",
  "sideEffects": false
}
```

If it has a few files with side effects, you can list them:

```json
{
  "name": "package",
  "sideEffects": [ "dist/store.js", "dist/polyfill.js" ]
}
```

This allows the bundler to assume that only the modules that were declared have side effects, and **nothing else does**. Of course, this means that we need to be careful to include everything that **does** have side effects, or problems can arise in applications that make use of the package.

`webpack` supports [a number of complex glob matching features](https://github.com/micromatch/micromatch#matching-features), so another approach you can take is to invert things, and declare which paths are side effect free, leaving `webpack` to assume that everything else might have side effects:

```json
{
  "name": "package",
  "sideEffects": [
    "!(dist/(components|utils)/**)"
  ]
}
```

The above example tells the bundler that it should assume that anything outside the `components` and `utils` directories contains side effects, and nothing in those directories does. This approach should guarantee that everything in `components` and `utils` can be tree-shaken without side effect concerns, and will only potentially cause problems if one of the files in there uses side effects.

## Missing side effects as a consumer

Let’s switch hats for a bit. You’re now the consumer, and you’re importing a package that uses side effects. You want to make use of them; in fact, you’re relying on those side effects to happen, or otherwise your code won’t work correctly.

You may come across some situations where the side effects go unexpectedly missing.

Here is an example:

```js
// index.js

import 'side-effectful-module';

export { a, b } from './impl';
```

```js
// impl.js

function a() {
  // Do something.
}

function b() {
  // Do something that depends on the side effect having run.
}
```

In `index.js` we see what’s often called a "naked import"; this syntax means we’re not using any of the module’s exports, and we’re effectively only interested in its side effects. Naked imports aren’t side effects themselves, but they’re a very strong signal that side effects are present in whatever it is you’re importing.

`index.js` doesn’t do much beyond importing `side-effectful-module`, simply re-exporting the functions in `impl.js`. The key thing here, and what may lead to an issue, is that the functions in `impl.js` actually depend on the side effect that `index.js` imported.

If tree-shaking is disabled, such as in development, this will all work correctly. However, if tree-shaking is turned on, the `index.js` module may be tree-shaken away, leaving just the actual functions from `impl.js`. If this happens, the side effect will be lost, and `b` will fail.

The same thing can also happen if the import is done on a child module:

```js
// index.js

import { unused } from './util';

function b() {
  // Do something that depends on the side effect having run.
}

// The module does not use `unused`.
```

```js
// util.js

import "side-effectful-module";

export function unused() {
  // Do something that depends on the side effect having run.
}
```

Since `unused` is not used in `index.js`, it will be tree-shaken away. This means that nothing from `impl.js` is needed any more, so none of it will be loaded. Once again we lose the side effect, even though it’s needed.

## Avoiding side effects being tree-shaken away

Since these side effects are essentially automatically-executed unnamed dependencies, we have to treat them as such. If a module has code that depends on a side effect having run, we need to be sure to import it there. The second example can easily be fixed with an extra import in `index.js`:

```js
// index.js

import "side-effectful-module";
import { unused } from './util';

function b() {
  // Do something that depends on the side effect having run.
}

// The module still does not use `unused`.
```

This will guarantee that `side-effectful-module` will run before any code in `index.js`, and won’t be tree-shaken away unless `index.js` also is.

Note that we’re now importing the side effect in both modules, but that’s ok! ES modules only run once, which means that their side effects will only run once as well, no matter how many files they’re imported in.

## Let’s sum that up

That ended up being a ton of info, so let’s try to summarise the practical advice:

- If your library doesn’t include side effects, set `sideEffects: false` in its `package.json`.
- If your library does include side effects, you can still enable as much tree-shaking as possible. List the files with side effects explicitly, or use inverse globs to list the paths that don’t have side effects.
- If you’re relying on side effects from an external module, be sure to import that module everywhere you make use of them.
