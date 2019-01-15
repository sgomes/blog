---
title:  So you want to use Redux (pt 2) — reducers and scale
date:   2019-01-15 11:45:00 +0000
excerpt: >
  After looking at potential performance issues with selectors in Redux and React apps, this time we'll look at reducers and scaling issues.
tags:
  - redux
  - react
  - performance
  - memoization
license: >
  This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
---

[Last time](https://sgom.es/posts/2018-12-06-so-you-want-to-use-redux-part-1/) we looked at an overview of how Redux and its interface with React work, and we explored various performance issues that you can encounter when writing Redux selectors.

Today, we’ll be looking at reducers, as well as the problems you can run into as you hit a certain scale in terms of the number of components connected to Redux and their usage of it.

## Reducers

Whereas selectors retrieve a part of the state tree to be used somewhere, reducers modify a part of the state tree in response to an action.

Writing reducers typically involves fewer performance concerns than selectors, since they tend to do actual work less often. A reducer usually looks for just a few actions to act upon, and will just return the previous state otherwise:

```js
export function settings( state = {}, action ) {
  switch ( action.type ) {
    case UPDATE_SETTINGS:
      // Do something.
      // ...
      return newState;
  }

  // Some other action
  return state;
}
```

This means that only a handful of reducers will do meaningful work on any given action, which usually causes no performance issues. In some cases, you'll still run into them, however.

### Problem #1: slow reducers

This is the obvious one. If you have a slow reducer for an action that happens frequently, you may run into trouble.

It’s hard to offer any kind of useful advice for this scenario, since the solution will be very specific to what you’re trying to do. It will usually involve a combination of making the reducer function faster after some careful profiling, and making it run less frequently.

One good piece of advice (thanks, Jarda Snajdr!) is to make sure that your reducer is as close as it can be to a no-op if it's not interested in an action; return as early as possible, avoiding any kind of work altogether, even if it's just allocating an object or array. The same applies to middleware functions.

Also make sure that your reducer isn’t doing anything unexpected, such as dispatching extra actions. Reducers should be pure functions, without any side-effects.

### Problem #2: returning new references

Oh yes, you can run into this problem in reducers too.

Going back a bit, the purpose of a reducer is to perform a change in the state tree when needed. Selectors then access the state tree and retrieve the updated state.

[As we saw last time](https://sgom.es/posts/2018-12-06-so-you-want-to-use-redux-part-1/#problem-2-returning-new-references), if these selectors return a different reference every time, they’ll likely cause unnecessary work by making the connected components update when they’re really just getting the same values. So we use memoization in selectors to prevent that from happening: the same inputs will generate the same output.

But what if the reference changes in the state tree itself? Then the input is no longer the same, and the memoization in the selector won’t help.

Let’s look at an example. Say you have an action that gets called when you retrieve data from an API. This call gets made periodically and is used to update some sort of running display. Here’s a naive reducer:

```js
export function stats( state = {}, action ) {
  switch( action.type ) {
    case STATS_API_RECEIVE:
      return action.data; // An array of data points.
  }

  return state;
}
```

This may look fine at first glance, since it’s easy to miss that every API response will be a new reference, even if the data being returned is the same. This is not what we want, though; the state will always change whenever the action is received, even if the data is the same, and so the selectors will return a new reference too, even if they’re using memoization.

In this case, if we want to make sure that the state only changes when the data does, we’ll need to perform a deep comparison:

```js
// Deep comparison helper.
import { isEqual } from 'lodash';

export function stats( state = {}, action ) {
  switch( action.type ) {
    case STATS_API_RECEIVE:
      return isEqual( state, action.data ) ?
        state :
        action.data;
  }

  return state;
}
```

The tradeoff there becomes reducer speed versus rendering speed; since we’re now doing a deep comparison in the reducer, it’ll be slower, but it’ll save time in unnecessary re-rendering of the same data.

This is usually a win, but the only way to be sure, as with anything to do with performance, is to measure!

## Problems with scale

Beyond the more specific performance problems with selectors and reducers that we’ve discussed, your Redux application can run into other categories of performance issues as it hits a certain size.

Scaling is an interesting topic in React + Redux apps. The combination works best at some scale, when you have many individual components connected to the store, when you’ve taken care to memoize selectors where needed, and when you’ve ensured your reducers are fast. But if your application grows beyond a certain state tree size and usage, you may still run into issues due to the sheer amount of work that can go on inside of this architecture.

Imagine you’re developing a large interactive application with hundreds or thousands of component instances connected to the Redux store. This application receives keyboard input and creates an action for every keystroke. You notice that text input gets really sluggish and that there’s a ton of Redux work going on whenever you type. What can you do to fix things?

### Solution #1: make changes less often

Part of the problem is that you’re updating the state tree on every keystroke. Is that really necessary? Typically only the element you’re typing into needs to know about changes immediately (so it can display them), with the rest of the application being happy waiting a while before being notified.

This is a good use-case for some debouncing. Debouncing is a technique where you don’t run a function immediately, but rather you wait for a given period of time to see if another invocation comes along. If it does, you reset the counter and wait again; if it doesn’t, then at the end of the wait you actually call the function with the last values received.

In our earlier scenario, we can make sure that the component that receives the input updates its visual state immediately, but uses some debouncing before dispatching a change action.

```js
// Debouncing helper.
import { debounce } from 'lodash';

const WAIT_TIME = 1000;

class TextField extends Component {
  // ...

  debouncedStoreUpdate = debounce(
    ( value ) => this.props.dispatchTextFieldUpdate( value ),
    WAIT_TIME
  );

  handleChange( event ) {
    const newValue = event.target.value;

    // Render component immediately with changes
    this.setState( { value: newValue } );
    // but only update data store after a while.
    debouncedStoreUpdate( newValue );
  }

  // ...
}
```

This greatly reduces the number of updates to the data store while the user is typing quickly; the application will now effectively wait for a 1 second pause in the user’s typing before it triggers the data store update and all the associated work.

### Solution #2: multiple stores

Sometimes, even if you’ve memoized everything that requires memoization, the sheer number of selectors that need to run is so large that even in their memoized state they collectively take too long. This scenario is easier to hit than it may seem; checking a cache of previous results still takes time, and if you have a few hundred connected components it becomes easy for the whole thing to exceed the 13ms budget you have for rendering a frame during an animation.

The reason why things get slow, in this case, is that each action is causing every selector for every connected component to run. We’ve already made the selectors as fast as possible, and we’ve already reduced the number of times that actions take place (see the previous section), so the next step is to look for ways of minimising the number of running selectors.

Now, Redux is built around the idea of a single store, using reducer composition to keep code modular, and it assumes it’s okay for every selector to always run. And in many cases, this works just fine, but going against the recommendations by having multiple Redux data stores can be useful for certain categories of performance issues.

For example, if you have a frequently-updating part of the state tree that has a relatively small number of components interested in it, with most of the components interested in more seldom-updating parts, multiple stores may be worth a shot. Splitting up the frequently-updating portion into its own store would ensure that only the aforementioned minority of selectors gets called on update, instead of all of them.

### Solution #3: keeping things off the data store

Yes, this can go against the basic principle of using Redux, but if you’re running into performance issues with a particular frequently-updating bit of state, do consider looking at just how many things depend on it.

If there aren’t that many of them and if they’re all relatively close to each other in the render tree, perhaps consider keeping that state outside of the global state tree and just passing it around via props, as you would if you weren’t using Redux.

You may lose some of the other benefits of Redux, such as easy replayability, but the tradeoff may be worth it in some cases, such as with less important, transient data.

## Wrapping up

Redux and React make for an interesting combination with a ton of developer benefits, but this combination can make things harder to debug and fix when you start running into performance issues.

Hopefully, after reading these two articles and being aware of some of the different categories of performance issues you can run into (and some possible fixes), your profiling sessions will be a little bit easier.

I may come back to this topic at some point in the future if I find more interesting problems to discuss, but for now I hope you found this helpful!

**Big thanks to Jarda Snajdr for reviewing this article before publishing and offering some great advice!**
