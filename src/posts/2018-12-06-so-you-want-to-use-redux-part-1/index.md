---
title:  So you want to use Redux (pt 1) — selectors
date:   2018-12-06 13:10:00 +0000
excerpt: >
  Redux is a clever and useful state management library, but using it comes with some performance gotchas. We'll start by looking at selectors.
tags:
  - redux
  - react
  - performance
  - memoization
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

Hey folks!

Today I'll be focusing on a specific library, Redux, and the performance implications of using it. If your project doesn't depend on it and you're not planning on changing that, you can probably skip this, even though the categories of problems introduced aren't necessarily exclusive to Redux. Otherwise, read on!

### Why Redux?

_My understanding of Redux is still limited, but I'll attempt a brief introduction throughout this post where I hope I won't make too many mistakes. If I do, please let me know on Twitter!_

Redux and its associated tooling ecosystem came about as a way of isolating state for your application into a big immutable state tree of nested objects, which can be manipulated with a fair amount of abstraction and isolation.

Through interfacing libraries such as `react-redux`, components in your application can loosely couple to this tree by registering as being able to modify it, receive updates from it, or both. State is thus centralized, instead of explicitly or implicitly living inside the various components of your application.

As a core principle, state is not mutated, but rather replaced with a new copy when changes take place. Old and new can thus easily be compared by looking at the references rather than with deep comparisons.

When writing to the tree, modifications are performed through a set of actions, that get transformed into state tree changes via reducer functions. Each action can affect multiple reducers and hence multiple parts of the tree. For example, accepting a friendship invitation would both remove the invitation from the pending list as well as add a new entry to the friends list.

When reading from the tree, you have selector functions (a well-known pattern outside of Redux, too), which offer a simple and convenient way of returning a part of the state tree, or a chunk of data derived from one or multiple parts of the state tree. Through `react-redux` or similar libraries, components specify which selectors they need, and get props with the values returned by these selectors every time they change.

If you want more details, the [Core Concepts page on the Redux documentation](https://redux.js.org/introduction/coreconcepts) is a good starting point.

It's a clever architecture, but it's not without its problems. Performance-wise, it comes with a number of ways you can accidentally shoot yourself in the foot.

### Selectors

In this post we're going to be focusing on selectors.

As I mentioned before, selectors return a part of the state tree for your component to consume (or, alternatively, something derived from one or more parts the state tree). In a React world, this is done via the `connect` method from `react-redux` and looks something like this:

```js
import { connect } from 'react-redux'
​
class MyComponent extends React.Component {
  [...]
}

const ConnectedMyComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
​
export default ConnectedMyComponent;
```

`connect` takes two methods and uses them to produce a function that will wrap your component in a higher-order component that is connected to Redux. Phew.

The first method that `connect` takes, `mapStateToProps`, is where you get to return an object composed from the various selectors you need:

```js
function mapStateToProps(state) {
  return {
    color: getDefaultColor(state),
    language: getUserLanguage(state),
  }
}
```

As a result, your component gets the `color` and `language` props from the selectors you specified, and will automatically get new values for these props whenever the values returned by the selectors change. These selectors are nothing magical, though; they're plain pure JavaScript functions that simply return a part of the state tree:

```js
function getDefaultColor(state) {
  return state.defaults.color;
}

function getUserLanguage(state) {
  return state.loggedInUser ?
    state.loggedInUser.settings.language :
    state.defaults.language;
}
```

So if these are just plain functions and you're not explicitly declaring any dependency on any part of the state tree, how does the framework know when to send new props to your component? Well, it's very simple: **it needs to run _every_ selector registered to _every connected component instance_ on _any change_ to _any part_ of the state tree**.

Or actually even worse, in the case of `react-redux`: **every time an action is dispatched, regardless of whether it produced any changes**.

Making sure that doesn't cause performance problems can quickly get tricky, as I'm sure you can imagine.

### Problem #1: slow selectors

Performance is usually not a problem at all when your selectors are just picking an existing part of the state tree and sending it along. As in the examples above, you get an object reference, you return that object reference, and you're done.

But sometimes selectors are more complex than this and need to do something more expensive, such as transforming the data for serialization.

Now you have a problem not just with any component that uses this selector, but also with your application in general. Remember, every selector runs every time as long as a component instance is using it, so you're going to get that hit every time anything changes in your state tree. And you're going to be getting it as many times as you have component instances hooked up to it.

The fix is usually to add memoization, so that you only incur the expense once, provided things haven't changed. Defining the meaning of "things haven't changed" and validating it can be difficult, though; more on that later.

### Problem #2: returning new references

Even if your selector is really fast at getting the data it needs, composing it together, and returning it, it may still be a source of inadvertent problems. Unless you've come across this problem before (or read the title of this section), you might not see anything wrong with this code:

```js
function getUserDefaults(state) {
  const userSettings = state.loggedInUser ?
    loggedInUserSettings :
    [];

  return {
    ...state.defaults,
    ...userSettings,
  }
}
```

This just overrides the default settings with the user settings where available and returns the whole thing, right? Yes, that's exactly what it does, and it is very fast at doing it if the list of settings is small.

But it returns a new instance of that object every time. This instance gets passed as a prop to your React component, which, unless you've taken special care, sees it as a change and triggers a render. So now every instance of every component that uses this selector is going to re-render every time anything changes in the state tree. That could be a problem.

The solution here is usually memoization too. Alternatives include moving the objects to state, so you can simply return the reference instead of computing it, or instead returning a primitive type (e.g. a string) where possible.

### Problem #3: returning new references

No, that's not a typo, the same problem can occur elsewhere. Remember that `mapStateToProps` function? This bug can happen there too.

It's common (albeit likely inadvisable) to have code that looks something like this:

```js
function mapStateToProps(state) {
  const someData = selector1(state);
  const otherData = selector2(state);
  const theDataINeed = combineDataSomehow(someData, otherData);
}
```

So now the onus is on `combineDataSomehow` to ensure that it doesn't generate a new reference every time. Here the impact of a mistake isn't quite as large, as it will only affect this particular component, but it will affect every instance of it.

The fix? You guessed it, memoization.

### So about that memoization

A quick disclaimer before going any further: the first thing with any performance-related fixes is **making sure you measure**. Sure, you could theoretically be causing problems by not memoizing something that runs on every dispatch, but it's best to assume otherwise until proven.

As Donald Knuth put it:

> **Premature optimization is the root of all evil (or at least most of it) in programming**
>
> Donald Knuth, Computer Programming as an Art (1974), among other sources

Optimization usually leads to more complex code, and more complex code often leads to bugs. With memoization, the risk is that the cache doesn't get invalidated as often as it should and ends up returning stale data.

But let's assume for a second that there is in fact a problem and you've traced it to a particular selector. Well, this doesn't seem like much of a problem at all. All you have to do is pull out [`memoize`](https://lodash.com/docs/4.17.11#memoize) from [`lodash`](https://lodash.com) and call it a day, right?

Maybe. But it's usually more complex than that. Let's go back to `getUserDefaults`. If you naively add memoization, what you get is the following:

```js
const getUserDefaults = memoize((state) => {
  const userSettings = state.loggedInUser ?
    loggedInUserSettings :
    [];

  return {
    ...state.defaults,
    ...userSettings,
  }
});
```

If you're following standard Redux rules and avoiding mutation, the `state` instance will be the same if nothing changes and will be different if something does. This means that if the state doesn't change, the memoized selector will return the same instance, solving the aforementioned problems. Great!

But is that really all we want? Right now if **anything** changes in the state, even if it's completely unrelated to what this selector cares about, you'll end up with a new instance and thus a new entry in the memoization cache. Besides making that grow to a potentially large size and keeping the previous states around for no good reason (since `memoize` uses a `Map`, not a `WeakMap`, by default), you're still only saving time if the state doesn't change very often, which is unlikely in a large interactive application.

If the goal is to have a large state tree with all aspects of the application's state in there, we need to be cleverer.

### A library for the library

Enter [`reselect`](https://github.com/reduxjs/reselect), [`rememo`](https://github.com/aduth/rememo), [`wp-calypso`'s `createSelector`](https://github.com/Automattic/wp-calypso/blob/master/client/lib/create-selector/index.js), and friends. These are libraries that are specifically designed to help you with the task of creating memoized Redux selectors that try to strike that error-prone balance between invalidating your memoization cache too much (leading to unnecessary recomputation), and invalidating it too little (leading to stale data being returned).

So now you can depend on just the parts of the state tree that your selector cares about. In the case of `rememo` or `wp-calypso`'s `createSelector`:

```js
const getUserDefaults = createSelector(
  (state) => {
    const userSettings = state.loggedInUser ?
      loggedInUserSettings :
      [];

    return {
      ...state.defaults,
      ...userSettings,
    }
  },
  (state) => [state.loggedInUser, state.defaults]
);
```

Now the selector is only invalidated if `state.loggedInUser` or `state.defaults` change. Even better, you could narrow it down to just the properties we care about inside those, but you would need to start adding some error checks.

### But things are always trickier with collections

For individual properties that you know exactly where to get, as in the examples above, things are straightforward. But very often you have arrays or other collections of objects and you have to find the item you want inside that structure.

Let's say a user has posts, and could have hundreds or thousands of them, but you want your selector to fetch a single one. Well, that's not a problem; since your selector is a plain JavaScript function, you can add a parameter. Ignoring error checking, this would look like:

```js
function getUserPost(state, postId) {
  return state.loggedInUser.posts[postId];
}

getUserPost(state, 12);
```

Great! But now how do we memoize this? We don't want to depend on every post, or otherwise every time any one of the posts changes your selector gets invalidated, even if it's for a different post:

```js
const getUserPost = createSelector(
  (state, postId) => {
    return state.loggedInUser.posts[postId];
  },
  (state) => [state.loggedInUser.posts]
);
```

Well, if you want to make this work correctly, you have to either use a library that supports parameters on the dependant function, or you have to write your own custom memoization. `wp-calypso`'s `createSelector` does support parameters on the dependant function:

```js
const getUserPost = createSelector(
  (state, postId) => {
    return state.loggedInUser.posts[postId];
  },
  (state, postId) => [state.loggedInUser.posts[postId]]
);
```

But even then, this might not be doing what you expect! The cache is not per-`postId`, but still global; it only tracks `postId` to make sure it doesn't change, but if it does it still invalidates it.

As long as you're always asking for the same `postId`, everything will work great and you'll get memoized results when the post doesn't change in the state. But if you're alternating between two different IDs, you're going to be invalidating the cache every single time:

```js
getUserPost(state, 10);
getUserPost(state, 20);
getUserPost(state, 10); // Not cached, last one was 20
getUserPost(state, 20); // Not cached, last one was 10
```

For this, you'd want to use something like [`wp-calypso`'s `treeSelect`](https://www.npmjs.com/package/@automattic/tree-select), which does keep track of the different branches in different caches. Or write your own error-prone custom memoization function that invalidates the cache every time it needs to, but only when it really needs to. Can't be that hard, right?

### Next steps

Alright, so once you understand all the intricacies of selectors, their potential performance implications, and how to memoize them if needed, you should be able to start writing nice and performant code for your Redux application. Great!

Only, not really... 😔 This is actually just the beginning. Redux still has a bunch of ways it can cause subtle and hard-to-find performance issues, and I'll be writing about them in one or more future articles.

In the meantime, let me know if I missed something on selectors, or if I got anything wrong here!

**And finally, huge thanks to Andrew Duthie and Jarda Snajdr for reviewing a draft of this post and suggesting some great changes!**
