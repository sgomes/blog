---
title:  Bridging CSS and JS with Custom Properties
date:   2017-02-10 16:00:00 +0000
excerpt: >
  CSS Custom Properties have many interesting uses beyond serving as a simple storage and retrieval mechanism for CSS values. In this article, we will explore the best practices around using them as a bridge between CSS and JavaScript.
tags:
  - css
  - custom-properties
  - js
  - abstraction
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

CSS Custom Properties have many interesting uses beyond serving as a simple storage and retrieval mechanism for CSS values. In this article, we will explore the best practices around using them as a bridge between CSS and JavaScript.


## Keeping CSS and JavaScript isolated with CSS classes

Most of the time, you want to maintain a good level of isolation between CSS and JavaScript, in order to separate concerns and simplify the interaction between the two.

The simplest case of this, and one that’s a long-established best practice, is to use well-defined CSS classes, designed for interaction. The JS side of things then adds and removes them as needed in order to trigger event-driven visual changes:

```css
.button {
  position: relative;
  transform: scale(1);
}

.button.js-toggled {
  transform: scale(1.5);
}
```


```js
const button = document.querySelector('.button');
button.addEventListener('click', () => {
  button.classList.toggle('js-toggled');
});
```

This approach allows for the CSS to handle all of the presentation, while the JavaScript merely triggers the state changes. You could easily switch to a different visual representation of the changes (say, changing color) in plain CSS, without touching a line of JavaScript. Similarly, you could change the condition that triggers the state change purely in JavaScript, with no changes to your CSS files.

> **Note:** Consider using a convention for distinguishing plain CSS classes from CSS classes designed for JavaScript interaction. A `js-` prefix, as used above, is a good choice.


## Passing values between CSS and JavaScript

Adding and removing classes works great for boolean states, but sometimes you need more complex data passing. One example is if you’re reacting to user input (such as a click or touch) and need to take into account the input coordinates in order to display something.

Let’s say we have a container, and we want to represent the last location the user clicked inside of it. If we have an auxiliary element inside that container, we could move it around by doing:


```css
.container {
  position: relative;
}

.container > .auxElement {
  position: absolute;
}
```

```js
document.querySelector('.container').addEventListener('click', evt => {
  const aux = document.querySelector('.container > .auxElement');
  aux.style.transform = `translate(${evt.clientX}px, ${evt.clientY}px)`;
});
```

The above works, but there’s no abstraction between CSS and JavaScript. Not only are we aware of the auxiliary element in JavaScript (which, ideally, we shouldn’t have to be), but we’re even manipulating its properties directly.

Up until now, there wasn’t any great way to solve this, but with custom properties we can easily bring back the missing abstraction layer:

```css
.container {
  position: relative;
  --clickX: 0;
  --clickY: 0;
}

.container > .auxElement {
  position: absolute;
  transform: translate(var(--clickX, 0), var(--clickY, 0));
}
```

```js
const container = document.querySelector('.container');
container.addEventListener('click', evt => {
  container.style.setProperty('--clickX', `${evt.clientX}px`);
  container.style.setProperty('--clickY', `${evt.clientY}px`);
});
```

Now we’re back to handling all the presentation details in CSS, and we’re free to change the visual representation without making changes to the JavaScript. In fact, we could now even replace the auxiliary element for an `::after` block:

```css
.container {
  position: relative;
  --clickX: 0;
  --clickY: 0;
}

.container::after {
  position: absolute;
  transform: translate(var(--clickX, 0), var(--clickY, 0));
}
```

> **Tip:** Have you ever needed to change styles for a pseudo-element (such as `::after`) from JavaScript? Consider following the pattern above, and using a custom property on the parent as the connection between JavaScript and CSS. It’s an easy, maintainable solution!


## One variable, many changes

One event from the logic layer (JavaScript) doesn’t necessarily have to translate into a single change on the CSS side of things; it can have a whole range of effects. A great example of this is theming, where something like the main theme color can affect a large number of elements.

Let’s take the example of a music player app. If you wanted to make the user interface reflect the colors of the album art for the currently playing album without using custom properties, you’d need to maintain a list of elements affected by the color change, as well as which properties to update in each of them. You could do that either in JavaScript:

```js
const thingsToUpdate = new Map([
  ['playButton', 'background-color'],
  ['title': 'color'],
  ['progress': 'background-color']
])};

for (let [id, property] of thingsToUpdate) {
  document.getElementById(id).style.setProperty(property, newColor);
}
```

Or in HTML:

```html
<span class="title js-update-color">Song title</span>
<button class="play-button js-update-background">Play</button>
<div class="progress-track js-update-background"></div>
```

```js
const colorList = document.querySelectorAll('.js-update-color');
for (let el of colorList) {
  el.style.setProperty('color', newColor);
}

const backgroundList =
    document.querySelectorAll('.js-update-background');
for (let el of backgroundList) {
  el.style.setProperty('background-color', newColor);
}
```

Either way, this would make maintenance harder, as this parallel list of affected elements and properties would need to be kept up to date.

Yet another option would be to inject a new stylesheet onto the page, which would override the default colors. This approach is probably slightly better (albeit somewhat hacky), but it would still require overriding a number of styles and keeping some sort of template, which would also need maintenance:

```txt
.play-button {
  background-color: ${newColor} !important;
}
.title {
  color: ${newColor} !important;
}
.progress-track {
  background-color: ${newColor} !important;
}
```

With custom properties, this becomes much simpler; just determine the highest element in the tree that you want to modify, and let cascading do the rest:

```css
.player {
  --theme-color: red;
}

.play-button {
  background-color: var(--theme-color);
}
.title {
  color: var(--theme-color);
}
.progress-track {
  background-color: var(--theme-color);
}
```

```js
document.querySelector('.player').style.setProperty(
    '--theme-color', newColor);
```

This approach doesn’t require your script to have any awareness of which elements are affected, and doesn’t force you to maintain any sort of template for your changes. And as a bonus, it’s significantly simpler than any of the previous approaches!


## Why this is important

Limiting your interactions to CSS class names and custom properties allows you to define a strict interface between your JavaScript and your CSS.

This means that any runtime changes are restricted to a set of well-defined entities, which are designed for interaction. By doing this, you’ll reduce the scope for bugs and unexpected behavior, as well as make it easier to test styling and behavior separately.

Maintenance also becomes easier, since you’re able to modify and maintain styling and logic independent of each other, while sticking to the right tools for the job: CSS for styling and JS for logic.

Next week, we’ll take best practices even further and look at the benefits of designing modular and componentized CSS with custom properties. See you then!
