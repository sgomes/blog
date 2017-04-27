---
title:  Material Money - a sample PWA
date:   2017-04-24 17:05:00 +0000
excerpt: >
  Over the past while, I’ve been working on a sample Progressive Web App with Mustafa. We learned a lot! This post is an overview of what I learned as a developer, and what I’d like to explore further.
tags:
  - pwa
  - release
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

Over the past while, I’ve been working on a sample Progressive Web App with [@Mustafa_x](https://twitter.com/Mustafa_x), designer extraordinaire and overall incredibly patient man (judging by how long he had to wait for me to finish coding it). Our goal was to make something from scratch, with a strong focus on UX. I took it as a chance to dive deep into a number of web development aspects and rewrite my code a number of times while doing so. Hence the wait. Sorry, Mustafa.

In any case, it’s now been released as [Material Money](https://material.money), and the source code is fully open and [available on GitHub](https://github.com/GoogleChrome/sample-currency-converter)!

{% set figure = { filename: 'composed.png', width: 650, height: 420, caption: 'Material Money on a phone' } %}
{% include 'includes/figure.html' %}

## Overview

So what went into making this PWA? Here are a few higlights:

- **Vanilla (no frameworks).** I wanted to see what it took to develop a nice-feeling application without using any frameworks or complex runtime libraries. As a single-page application, this was quite doable; it may be harder for larger applications, but I hope to explore that at some point.
- **Smooth.** The goal is for the app to always hit 60fps. Transitions are CSS-driven with JS orchestration, which works quite well, given that the app is not scripting-heavy, and the main thread is usually free. The app also uses [Material Components for the web](https://github.com/material-components/material-components-web) for the UI elements, that have themselves been built with performance in mind. Beyond that, there are a number of interesting tricks in there to speed things up, such as using proxy elements in animations.
- **All ES2015.** JavaScript is the *lingua franca* of the web, and I wanted to see how readable I could make my code with ES2015 alone. The code relies heavily on promises, fat arrow functions and string interpolation.
- **Hybrid pub-sub / model architecture.** I put together a [simple model](https://github.com/GoogleChrome/sample-currency-converter/blob/master/scripts/model.js) that I use as a publisher for changes in the application. These changes propagate to JavaScript listeners that are waiting for them, but also to DOM elements that have been hooked up to a particular model entry. It’s simple and definitely could use more work, but it did the job pretty well while avoiding the need for a full runtime templating system.
- **Lazy-loading for smaller initial payload.** The app inlines a reduced set of styles for rendering the home screen, and lazily loads the rest after that. The JavaScript for other views is also lazily loaded.
- **Custom build pipeline**, using [gulp](http://gulpjs.com/) and a number of great plugins. This allowed me to run [Babel](https://babeljs.io/) for transpilation (and minification, with [babili](https://github.com/babel/babili)), [rollup](https://rollupjs.org/) for module bundling, and [postcss](http://postcss.org/) for CSS custom property replacement and minification. More importantly, it allowed me to use all of these tools at exactly the right point in the pipeline, so that I could generate incremental targets for lazy-loading that are still fully processed, transpiled and minified.

## Browser support

Material Money should work well in any modern browser, as long as either IndexedDB or local storage are supported, and modern CSS features like flexbox and `calc()` are available and unprefixed. Edge, Firefox, Chrome and Safari should all work well.

## Lessons learned

I won’t lie: it was challenging making this app and keeping the focus on polish. Very often, the easy path on the web is not the best one, and there’s a significant amount more work involved in doing the right thing.

Here are a few examples, some of which I hope to expand into full blog posts:

- Animation on the web is not straightforward, even if all you’re trying to do is a simple CSS transition; many properties cause repaints on every frame of an animation, or even worse, layout passes, and depending on your DOM and how many pixels are changing, this may cause janking. In fact, pretty much only `opacity` and `transform` are guaranteed to produce performant animations across all browsers, without triggering repaints or causing layout recalculations, and even that isn’t the full story (check [CSS Triggers](https://csstriggers.com/) for details). Material Money achieves all of its animation effects with just `opacity` and `transform`, often with a healthy dose of sleight-of-hand.

- Service Workers are hard. If you’re trying to code your own without using a library like [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox), you’re going to run into pain points trying to debug all the possible code paths. [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) definitely make things easier, but asynchronous code is never straightforward, especially when triggering a particular code path potentially requires a lot of setup. Even then, if you’re not careful, it’s easy to fall into issues with breakage due to different resources being on different versions, loading things from browser cache when you expect a fresh copy from the network, or accidentally stopping users from getting updates due to a bad choice of caching headers. Do your homework, and be prepared for a steep learning curve.

- Hand-crafting your critical path CSS involves a far bit of work, but can be a really powerful way to split up an application and reduce how long it takes to get to that first render. If you’re using external CSS, such as a UI library, you might be able to remove a lot of code from your initial payload and in doing so get something on the user’s screen as quickly as possible. The rest you can just lazy-load as needed or when idle. Split your CSS into critical and non-critical, use `@import` to pull in the external code, and set up your build process to concatenate and minify both separately, later inlining the critical into your HTML.

## Next steps

I learned a lot with Material Money, and I’ll definitely be putting out some posts and articles going into the details of the problems I faced and how I chose to solve them. My choices aren’t necessarily the right ones for everyone, but having something that works as a reference may help you find your own path.

Other than that, I’d like to develop the model implementation a bit further while keeping it simple, as well as explore the intricacies of developing a larger-scale application, while keeping things vanilla, fast, and as polished as possible.

I’m sure there are bugs in there, and I’d love your help in finding and squashing them. Even so, I hope that it’s already enough to give you some ideas for your next app! [Happy source reading](https://github.com/GoogleChrome/sample-currency-converter), and [get in touch](https://github.com/GoogleChrome/sample-currency-converter/issues) if you have any questions!
