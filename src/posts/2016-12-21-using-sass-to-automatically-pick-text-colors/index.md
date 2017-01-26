---
title:  Using Sass to automatically pick text colors
date:   2016-12-21 16:51:00 +0000
excerpt: >
  Theming is always a challenge, particularly when you’re working on a library, rather than a standalone website. One example of an interesting issue that you’ll come across very frequently is choosing a text color that ensures readability and accessibility.
tags:
  - sass
  - theming
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

*Originally [posted on Medium](https://medium.com/dev-channel/using-sass-to-automatically-pick-text-colors-4ba7645d2796)*

Theming is always a challenge, particularly when you’re working on a library, rather than a standalone website. One example of an interesting issue that you’ll come across very frequently is choosing a text color that ensures readability and accessibility.

{% set figure = { filename: 'light-dark.png', width: 558, height: 146, alt: 'Dark text on light background and vice-versa' } %}
{% include 'includes/figure.html' %}

This is easy enough when you have known light or dark backgrounds; you can create two CSS classes and have users of your CSS library manually add them in depending on context.

Jekyll also offers powerful support for code snippets:

```css
dark-background-contrast {
  color: white;
}

light-background-contrast {
  color: black;
}
```

However, things become a bit trickier if you want to add the concept of a **theme color** to your library, and make it easy to use. This color will very often be used as a background, and will need sufficient contrast for the text that’s placed on top.

```css
theme-color-bg {
  background-color: #3f51b5;
}

theme-color-bg-contrast {
  color: white;
}
```

In the example above, `theme-color-bg-contrast` needs to change to a `black` text color if the user-defined theme color is light. While this is impossible to do in pure CSS (at least until the extremely useful [CSS Color Module 4](https://drafts.csswg.org/css-color/) is widely available), it can be done in Sass!

## Working out the Sass

Here’s what the initial Sass should look like:

```scss
$theme-color: #3f51b5 !default;

theme-color-bg {
  background-color: $theme-color;
}

theme-color-bg-contrast {
  color: choose-contrast-color($theme-color);
}
```

Users can override the `$theme-color`, and depending on what they pick, the `choose-contrast-color` function will return either `black` or `white`.

So how do we implement `choose-contrast-color`? It turns out that all of the necessary calculations and minimum contrast rules are well defined in the [WCAG 2.0 specification](https://www.w3.org/TR/WCAG20/). There’s a [whole section explaining visual contrast in detail](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html), several links to ISO and ANSI standards, and even [papers on the subject](https://www.w3.org/Graphics/Color/sRGB.html). Digging around for a while, I was able to find a [published W3C technique with a clear description of the algorithm](https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests):

{% set figure = { filename: 'algorithm.png', width: 1606, height: 1144, caption: 'The algorithm for calculating color contrast' } %}
{% include 'includes/figure.html' %}

If you’re familiar with Sass, you’ll quickly notice an issue: the luminance calculations involve exponentiation, which isn’t available in the language or the standard library.

One solution to this would be to use the extensive [Compass library](http://compass-style.org/), which not only includes exponentiation, but also the luminance operations we’re trying to implement. It requires Ruby, however, so it’s not an option for [node-sass](https://github.com/sass/node-sass) users. A pure Sass solution would be better.

## Using old tricks

I was reviewing my math and exploring the possibility of using Newtonian approximation for the fractional parts of the exponent, until I had a chat with [@wibblymat](https://twitter.com/wibblymat), who happened to be implementing an emulator at the time. He suggested a much simpler, old-school approach: using a lookup table!

The only part that involves exponentiation is the per-channel color space conversions done as part of the luminance calculation. In addition, there are only 256 possible values for each channel. This means that we can easily create a lookup table.

{% set figure = { filename: 'lookup.png', width: 370, height: 584, caption: 'An excerpt of the lookup table' } %}
{% include 'includes/figure.html' %}

You can take a look at [the full table](https://github.com/material-components/material-components-web/blob/master/packages/mdc-theme/_constants.scss) that I generated for the [MDC-Web project](https://github.com/material-components/material-components-web) to avoid having to generate your own.

With the channel values calculated, we can implement the rest of the algorithm easily:

```scss
/**
 * Calculate the luminance for a color.
 * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
@function luminance($color) {
  $red: nth($linear-channel-values, red($color) + 1);
  $green: nth($linear-channel-values, green($color) + 1);
  $blue: nth($linear-channel-values, blue($color) + 1);

  @return .2126 * $red + .7152 * $green + .0722 * $blue;
}

/**
 * Calculate the contrast ratio between two colors.
 * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
@function contrast($back, $front) {
  $backLum: luminance($back) + .05;
  $foreLum: luminance($front) + .05;

  @return max($backLum, $foreLum) / min($backLum, $foreLum);
}

/**
 * Determine whether to use dark or light text on top of given color.
 * Returns black for dark text and white for light text.
 */
@function choose-contrast-color($color) {
  $lightContrast: contrast($color, white);
  $darkContrast: contrast($color, black);

  @if ($lightContrast > $darkContrast) {
    @return white;
  }
  @else {
    @return black;
  }
}
```

That’s it! We now have contrast calculation in Sass, and we’re automatically picking black or white text, depending on which provides the most contrast. This can have a huge impact on readability, particularly for users with low vision.

This solution only requires an extra, pre-calculated constants file that will never change. It works with any Sass implementation, and it won’t bloat your CSS since it’s only used at build time. Pretty neat!

Next time, I want to look at how to do the same thing in JavaScript, at runtime, so you can have dynamic theming with CSS custom properties. See you then!

**Edit**: [here’s a Sassmeister live demo](http://www.sassmeister.com/gist/ccc72f71137fe29039c92c0a9fe9b657) of the technique above.
