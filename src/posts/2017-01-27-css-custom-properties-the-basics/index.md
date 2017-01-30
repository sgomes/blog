---
title:  CSS Custom Properties - The Basics
date:   2017-01-27 15:00:00 +0000
excerpt: >
  So you’ve heard about CSS Custom Properties (also known as CSS Variables) and you might have an idea of what they are. You’re not quite clear on the specifics or browser support, you haven’t heard anything about best practices, and you don’t know how they’re better than variables in Sass or Less, though. Well, read on!
tags:
  - css
  - custom-properties
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

*This is the first in a series of blog posts on CSS Custom Properties. Here I introduce the basics of what they are and how to use them. Stay tuned for the next posts!*

So you’ve heard about [CSS Custom Properties](https://drafts.csswg.org/css-variables/) (also known as CSS Variables) and you might have an idea of what they are, perhaps from [the developers.google.com post](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care) when they landed in Chrome. You’re not quite clear on the specifics or browser support, you haven’t heard anything about best practices, and you don’t know how they’re better than variables in Sass or Less, though. Well, read on!

## Browser Support

First things first: where are CSS Custom Properties available? Browser support is actually pretty good as of writing: Chrome, Opera, Firefox and Safari ship with full support, and [Custom Properties are in development for Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/csscustompropertiesakacssvariables/). To keep up to date with browser support, see [Can I use CSS Variables (Custom Properties)](http://caniuse.com/#feat=css-variables)?

This means that CSS Custom Properties are definitely ready for use as a progressive enhancement right now, and pretty soon it will be possible to use them as a hard dependency. Be sure to check [the appendix at the end of the article](#appendix-filling-in-the-gaps-with-preprocessing) for information on preprocessors, too.

## Set a value, any value

So what are custom properties anyway? Simply put, a custom property is a CSS property that can be named and used by the developer. Unlike built-in properties like color or position, which have specific meanings for the browser, a custom property has no meaning beyond the one you decide for it. You set it exactly the same way you would a regular property:

```css
.foo {
  color: red;
  --theme-color: gray;
}
```

Browsers tell normal properties and custom ones apart by simply looking at the name: custom properties have a ‘`--`’ prefix. Custom properties are different, in that the browser engine doesn’t do anything with a new custom property you’ve set; while setting `color` changes the text color for elements matching that selector, setting `--theme-color` doesn’t have any immediate effect.

You can use CSS custom properties for storing any [valid CSS value](https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax):

```css
.foo {
  --theme-color: blue;
  --spacer-width: 8px;
  --favorite-number: 3;
  --greeting: "Hey, what's up?";
  --reusable-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.85);
}
```

## Use it and reuse it

Custom properties wouldn’t be of much use if you could only set values. At the very least, you need to be able to get those values back!

For that, we’ve got the `var()` function:

```css
.button {
  background-color: var(--theme-color);
}
```

Here, we’re setting the background color of button to the value of the `--theme-color` custom property. This may not seem like a huge improvement to hard-coding the value, but the benefits start to become clearer once you realize you can use that `--theme-color` across many selectors and properties:

```css
.button {
  background-color: var(--theme-color);
}

.title {
  color: var(--theme-color);
}

.image-grid > .image {
  border-color: var(--theme-color);
}
```

### Default values

What if `--theme-color` isn’t set anywhere? `var()` can take an optional second parameter, to use as the default:

```css
.button {
  background-color: var(--theme-color, gray);
}
```

> **Note:** If you want to fall back to another custom property, the correct syntax is
`background-color: var(--theme-color, var(--fallback-color))`;

In fact, it’s good practice to always set a default value, especially when building [web components](http://webcomponents.org/). And to make things as bulletproof as possible, you can even add fallback support for browsers that don’t understand custom properties:

```css
.button {
  background-color: gray;
  background-color: var(--theme-color, gray);
}
```

## Scoping and cascading

So where should you set the values, before using them? It turns out that custom properties follow standard scoping and cascading rules, so you already know exactly how things will work!

For something like `--theme-color`, for example, you might want to use the global scope, so that the value is available everywhere. The easiest way of doing this is using the [`:root` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root):

```css
:root {
  --theme-color: gray;
}
```

This makes the value available anywhere on the document, so all your buttons, titles and image grids can use it.

But what if you wanted different sections on your website to have different theme colors? Well, you do that the exact same way you would before; only now you’re setting a single custom property, rather than changing every property that makes use of it:

```css
section.about {
  --theme-color: darkblue;
}

section.contacts {
  --theme-color: darkred;
}

section.news {
  --theme-color: teal;
}
```

Oh, and of course, you can always add exceptions by making selectors as complex as you need:

```css
section.news > .sidenote {
  --theme-color: gray;
}
```

## CSS Math

You may be aware of the [`calc()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) in CSS, which is often used to combine different types of units:

```css
.child {
  width: calc(100% - 16px);
}
```

This calculation actually happens at runtime, on the browser, converting everything to a final pixel size to display, depending on how wide the parent currently is.

Well, `calc()` now has another trick up its sleeve: it can be used with custom properties too! In fact, that was an important consideration in the Custom Properties spec, because of how useful the combination can be:

```css
:root {
  --base-size: 4px;
}

.title {
  text-size: calc(5 * var(--base-size));
}

.body {
  text-size: calc(3 * var(--base-size));
}
```

You can even combine multiple unit types, as long as the final result makes sense:

```css
:root {
  --base-size: 4px;
  --title-multiplier: 5;
  --body-multiplier: 3;
}

.title {
  text-size: calc(var(--title-multiplier) * var(--base-size));
}

.body {
  text-size: calc(var(--body-multiplier) * var(--base-size));
}
```

## A bridge between CSS and JavaScript

One of the important things to consider when comparing to variables in preprocessors like Sass, Less or PostCSS, is that custom properties are actual entities in the browser. This means that they are dynamic things that you can modify at runtime, as opposed to a convenience feature for generating static output ahead of time.

You can access custom properties through the standard `getPropertyValue` and `setProperty` methods of [any element’s style property](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration):

```js
const styles = getComputedStyle(document.querySelector('.foo'));
// Read value. Be sure to trim to remove whitespace.
const oldColor = foo.style.getPropertyValue('--color').trim();
// Write value.
foo.style.setProperty('--color', 'green');
```

Changing the value of a custom property in this way will immediately affect any CSS property that depends on it, just as if you had changed that property directly. This means it’s a great way to easily apply script-driven changes across many elements.

We will cover this topic in further detail in a future article, where we also discuss best practices around this technique.

## Appendix: Filling in the Gaps With Preprocessing

If you’d like to get started using CSS Custom Properties right now, but need to support browsers that don’t have access to them, one way to fill in the gaps is to use a preprocessor such as [PostCSS](http://postcss.org/).

This will work for some of the more basic uses in organising and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-ing up your CSS, but bear in mind that it does not allow for making use of some of the more dynamic functionality, such as changing custom property values from JavaScript.

Here’s a quick overview of some of the functionality and whether or not it’s supported in a couple of popular preprocessor plugins:

<style>
#table1 td:nth-child(1) {
  text-align: left;
}

#table1 td:nth-child(2) {
  text-align: left;
  padding: 0;
  background: #f5f5f5;
}
</style>

<div class="overflow-x">
<table id="table1">
  <tr>
    <th>Functionality</th>
    <th>Code sample</th>
    <th>[`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties)</th>
    <th>[`postcss-css-variables`](https://github.com/MadLittleMods/postcss-css-variables)</th>
  </tr>

  <tr>
    <td>Definition in the `:root` scope</td>
    <td><pre>:root {
  --color: red;
}</pre>
    </td>
    <td colspan="2"><b>Yes.</b></td>
  </tr>

  <tr>
    <td>Definition in other scopes</td>
    <td><pre>body {
  --color: red;
}</pre>
    </td>
    <td><b>No.</b></td>
    <td><b>Yes.</b> [May result in incorrect behaviour](https://github.com/MadLittleMods/postcss-css-variables#caveats)</td>
  </tr>

  <tr>
    <td>Simple retrieval</td>
    <td><pre>.foo {
  color: var(--color);
}</pre>
    </td>
    <td colspan="2"><b>Yes.</b></td>
  </tr>

  <tr>
    <td>Retrieval with fallback value</td>
    <td><pre>.foo {
  color: var(--color, red);
}</pre>
    </td>
    <td colspan="2"><b>Yes.</b></td>
  </tr>

  <tr>
    <td>Definition inside at&#8209;rule</td>
    <td><pre>@media (min-size: 600px) {
  :root {
    --color: red;
  }
}</pre>
    </td>
    <td><b>No.</b></td>
    <td><b>Yes.</b> [May result in incorrect behaviour](https://github.com/MadLittleMods/postcss-css-variables/issues/30)</td>
  </tr>

  <tr>
    <td>Definition inside pseudo&#8209;selector</td>
    <td><pre>.foo:hover {
  --color: red;
}</pre>
    </td>
    <td><b>No.</b></td>
    <td><b>Yes.</b> [May result in incorrect behaviour](https://github.com/MadLittleMods/postcss-css-variables#caveats)</td>
  </tr>

  <tr>
    <td>Calculations</td>
    <td><pre>.foo {
  text-size: calc(2 *
    var(--size));
}</pre>
    </td>
    <td colspan="2"><b>Yes</b>, with [postcss-calc](https://github.com/postcss/postcss-calc).</td>
  </tr>

  <tr>
    <td>Changing a custom property value from Javascript</td>
    <td><pre>el.style.setProperty(
  '--color', 'red');</pre>
    </td>
    <td colspan="2"><b>No.</b> Impossible to achieve with preprocessors.</td>
  </tr>
</table>
</div>
