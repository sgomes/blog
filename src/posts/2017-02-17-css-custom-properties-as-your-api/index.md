---
title:  CSS Custom Properties as your API
date:   2017-02-17 18:00:00 +0000
excerpt: >
  Now that you’re comfortable with custom properties and know how to use them to improve readability in your CSS, let’s look at how you can use them to enhance modularity and reusability in your code.
tags:
  - css
  - custom-properties
  - abstraction
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

Now that you’re [comfortable with custom properties](/posts/2017-01-27-css-custom-properties-the-basics) and [know how to use them to improve readability in your CSS](/posts/2017-02-03-more-readable-css-with-css-custom-properties), let’s look at how you can use them to enhance modularity and reusability in your code.

## Modular CSS: building a configurable grid

If you don't have access to the superb [CSS Grid](https://www.w3.org/TR/css-grid-1/), building a [flexbox](https://www.w3.org/TR/css-flexbox-1/)-based grid becomes a very interesting CSS exercise, that can turn out to be an extremely customizable and reusable module. Let’s look at a simple implementation:

```css
.grid {  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: calc(var(--margin) / 2);
}

.grid > .cell {
  display: block;
  width: calc(100% / var(--columns) - var(--margin));
  margin: calc(var(--margin) / 2);
}
```

How can we make this more modular? First, let’s namespace everything carefully. There are several methodologies you can follow, such as [BEM](http://getbem.com/) and [SMACSS](https://smacss.com/), but let’s keep things simple in this article and prefix every class and custom property with `my-`. Also, let’s add some defaults and comments for the custom properties.

```css
.my-grid {
  /* my-grid custom properties */
  /* Number of columns on the grid. */
  --my-grid-columns: 1;
  /* How much space to use on grid margins and inner gutters. */
  --my-grid-margin: 16px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* Fallback for browsers without custom properties. */
  padding: 8px;
  padding: calc(var(--my-grid-margin) / 2);
}

.my-grid > .my-grid-cell {
  display: block;
  /* Fallback for browsers without custom properties. */
  width: calc(100% - 8px);
  width: calc(100% / var(--my-grid-columns) - var(--my-grid-margin));
  /* Fallback for browsers without custom properties. */
  margin: 8px;
  margin: calc(var(--my-grid-margin) / 2);
}
```

`my-grid` is now an encapsulated, self-sufficient module. So what does it looks like to consume it?

```html
<link rel="stylesheet" href="my-grid.css">
```

That’s it! By importing the CSS you’re importing the defaults, and you can take advantage of the import order to override them with your own.

```html
<link rel="stylesheet" href="my-grid.css">
<style>
  .my-grid {
    --my-grid-columns: 2;
  }
</style>
```

Of course, you don’t need to redefine the defaults; you can always add more specific selectors instead, easily and intuitively defining multiple breakpoints that change the margins and number of columns at multiple screen sizes:

```css
.my-app .my-grid {
  --my-grid-columns: 1;
  --my-grid-margin: 8px;
}

@media (min-size: 600px) {
  .my-app .my-grid {
    --my-grid-columns: 3;
    --my-grid-margin: 16px;
  }
}

@media (min-size: 1024px) {
  .my-app .my-grid {
    --my-grid-columns: 6;
    --my-grid-margin: 16px;
  }
}
```

Note that all of this configuration is happening on the CSS side of things, without the need for predefined CSS classes to tweak the grid behavior. This means that the approach of generating a number of CSS classes that *might* be useful and shipping them on to developers is no longer necessary. Users also get more flexibility in what values to set things to; anything’s available, not just the ones you remembered to generate CSS classes for.

## Another example: aspect ratios

Let’s imagine you’re building a site (say, a personal blog where you talk about web stuff) and looking to set a `max-width` on any image, to ensure it doesn’t grow beyond the size of its container:

```css
.my-content {
  max-width: 600px;
}
```

If you want to avoid content shifting down as your image loads, you need to reserve enough space on your page for it. That’s done in your HTML, perhaps as part of your build pipeline:

```html
<img src="kitten.jpg" height="1024" width="768" alt="A cute kitten">
```

However, doing this with a `max-width` doesn’t work very well. The browser doesn’t take into account the image’s aspect ratio when resizing, and will apply the maximum width of 600px while maintaining a height of 768px, resulting in a sadly deformed kitten.

{% set figure = { filename: 'deformed-kitten.jpg', width: 610, height: 780, caption: 'A deformed kitten. Original photo by <a href="https://www.flickr.com/photos/lachlanrogers/">latch.r</a>.' } %}
{% include 'includes/figure.html' %}

So how do you preserve the aspect ratio? There’s a very popular CSS-only trick for maintaining the aspect ratio of a block, which makes use of some quirks in `padding`. Here’s how you would implement a 16:9 aspect ratio:

```css
.aspect-ratio-16-9 {
  position: relative;
}

.aspect-ratio-16-9::before {
  display: block;
  padding-top: 56.25%; /* 9 / 16 * 100% */
  content: "";
}

.aspect-ratio-16-9-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

You’d then apply it to your HTML like this:

```html
<div class="aspect-ratio-16-9">
  <div class="aspect-ratio-16-9-content">
    This box will have a 16:9 aspect ratio.
  </div>
</div>
```

This works great if you’ve got a few aspect ratios in your site (say, if you're building an image grid), but quickly becomes unmanageable if your images can have arbitrary aspect ratios.

So let’s make it a fixed aspect ratio image wrapper, with a custom property-based API!

```css
.my-image-wrapper {
  /* my-image-wrapper custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --my-image-wrapper-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --my-image-wrapper-h: 1;

  position: relative;
}

.my-image-wrapper::before {
  display: block;
  padding-top: calc(var(--my-image-wrapper-h, 1) /
      var(--my-image-wrapper-w, 1) * 100%);
  content: "";
}

.my-image-wrapper > img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
```

`--my-image-wrapper-w` and `--my-image-wrapper-h` are now your modular CSS API, and you can use your code for any image:

```html
<div class="my-content my-image-wrapper"
     style="width: 768px; --my-image-wrapper-w: 4; --my-image-wrapper-h: 3;">
  <img src="kitten.jpg" alt="A cute kitten">
</div>
```

And now the kitten is no longer deformed!

{% set figure = { filename: 'healthy-kitten.jpg', width: 614, height: 464, caption: 'A healthy, undeformed kitten. Original photo by <a href="https://www.flickr.com/photos/lachlanrogers/">latch.r</a>.' } %}
{% include 'includes/figure.html' %}

You could even make it part of your build pipeline and have it automatically applied to every image. Pretty neat!

## Web components

[Web components](https://www.webcomponents.org/) are an exciting new set of web technologies that allow you to develop true encapsulated and reusable components.

```html
<my-component></my-component>
That's it.
```

Whether or not your components are using [Shadow DOM](https://www.w3.org/TR/shadow-dom/), it’s useful to specify a set of properties that you support for customization. This allows you to clearly specify what’s configurable, without making developers dig into your component’s implementation, looking for which CSS selectors and properties to override.

Theming is the canonical example. If you don’t make the work up front of preparing custom properties that developers can use, they’re going to have to reverse engineer your component:

```css
/* Our tweaks to the my-component dependency */
my-component > .top-thing {
  background: red;
}

my-component > .big-text {
  color: red;
}

my-component > .big-text:hover {
  color: red !important; /* Fixes bug #42. */
}

my-component > .content > .column {
  width: calc(50% - 16px); /* 2 columns instead of 3 */
}
```

Be kind to your users (and yourself, months down the line). If there’s an aspect of your component that should be configurable, package it up nicely in a custom property:

```css
my-component {
  /* my-component custom properties */
  /* Theme color. Changing this will update colors
     throughout the entire component. */
  --my-component-theme-color: blue;
  /* Accent color. Changing this will update colors
     throughout the entire component. */
  --my-component-accent-color: red;
  /* How many columns to split the content into. */
  --my-component-columns: 3;
}
```

This way, your users no longer have to worry about a future update breaking their tweaks. And now their code can look like this instead:

```css
/* Our tweaks to the my-component dependency */
my-component {
  --my-component-theme-color: red;
  --my-component-columns: 2;
}
```

If you’re using Shadow DOM in your components, it becomes even more important to set up custom properties, as it’s harder to apply styles across the shadow boundary. Be sure to read Eric Bidelman’s excellent [Shadow DOM v1 primer](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom) for more details on this and other concerns.

## Your job, my job

Separating out concerns between a module (or web component) and its client code is important, because it allows developers that are using your code to know what’s safe to change, and what they are modifying at their own risk. Even if the developer using your code is yourself, several months down the line, it could be that things that are obvious now won’t even register then.

Establishing a set of well-defined custom properties makes your modules and components more reusable, makes client code less brittle, and even serves as built-in documentation for what your module or component can do.
