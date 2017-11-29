---
title:  More Readable CSS with CSS Custom Properties
date:   2017-02-03 16:00:00 +0000
excerpt: >
  Now that you know how CSS Custom Properties work, you can start thinking about using them to improve readability in your CSS and making future maintenance easier.
tags:
  - css
  - custom-properties
  - readability
  - DRY
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

Now that you know [how CSS Custom Properties work](/posts/2017-01-27-css-custom-properties-the-basics), you can start thinking about using them to improve readability in your CSS and making future maintenance easier.

> **Note**: For brevity, I will omit fallbacks in `var()` lookups in this article, but remember you should always make your lookups as solid as possible by following the pattern:
> ```css
.foo {
  /* For browsers that don't understand custom props */
  color: black;
  /* `black` used as fallback if `--color` undefined */
  color: var(--color, black);
}
```

## Keeping it DRY

[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) stands for “Don’t Repeat Yourself”, which is a good goal because it saves you not just the typing, but also all of the finding, replacing and debugging whenever you eventually want to change things. Simply put, it reduces maintenance costs for your code.

Let’s do a case study. Here is some bad CSS, with lots of repetition:

```css
.button {
  background-color: gray;
}

.title {
  color: gray;
}

.image-grid > .image {
  border-color: gray;
}

.caption {
  /* Should always be gray, regardless of theme. */
  color: gray;
}
```

If you wanted to change the theme color, you’d have to do so in the first three selectors, and be careful not to change the caption text color too.

So how can CSS Custom Properties help? Just set the value once and use it many times! Let’s create a `--theme-color` custom property:

```css
:root {
  --theme-color: gray;
}

.button {
  background-color: var(--theme-color);
}

.title {
  color: var(--theme-color);
}

.image-grid > .image {
  border-color: var(--theme-color);
}

.caption {
  color: gray;
}
```

By setting the theme color in a custom property, it means you can make the change in a single place, and all of the values will update. Not only that, you’ve added semantics to your CSS: whereas before it was ambiguous whether a particular instance of gray was something that was supposed to change with the theme color, we’ve now made that explicit.

In fact, we could probably create a custom property for the caption text too:

```css
:root {
  --theme-color: gray;
  --caption-text-color: gray;
}

.button {
  background-color: var(--theme-color);
}

.title {
  color: var(--theme-color);
}

.image-grid > .image {
  border-color: var(--theme-color);
}

.caption {
  color: var(--caption-text-color);
}
```

But we’re just getting started!

## Put down the calculator

As you already know if you read the [introduction to CSS Custom Properties](/posts/2017-01-27-css-custom-properties-the-basics), you can use custom properties together with `calc()` to perform runtime calculations on the browser.

With that in mind, consider the following example of a grid:

{% set figure = { filename: 'grid.png', width: 1058, height: 306, alt: 'A grid with three cells' } %}
{% include 'includes/figure.html' %}

```css
.image-grid {
  padding: 8px;
}

.image-grid > .image {
  margin: 8px;
}
```

If you’ve seen this pattern before, or you know the CSS box model well, you can probably determine that this produces a layout with a 16px-wide edge and 16px-wide gutters between grid cells. That’s not immediately clear from the CSS, though, and we’re not really emphasizing the aspects we care about the most.

From a design point of view, what’s actually important here is the 16px of spacing we get around the edge and between cells. We want to adjust things taking into account the final result, not the intermediate calculations; these calculations are not meaningful by themselves, and having to set them separately is a maintenance cost.

With custom properties and `calc()`, we can make things clearer:

```css
:root {
  --image-grid-spacing: 16px;
}

.image-grid {
  padding: calc(var(--image-grid-spacing) / 2);
}

.image-grid > .image {
  margin: calc(var(--image-grid-spacing) / 2);
}
```

This way, we’re working with the meaningful concepts behind the calculations, rather than the results of those calculations, and we’re making it easier to change things in the future.

In fact, you could extend this idea to the entire layout of your site, by making things align to a page grid:

```css
:root {
  --page-grid: 4px;
  --image-grid-spacing: calc(4 * var(--page-grid));
}

.title {
  font-size: calc(5 * var(--page-grid));
}

.paragraph {
  margin: calc(4 * var(--page-grid));
}

.image-grid {
  padding: calc(var(--image-grid-spacing) / 2);
}

.image-grid > .image {
  margin: calc(var(--image-grid-spacing) / 2);
}
```

In the example above, we’re doing intermediate calculations to make things even clearer.

> **Note**: Safari / WebKit [currently has some issues with this type of intermediate calculations](https://bugs.webkit.org/show_bug.cgi?id=161002). This has been fixed in Safari Technology Preview, however, so there's a good chance it will be fixed in the next release, Safari 10.1.


## Readable changes

So far, we’ve focused on values you set once in your document and reuse everywhere, without a lot of expected changes. But custom properties come in even handier when there are values you *do* want to change, in particular circumstances.

Let’s look at an example. Here’s a simple grid layout, built using flexbox:

```css
.image-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}

.image-grid > .image {
  margin: 8px;
  width: calc(100% - 16px);
}

@media (min-size: 600px) {
  /* 3 images per line */
  .image-grid > .image {
    width: calc(100% / 3 - 16px);
  }
}

@media (min-size: 1024px) {
  /* 6 images per line */
  .image-grid > .image {
    width: calc(100% / 6 - 16px);
  }
}
```

It’s not immediately clear what’s happening here, so let’s go over it. The default, for small screens, is a grid with a single column. As the screen gets larger, we allow for 3 columns, and then 6 columns. As in the example in the previous section, we still have 16px spacing on the edges and between cells.

Because of the complexity of the calculations, we needed to add some comments to make things readable. If we were using custom properties, however:

```css
:root {
  --grid-spacing: 16px;
  --grid-columns: 1;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  padding: calc(var(--grid-spacing) / 2);
}

.image-grid > .image {
  margin: calc(var(--grid-spacing) / 2);
  width: calc(100% / var(--grid-columns) -
      var(--grid-spacing));
}

@media (min-size: 600px) {
  :root {
    --grid-columns: 3;
  }
}

@media (min-size: 1024px) {
  :root {
    --grid-columns: 6;
  }
}
```

Now all of the calculations are done in a single place, and the only thing that’s left to change in each media query is the custom property value. This is much clearer and readable no matter how familiar you are with the code. And as an added bonus, by doing things this way, you don’t run the risk of typing the calculation incorrectly in a new media query, and getting unexpected results!

> **Note**: the excerpt above might be too advanced for CSS preprocessors. Please bear that in mind if you’re using one and getting unexpected results!

Now that you know how to make your CSS a bit more readable and maintainable, we will be taking a look at how [even the JavaScript side of things can benefit from custom properties](/posts/2017-02-10-bridging-css-and-js-with-custom-properties).
