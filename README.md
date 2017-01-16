# sgomes::blog

Hello there!

This is where I keep the source for my blog, as you can see.
It includes articles, images, and code samples, as well as the source files
for the site itself (built using Jekyll).

All the code is licensed under the Apache 2.0 license, and all the articles
are licensed under the Creative Commons 4.0 Attribution license.

## Building the site

First, install all the dependencies:

```
bundle install
npm i
```

and run the `build` task:

```
gulp build
```

## Running it locally

You can use the convenient `serve` task:

```
gulp serve
```

## Deploying

The `deploy` task takes care of pushing to `gh-pages`:

```
gulp deploy
```
