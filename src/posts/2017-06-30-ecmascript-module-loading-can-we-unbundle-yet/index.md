---
title:  Browser module loading - can we stop bundling yet?
date:   2017-06-30 17:50:00 +0000
excerpt: >
  Browsers are now getting to a point where we can stop bundling JavaScript altogether. But should we?
tags:
  - modules
  - javascript
  - bundling
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

**TL;DR:** Not really. :-( Missing tooling and browser bugs aside, loading time can be up to 1.80x longer for large codebases.

If you want to jump straight to the benchmarks, go to the [Building a benchmark](#building-a-benchmark) or [Running tests sections](#running-tests).

If you want to grab the code and run some tests yourself, pop on over to the [GitHub repository for these tests](https://github.com/GoogleChrome/samples-module-loading-comparison).

If you’d like a bit more background on ECMAScript modules, HTTP/2 and other features that can be used to speed things up, keep reading!

## Modules: what are they?

ECMAScript modules have been a boon to the developer community; not only do they allow for organizing code better, but they also provide important features like deduplication and easier code sharing.

```js
// dependency.js
export function dependencyMethod() { ... }
```

```js
// app.js
import { dependencyMethod } from './dependency.js';
```

> **Note:** The browser is picky about the import syntax, particularly where it comes to the URL. All paths must be either absolute or relative, and relative paths must start with '`.`' or '`..`'

Up until now, we’ve been using bundlers like [rollup](https://rollupjs.org/) and [webpack](https://webpack.js.org/) to turn all of those modules into a single JavaScript file that the browser can run (or perhaps several of them, if we’re code-splitting). This is because up until recently browsers couldn’t handle the module loading themselves; but Safari (10.1, unflagged), Chrome M60 (behind a flag), Firefox 54 (behind a flag) and Edge 15 (behind a flag) now support it.

```html
<script type="module" src="app.js">
```

> **Note:** Scripts making use of modules need to be loaded with `type="module"`.

There are some potential benefits in not having to bundle things anymore: caching improves since we’re able to handle changes in a single module without invalidating everything; the file structure remains the same (or very similar) between development and production, simplifying debugging; and the build process could become simpler.

That said, can the performance of an unbundled website match that of a bundled one?

## Problems and their enabling technologies

### Establishing a connection is slow

One of the issues with loading many resources used to be establishing the connections themselves. This is usually a slow process, particularly on secure connections, which require extra handshaking.

HTTP/1.0 required a new connection to be established for every resource. In HTTP/1.1, the problem was reduced somewhat with keep-alive, which allows for a connection to be left open for a while and thus reused to retrieve multiple resources. That said, it’s not possible to have several resources being downloaded at the same time, so if you have a lot of things to deal with simultaneously you’re still likely to run into head-of-line blocking. When trying to fetch something else, the browser’s options are limited to either waiting for the current download to finish, or to open a new connection, and when you combine this with the limit of 6 concurrent connections (to the same origin) that most browsers implement, the gains aren’t great.

HTTP/2 (or h2) provides a much more comprehensive solution, by allowing for the connection to be shared by multiple resources, concurrently. This enables a single connection per origin, through which all content can be sent, regardless of how many resources are being retrieved. There are exceptions to this, particularly around credentialed and uncredentialed requests (which require separate connections), but that’s the gist of it.

### No up-front list of resources

ES modules come with an interesting additional problem, though: dependencies. While great in terms of developer ergonomics, they complicate things when serving; if module ‘`A`’ depends on module ‘`B`’, which in turn depends on module ‘`C`’ and so forth, we’ll actually have to wait for each of these modules to be loaded before we know what to load next.

We may want to create a list of all the modules we know we’ll need up front, and start downloading them all in one go, while the browser parses and executes each one as it arrives. And we actually have several solutions for this!

#### HTTP/2 push

HTTP/2 has the ability to push resources; this is sort of like the server saying “Oh, you want this thing? Then you’ll want these as well.”, and pushing them onto the request.

While this gives you a great way of speeding things up, it also means you should be very careful when using push. If the items being pushed end up not being needed, they effectively just waste bandwidth. This may even cause bytes to go down the wire for an item which the browser already has in its HTTP cache, depending on how the browser chooses to handle those pushes (for details, check [my colleague Jake Archibald’s excellent writeup on HTTP/2 push](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)).

#### Preload

Another option is to add a `<link rel="preload">` to the HTML. This instructs the browser to start retrieving the resource, without actually doing anything with it just yet. You’d then use it normally further down in the page:

```html
<head>
  <link rel="preload" href="/app.js" as="script">
  <link rel="preload" href="/dependency.js" as="script">
</head>
<body>
  <script type="module" src="app.js"></script>
</body>
```

Note that a preload retrieves the item and places it in the cache so that it’s available when needed, even if it’s not explicitly in the DOM. In the above example, `dependency.js` can still get the benefits of a quick load from cache even though it’s only loaded as a dependency by `app.js`.

Preloads can also be done as an additional HTTP header that gets attached to the response, instead of being part of the HTML.

```
Link: </app.js>; rel=preload; as=script, </dependency.js>; rel=preload; as=script
```

Note that the browser still initiates the retrieval itself, just as with the `<link>` option. HTTP/2 push is the only one that’s cheeky enough to attach bytes that weren’t requested to the response it sends.

Sadly, preload is still somewhat lacking in browser support, with Firefox, Edge, and Safari iOS missing it entirely.

## Building a benchmark

So in theory this should all work really well, and we should be able to just unbundle everything and run it in production (assuming users have the browser support). In practice, though, is that really the case? Time for some testing!

If we want a reasonable test case, we need a large ES2015 codebase built with modules that we can turn into a simple web page to analyse performance. Since it would be somewhat out of scope to build an entire website for this blog post, I decided to convert some existing large codebases instead: [moment.js](https://momentjs.com/) and [three.js](https://threejs.org/).

I wrote a build tool that does the following:
- Takes a Javascript file entry point and builds a list of all its dependencies, even inside Node packages. This is implemented as a rollup plugin.
- Rewrites all of the imports to use relative paths that the browser accepts. This is implemented as a babel plugin.
- Generates 3 bundles.
  * Unbundled: outputs all of the unbundled code to a `dist/.../unbundled` folder.
  * Bundled, optimized: creates a bundle using [rollup](https://rollupjs.org/), into a `dist/.../bundled-optimized` folder.
  * Bundled, unoptimized: creates a bundle using [webpack](https://webpack.js.org/) with tree-shaking disabled, into a `dist/.../bundled-unoptimized` folder. I would have used rollup here too, but the ‘`treeshake: false`’ option seems to be buggy at the moment.
- Minifies all three builds with [babili](https://github.com/babel/babili).
- Creates a JSON file with the list of dependencies, for serving purposes.

The tests are built with no consideration for the [PRPL pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) or critical rendering best practices. This is meant to be a simple test of how well browsers can cope with loading a large number of imports in one go, and assuming the entirety of these libraries as defined in their entry points are needed. Proper loading practices wouldn’t invalidate the total load time, but could produce a much quicker first render, allow for partial functionality while waiting, and overall reduce the perceived time to the user.

For the server side of things, I built a simple server using [node-spdy](https://github.com/spdy-http2/node-spdy), which is able to serve over a number of protocols. The server loads every file into memory on start, to provide a fair benchmark, and through command line flags can serve over HTTP/1.1 or HTTP/2, perform HTTP/2 push, and rewrite the HTML to do `<link rel="preload">`. It serves content with gzip compression enabled on every resource.

The code is all available on the [GitHub repository for these tests](https://github.com/GoogleChrome/samples-module-loading-comparison).

## Running tests

### Browser support

And we very quickly run into problems. Chrome and Firefox have issues, with Chrome throwing an error and Firefox crashing whenever we try to load the unbundled pages, regardless of any other variable.

{% set figure = { filename: 'chrome.png', width: 1116, height: 166, caption: 'Runtime error in Chrome' } %}
{% include 'includes/figure.html' %}

{% set figure = { filename: 'firefox.png', width: 1194, height: 364, caption: 'Tab crash in Firefox' } %}
{% include 'includes/figure.html' %}

> *Note (2017–07–19):* The Chrome bug has since been fixed.

Bugs have been filed for both [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=732765) and [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1372258). This is not totally unexpected, since these are experimental features that are still being worked on, but it does mean that we can’t run our benchmark on them just yet.

As for Edge, I ran into issues testing with module loading enabled, due to my particular test setup and the fact that I didn’t immediately have access to a physical Windows machine running Windows 10 Preview.

I hope to revisit things at some point, but in the meantime I decided to move forward with Safari, since it’s shipped a stable implementation of module loading.

### Test methodology

While Safari 10.1 does have support for module loading, preload support was only added later. To keep things consistent, I decided to run all tests on Safari Technology Preview Release 32 on macOS Sierra 10.12.5, which does support both module loading and preload.

I’m presenting the mean load time as reported by the Safari developer tools summary bar while on the Network tab, over 5 runs, with caching disabled, and manually clearing the cache between runs (Develop → Empty Caches). Test results greater than 1 second are presented in seconds with 2 decimal places, and test results smaller than 1 second are presented as integer millisecond values, since these are the exact output formats we get back from Safari developer tools.

For reasons I haven’t been able to fully identify, loads are sometimes faster if they happen in quick succession, even with caching disabled. Perhaps the browser is reusing a connection and skipping the handshaking, even though it’s a complete refresh? I therefore left an interval of at least 10 seconds between runs to achieve the longer, and hopefully more representative result.

I’m also including the number and total size of all resources, as presented by Safari developer tools. Since this is the uncompressed size but gzip compression is enabled on the server, I also include the gzipped size measured in the proxy as the total size of the responses. This is slightly larger than the “transferred” size reported by Chrome developer tools in a quick comparison, but is hopefully still representative.

On the networking side of things, we need to simulate real-world conditions by adding some latency and throttling the bandwidth. Since Safari does not support this through its developer tools, I set up a local SOCKS proxy with throttling functionality. I used the speed settings from the [webpagetest.org](http://webpagetest.org/) “Mobile 3G - Slow” profile: 780kbps downstream, 330kbps upstream and 200ms round trip latency.


### HTTP/1.1

First things first: let’s start with the worst case of HTTP/1.1 over TLS, with no preload. This is where we expect things to go very poorly for unbundling, and sure enough, they do:

*moment.js*

| Build | Resources | Size (ungzipped) | Size (gzipped) | Time |
| -- | -- | -- | -- | -- |
| Bundled, optimized | 2 | 49.7KB | 18.34KB | 1.13s |
| Bundled, unoptimized | 2 | 62.1KB | 21.18KB | 1.17s |
| Unbundled | 105 | 86.0KB | 81.31KB | 5.92s |


*three.js*

| Build | Resources | Size (ungzipped) | Size (gzipped) | Time |
| -- | -- | -- | -- | -- |
| Bundled, optimized | 2 | 468.2KB | 120.89KB | 2.61s |
| Bundled, unoptimized | 2 | 517.3KB | 132.71KB | 2.77s |
| Unbundled | 334 | 588.5KB | 328.47KB | 16.53s |


Unbundled performance is terrible, as expected, with an unbundled three.js taking around 6x as long to load.

Looking at the file sizes, we notice that the unbundled size is significantly larger than even the unoptimized bundle. This is likely due to the fact that there are gains to be made from minifying a single large file, rather than many small ones, since there will be less reuse in the latter case. Compression only compounds the problem further, since there are also gains from gzipping a single large file, rather than many small files individually.

If we enable preload for the unbundled version, we don’t expect things to change much. Let’s take a look:

*moment.js*

| Build | Resources | Size (ungzipped) | Size (gzipped) | Time |
| -- | -- | -- | -- | -- |
| Bundled, optimized | 2 | 49.7KB | 18.34KB | 1.12s |
| Bundled, unoptimized | 2 | 62.1KB | 21.19KB | 1.17s |
| Unbundled | 105 | 99.8KB | 82.06KB | 4.91s |

*three.js*

| Build | Resources | Size (ungzipped) | Size (gzipped) | Time |
| -- | -- | -- | -- | -- |
| Bundled, optimized | 2 | 468.2KB | 120.89KB | 2.58s |
| Bundled, unoptimized | 2 | 517.3KB | 132.71KB | 2.76s |
| Unbundled | 334 | 636.1KB | 330.78KB | 15.79s |


The bundled versions are unchanged, and therefore produce approximate results on this test run. The unbundled versions produce a modest improvement: loading is 1.21x as fast in moment, and 1.05x in three.js.

Note the somewhat larger total size on the unbundled versions, compared to before. This is because of the all of the extra markup we needed to add to the HTML, in the form of `<link rel="preload">` tags. It compresses quite well, though, because of all the repetition, so it doesn’t have much impact in the end.

Let’s switch to HTTP/2 and see what happens.


### HTTP/2 without push or preload

> **Note:** I traded the size and resources columns for a speedup column, for easier comparison with the HTTP/1.1 results. Sizes and resources should remain the same anyway.

*moment.js*

| Build | Time | Speedup vs HTTP/1.1 w/o preload |
| -- | -- | -- |
| Bundled, optimized | 667ms | 1.69x |
| Bundled, unoptimized | 707ms | 1.65x |
| Unbundled | 2.00s | 2.96x |

*three.js*

| Build | Time | Speedup vs HTTP/1.1 w/o preload |
| -- | -- | -- |
| Bundled, optimized | 2.12s | 1.23x |
| Bundled, unoptimized | 2.29s | 1.21x |
| Unbundled | 4.71s | 3.51x |

Results are a good improvement over HTTP/1.1, even for the bundled versions, loading at between 1.21x and 1.69x as fast. The unbundled versions make considerable gains, running between 2.96x and 3.51x as fast.

We’re not dealing with the dependency issue in the unbundled versions yet, though; the browser still has to load each individual JS file to in order to know what to load next, which is a particular problem in our testing environment (and a lot of real-world networks) due to the 200ms spent on every round trip.


### HTTP/2 with push

Let’s try pushing all the JS dependencies with the JS entry point (`app.js`) and see what that gets us.

> **Note:** we’re not using push in the bundled builds, since the entry point JS is the full JS, and so there is nothing else to push. We could be saving a round trip and pushing the JS as part of the HTML request, but we’d run into issues with credentialed vs uncredentialed requests. The details are out of scope here, but once again my colleague Jake Archibald has a [good writeup on this and other issues with h2 push](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/).

*moment.js*

| Build | Time | Speedup vs HTTP/1.1 w/o preload | Speedup vs HTTP/2 w/o push |
| -- | -- | -- | -- |
| Bundled, optimized | 671ms | 1.68x | — |
| Bundled, unoptimized | 711ms | 1.65x | — |
| Unbundled | 1.44s | 4.11x | 1.39x |

*three.js*

| Build | Time | Speedup vs HTTP/1.1 w/o preload | Speedup vs HTTP/2 w/o push |
| -- | -- | -- | -- |
| Bundled, optimized | 2.13s | 1.23x | — |
| Bundled, unoptimized | 2.31s | 1.20x | — |
| Unbundled | FAIL! | — | — |


Statistical variation aside, the results for the bundled versions should be the same as for HTTP/2 without push, since we haven’t changed anything.

As for the unbundled versions, things get interesting. Again we see a significant improvement, with moment loading 1.39x as fast with push than without. However, with three.js, we get an error!

{% set figure = { filename: 'safari-push-error.png', width: 934, height: 142, caption: 'Protocol error in Safari' } %}
{% include 'includes/figure.html' %}

It isn’t clear on the message, but the failing resource is ‘`app.js`’, the entry point to which we attach all the pushes. Safari doesn’t give us a lot of information on what exactly went wrong, but “protocol error” seems to indicate that it gives up above a certain number of pushes or some other metric.

Note that this is not just Technical Preview instability; Safari 10.1.1 (stable) produces the same error.

In any case, the message is clear: don’t push too much in one request, or Safari might kill it.


### HTTP/2 with preload

Preload should work a lot better combined with HTTP/2, and hopefully won’t be a problem for Safari like push was.

> **Note:** once again, no preloading is being done in the bundled versions. Results should be the same, statistical variation aside.

*moment.js*

| Build | Time | Speedup vs HTTP/1.1 with preload | Speedup vs HTTP/2 w/o preload |
| -- | -- | -- | -- |
| Bundled, optimized | 676ms | 1.66x | — |
| Bundled, unoptimized | 710ms | 1.65x | — |
| Unbundled | 1.21s | 4.06x | 1.79x |


*three.js*

| Build | Time | Speedup vs HTTP/1.1 with preload | Speedup vs HTTP/2 w/o preload |
| -- | -- | -- | -- |
| Bundled, optimized | 2.13s | 1.12x | — |
| Bundled, unoptimized | 2.30s | 1.20x | — |
| Unbundled | 4.13s | 3.82x | 1.14x |


First of all, it looks like we managed to run three.js this time around! Hooray! The preload gains are quite modest when compared to HTTP/2 without preload, though.

The moment.js test case paints a more interesting story: it looks like preload (1.21s) is actually faster than push (1.44s). The reasons behind this may have to do with the fact that with preload the browser is still in control, whereas with push it’s the server that chooses what to send, and when. This means that with preload the browser has more opportunity to get what it needs first, rather than passively wait until it’s delivered.

The speedup vs HTTP/2 without preload is much larger in the case of moment.js. I suspect this may have to do with the module structure for both projects; you might get different gains depending on how deep or wide your dependency tree is.


## Conclusions

The first conclusion is somewhat obvious: make sure you have HTTP/2 support on your site! That is the single largest improvement you can make, whether you’re bundling resources or not.

The second one is also straightforward: be careful with HTTP/2 push. It’s not at easy as it looks, and beyond affecting performance it can actually break your site. If you really want to use HTTP/2 push, you may want to look into stream priorities as well (which I didn’t, in my code), and have them follow your module dependency tree; it will make the static analysis even more complex, but it may provide some benefits in matching what the browser expects.

But here’s where we go back to the question we started this post with: can we unbundle yet? Well, let’s take a look at the numbers for our best-case scenario, HTTP/2 with preload:

| Test case | Bundled, optimized | Bundled, unoptimized | Unbundled |
| -- | -- | -- | -- |
| moment.js | 676ms | 710ms | 1.21s |
| three.js | 2.13s | 2.30s | 4.13s |

Even if we assume that the unoptimized bundle is the fairest comparison, we’re still looking at taking 1.70x (moment) or 1.80x (three) as long to load.

It will be hard to find gains elsewhere to compensate for this loss. These are all static dependencies, so it would be difficult to organize the code so that we could load things at different points in time. And even if we could do that, it would mean we could apply the same technique to the bundled version, by splitting it into the corresponding smaller bundles.

Beyond this, there is the immediate issue of tooling, in that our optimal solution requires up-front knowledge of what files need to be loaded. Plugins would need to be written, to create this dependency tree and inject preload lists into the HTML or the HTTP headers. But tooling is something that the Web community is very comfortable with, so this would be a temporary hurdle, at worst.

The bugs make the approach difficult to recommend for now, though, even as progressive enhancement. In two of the three tested browsers, these pages fail to work correctly. And since the browser has no way of knowing that it will crash or error out, the browser will use the unbundled version even if you add a bundled fallback. And sure, these are artificial stress test cases, so you’d have some chance of avoiding the bugs in a real site, but they're still there, waiting for the right conditions.

But ultimately, there isn’t much to gain from unbundling at the moment, anyway:

- Performance-wise, any effort that you’re planning to make your site less monolithic can go into bundles too; there are some very good tools that allow you to do code-splitting and route-based chunking nowadays, so that you end up with several smaller bundles, rather than a single massive one.

- Developer ergonomics-wise, deploying an unbundled version is more work, not less: you’re still going to need a bundled version, for compatibility, and you’ll need to create and inject the preload/push list for the unbundled one.


## Next steps

Once Chrome and Firefox have fixed the outstanding issues, I’d like to revisit this benchmark and analyse how much variability there is between browsers. As for Edge, I’m hoping to get a test setup for running this benchmark sometime soon — although it could be a case of finding out that there are bugs there too.

> *Note (2017–07–19):* The Chrome bug has since been fixed.
