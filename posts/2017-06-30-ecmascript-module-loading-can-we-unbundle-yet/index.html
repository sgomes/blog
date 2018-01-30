<!DOCTYPE html>
<html lang="en">

  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Browser module loading - can we stop bundling yet?</title>
  <meta name="description" content="I’m Sérgio, and I work with Web frontend code. Sometimes I write about it here.">

    <!--
      Hello, and welcome to the source for my site!
      There's not a lot to see around here, but I hope you get some inspiration/ideas/laughs.

      Here's an ASCII art stick figure saying hi:  o/
                                                  /|
                                                  / \

      Also, no, I'm not Spanish. I just like short domain names.
    -->

  <link rel="canonical" href="https://sgom.es/">
  <link rel="alternate" type="application/rss+xml" title="sgom.es" href="/feed.xml">

  <link rel="manifest" href="/manifest.json">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="sgom.es">
  <link rel="icon" sizes="16x16" href="/assets/images/touch/16x16.png">
  <link rel="icon" sizes="32x32" href="/assets/images/touch/32x32.png">
  <link rel="icon" sizes="192x192" href="/assets/images/touch/192x192.png">
  <link rel="icon" sizes="512x512" href="/assets/images/touch/512x512.png">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="sgom.es">
  <link rel="apple-touch-icon" href="/assets/images/touch/152x152.png">

  <meta name="msapplication-TileImage" content="/assets/images/touch/144x144.png">
  <meta name="msapplication-TileColor" content="#009688">

  <meta name="theme-color" content="#009688">

  <link rel="preconnect" href="https://fonts.gstatic.com">

  <style>
  @import url(https://fonts.googleapis.com/css?family=Roboto+Mono|Rubik:400,500);@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:1}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:1}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-button{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-light,rgba(0,0,0,.87));font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;position:relative;min-width:64px;height:36px;padding:0 16px;border:none;border-radius:2px;outline:0;background:0 0;font-size:14px;font-weight:500;letter-spacing:.04em;line-height:36px;text-align:center;text-decoration:none;text-transform:uppercase;overflow:hidden;vertical-align:middle;user-select:none;box-sizing:border-box;-webkit-appearance:none}.mdc-button:not(.mdc-ripple-upgraded):active::after,.mdc-button:not(.mdc-ripple-upgraded):focus::before,.mdc-button:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button::before{background-color:rgba(0,0,0,.06);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button::after{background-color:rgba(0,0,0,.06);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button:not(.mdc-ripple-upgraded){-webkit-tap-highlight-color:rgba(0,0,0,.18)}.mdc-button--theme-dark,.mdc-theme--dark .mdc-button{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent;color:#fff;color:var(--mdc-theme-text-primary-on-dark,#fff)}.mdc-button--theme-dark:not(.mdc-ripple-upgraded):active::after,.mdc-button--theme-dark:not(.mdc-ripple-upgraded):focus::before,.mdc-button--theme-dark:not(.mdc-ripple-upgraded):hover::before,.mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):active::after,.mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):focus::before,.mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button--theme-dark::before,.mdc-theme--dark .mdc-button::before{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--theme-dark.mdc-ripple-upgraded::before,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--theme-dark.mdc-ripple-upgraded--background-focused::before,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button--theme-dark.mdc-ripple-upgraded--background-active-fill::before,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button--theme-dark.mdc-ripple-upgraded--unbounded::before,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--theme-dark::after,.mdc-theme--dark .mdc-button::after{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--theme-dark.mdc-ripple-upgraded::after,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button--theme-dark:not(.mdc-ripple-upgraded--unbounded)::after,.mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button--theme-dark.mdc-ripple-upgraded--unbounded::after,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button--theme-dark.mdc-ripple-upgraded--foreground-activation::after,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button--theme-dark.mdc-ripple-upgraded--foreground-deactivation::after,.mdc-theme--dark .mdc-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button--theme-dark:not(.mdc-ripple-upgraded),.mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded){-webkit-tap-highlight-color:rgba(255,255,255,.18)}.mdc-button.mdc-button--primary{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent}.mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):active::after,.mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):focus::before,.mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button.mdc-button--primary::before{background-color:rgba(0,150,136,.12);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}@supports (background-color:color(green a(10%))){.mdc-button.mdc-button--primary::before{background-color:color(var(--mdc-theme-primary,#009688) a(12%))}}.mdc-button.mdc-button--primary.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button.mdc-button--primary::after{background-color:rgba(0,150,136,.12);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}@supports (background-color:color(green a(10%))){.mdc-button.mdc-button--primary::after{background-color:color(var(--mdc-theme-primary,#009688) a(12%))}}.mdc-button.mdc-button--primary.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button.mdc-button--primary.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button.mdc-button--accent{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent}.mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):active::after,.mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):focus::before,.mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button.mdc-button--accent::before{background-color:rgba(255,171,64,.12);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}@supports (background-color:color(green a(10%))){.mdc-button.mdc-button--accent::before{background-color:color(var(--mdc-theme-accent,#ffab40) a(12%))}}.mdc-button.mdc-button--accent.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button.mdc-button--accent::after{background-color:rgba(255,171,64,.12);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}@supports (background-color:color(green a(10%))){.mdc-button.mdc-button--accent::after{background-color:color(var(--mdc-theme-accent,#ffab40) a(12%))}}.mdc-button.mdc-button--accent.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button.mdc-button--accent.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button:active{outline:0}.mdc-button:hover{cursor:pointer}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button--dense{height:32px;font-size:.8125rem;line-height:32px}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);will-change:box-shadow;min-width:88px}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised.mdc-button--primary{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent}.mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):active::after,.mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):focus::before,.mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button--raised.mdc-button--primary::before{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--raised.mdc-button--primary::after{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button--raised.mdc-button--accent{--mdc-ripple-surface-width:0;--mdc-ripple-surface-height:0;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;will-change:transform,opacity;-webkit-tap-highlight-color:transparent}.mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):active::after,.mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):focus::before,.mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):hover::before{transition-duration:85ms;opacity:.6}.mdc-button--raised.mdc-button--accent::before{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--background-focused::before{opacity:.99999}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--background-active-fill::before{transition-duration:120ms;opacity:1}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);top:var(--mdc-ripple-top,calc(50% - 50%));left:calc(50% - 50%);left:var(--mdc-ripple-left,calc(50% - 50%));width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform:scale(var(--mdc-ripple-fg-scale,0))}.mdc-button--raised.mdc-button--accent::after{background-color:rgba(255,255,255,.14);position:absolute;top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%;transition:opacity 250ms linear;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded::after{top:0;left:0;width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center;opacity:0}.mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded--unbounded)::after{transform-origin:center center}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--unbounded::after{top:0;top:var(--mdc-ripple-top,0);left:0;left:var(--mdc-ripple-left,0);width:100%;width:var(--mdc-ripple-fg-size,100%);height:100%;height:var(--mdc-ripple-fg-size,100%);transform:scale(0);transform-origin:center center}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--foreground-activation::after{animation:.3s mdc-ripple-fg-radius-in forwards,83ms mdc-ripple-fg-opacity-in forwards}.mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--foreground-deactivation::after{animation:83ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button--theme-dark .mdc-button--raised,.mdc-theme--dark .mdc-button--raised{background-color:#009688;background-color:var(--mdc-theme-primary,#009688);color:#fff;color:var(--mdc-theme-text-primary-on-primary,#fff)}.mdc-button--theme-dark .mdc-button--raised::before,.mdc-theme--dark .mdc-button--raised::before{color:#000}.mdc-button--primary{color:#009688;color:var(--mdc-theme-primary,#009688)}.mdc-button--theme-dark .mdc-button--primary,.mdc-theme--dark .mdc-button--primary{color:#009688;color:var(--mdc-theme-primary,#009688)}.mdc-button--primary.mdc-button--raised{background-color:#009688;background-color:var(--mdc-theme-primary,#009688);color:#fff;color:var(--mdc-theme-text-primary-on-primary,#fff)}.mdc-button--primary.mdc-button--raised::before{color:#000}.mdc-button--accent{color:#ffab40;color:var(--mdc-theme-accent,#ffab40)}.mdc-button--theme-dark .mdc-button--accent,.mdc-theme--dark .mdc-button--accent{color:#ffab40;color:var(--mdc-theme-accent,#ffab40)}.mdc-button--accent.mdc-button--raised{background-color:#ffab40;background-color:var(--mdc-theme-accent,#ffab40);color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-accent,rgba(0,0,0,.87))}.mdc-button--accent.mdc-button--raised::before{color:#000}.mdc-button--compact{padding:0 8px}.mdc-button:disabled,fieldset:disabled .mdc-button{color:rgba(0,0,0,.26);cursor:default;pointer-events:none}.mdc-button--theme-dark .mdc-button:disabled,.mdc-button--theme-dark fieldset:disabled .mdc-button,.mdc-theme--dark .mdc-button:disabled,.mdc-theme--dark fieldset:disabled .mdc-button{color:rgba(255,255,255,.3)}.mdc-button--raised:disabled,fieldset:disabled .mdc-button--raised{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);background-color:rgba(0,0,0,.12);pointer-events:none}.mdc-button--theme-dark .mdc-button--raised:disabled,.mdc-button--theme-dark fieldset:disabled .mdc-button--raised,.mdc-theme--dark .mdc-button--raised:disabled,.mdc-theme--dark fieldset:disabled .mdc-button--raised{background-color:rgba(255,255,255,.12)}.header{display:flex;height:80px;background:#009688;color:#fff;justify-content:center;align-items:center;flex-shrink:0;z-index:2;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.header-title{text-decoration:none;color:#fff;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:2.125rem;font-weight:400;letter-spacing:normal;line-height:2.5rem;margin:-.5rem 0 4rem -.07em;font-weight:700}.header-title:hover,.header-title:visited{color:#fff}.post{background:#fff;padding:3.5rem 4.5rem;margin:0 auto;color:rgba(0,0,0,.87);width:100%;max-width:45rem;box-sizing:border-box}@media screen and (max-width:600px){.post{padding:2rem 1rem}}.post-title{display:block;color:#009688;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.5rem;font-weight:500;letter-spacing:normal;line-height:2rem;margin:-.5rem 0 1rem -.06em;margin-bottom:0}.post-meta{display:block;color:#009688;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;font-weight:500;letter-spacing:normal;line-height:1.5rem;margin-bottom:16px}.post-tags{display:flex;align-items:baseline;flex-grow:1;line-height:normal}.post-tags-list{display:inline-block;flex-grow:1;margin-left:.2rem;font-family:'Roboto Mono',monospace;letter-spacing:normal}.post-image{max-width:100%;margin:0 auto}.post-image>img{display:block}.post-content{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875em;font-weight:400;letter-spacing:normal;line-height:1.6em;font-size:1rem;letter-spacing:normal;box-sizing:border-box}.post-content h1{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.5rem;font-weight:500;letter-spacing:normal;line-height:2rem}.post-content h2{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;font-weight:500;letter-spacing:normal;line-height:2rem;margin-top:2rem}.post-content h2+h3{margin-top:1em}.post-content h3{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;font-weight:500;letter-spacing:normal;line-height:2rem;font-size:1.1rem;line-height:1.5rem;margin:2em 0 0}.post-content h4{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;font-weight:500;letter-spacing:normal;line-height:1.5rem;font-size:1rem;letter-spacing:normal;margin:2em 0 0;color:rgba(0,0,0,.6)}.post-content a{color:#009688;text-decoration-skip-ink:auto}.post-content a:hover,.post-content a:visited{color:#009688}.post-content pre{border-radius:2px;margin:0;padding:16px 16px 0 16px;font-size:.9375em;font-style:normal;font-weight:400;letter-spacing:normal;line-height:normal;font-family:'Roboto Mono',monospace;overflow-x:auto}.post-content pre+pre{margin-top:16px}.post-content code{font-size:.9375em;color:#0d47a1;font-family:'Roboto Mono',monospace}.post-content strong{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;font-weight:500;letter-spacing:normal;line-height:1.5rem;font-size:1rem;letter-spacing:normal}.post-content figure{max-width:100%;box-sizing:border-box;margin:0}.post-content figcaption{text-align:center;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;font-weight:400;letter-spacing:normal;line-height:1.25rem}.post-content blockquote{margin:1.5em 0 2em 2.5em;border-left:1px solid #00bfa5;padding-left:1rem}.post-content table{display:block;margin:0 0 2rem;border-collapse:collapse;text-align:center;overflow-x:auto}.post-content table th{font-weight:500}.post-content table td,.post-content table th{padding:8px;border:1px solid #ddd}.post-content li+li{margin-top:.5rem}.post-content .overflow-x{overflow-x:auto}.home{padding:1rem 0;box-sizing:border-box}.home-post-list{box-sizing:border-box;list-style:none;padding:0 1rem;margin:0 auto 0 auto;width:100%;max-width:45rem}.home-post-entry{background:#fff;padding:2rem 3.5rem;box-sizing:border-box;width:100%;border-radius:2px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875em;font-weight:400;letter-spacing:normal;line-height:1.6em}.home-post-entry+.home-post-entry{margin-top:16px}.home-post-title{display:inline;padding-right:4px;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.5rem;font-weight:500;letter-spacing:normal;line-height:2rem;margin:-.5rem 0 1rem -.06em}.home-post-title>a{text-decoration:none;color:#009688}.home-post-title>a:hover,.home-post-title>a:visited{color:#009688}.home-post-meta{margin-bottom:0}.home-post-excerpt{margin:8px 0 0 0;color:rgba(0,0,0,.87);font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875em;font-weight:400;letter-spacing:normal;line-height:1.6em;font-size:1rem;letter-spacing:normal}.home-post-bottom{display:flex;flex-flow:row;padding-top:16px;align-items:flex-end}.home-pagination{display:flex;flex-flow:row nowrap;padding:16px 8px;box-sizing:border-box;margin:0 auto;width:100%;max-width:45rem}.home-page-previous{margin-right:auto}.home-page-next{margin-left:auto}@media screen and (max-width:600px){.home-post-bottom{align-items:flex-start;flex-direction:column}.home-post-tags{margin-bottom:1rem}.home-post-entry{padding:1rem}}.footer{display:flex;flex-flow:column nowrap;width:100%;background-color:#009688;color:#fff;padding:16px;box-sizing:border-box;flex-shrink:0;z-index:2;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.footer-contents{display:flex;position:relative;flex-flow:row nowrap;justify-content:center;align-items:center;margin:0 auto 0 auto;flex-shrink:0;box-sizing:border-box;padding:0 24px;width:100%;max-width:45rem}@media (max-width:600px){.footer-contents{flex-wrap:wrap;padding:0}}.footer-avatar{border-radius:10%;width:100px;height:100px;background:#000;flex-grow:0;flex-shrink:0;margin-right:16px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.footer-text{flex-grow:1;flex-shrink:1;padding:16px;width:50%}.footer-heading{font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;font-weight:500;letter-spacing:normal;line-height:2rem;margin:-.5rem 0 1rem -.05em;margin-bottom:8px}.footer-description{margin:0}.footer-icons{display:block;flex-shrink:0;margin:.5rem 0}.footer-icons-row{display:block;flex-shrink:0}@media (max-width:600px){.footer-icons-row{display:inline-block}}.footer-bubble{display:inline-block;border-radius:50%;height:40px;width:40px;flex-shrink:0;margin:2px;background-repeat:no-repeat;background-size:contain;background-position:center}.footer-twitter{background-image:url(/assets/images/twitter.svg)}.footer-github{border-radius:0;background-image:url(/assets/images/github.svg)}.footer-email{background-image:url(/assets/images/email.svg)}.footer-feed{background-image:url(/assets/images/feed.svg)}.footer-bottom{display:flex;position:relative;justify-content:center;margin:8px auto 0 auto;flex-shrink:0;width:100%;max-width:45rem}.footer-bottom::before{display:block;position:absolute;top:50%;width:100%;height:1px;background:rgba(255,255,255,.17);content:''}.footer-copyright{display:inline-block;text-align:center;background:#009688;z-index:2;padding:0 8px;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;font-weight:400;letter-spacing:normal;line-height:1.25rem}.footer-copyright a{color:#fff;text-decoration:none;font-weight:700}.footer-copyright a:hover,.footer-copyright a:visited{color:#fff}.post-content pre{background:#f5f5f5}.post-content pre code{color:rgba(0,0,0,.87)}.post-content pre code .comment{color:#616161}.post-content pre code .comment .markup.link{color:#616161}.post-content pre code .entity.name.type{color:#3e2723}.post-content pre code .entity.other.inherited-class{color:#1b5e20}.post-content pre code .keyword{color:#4a148c}.post-content pre code .keyword.control{color:#4a148c}.post-content pre code .keyword.operator{color:rgba(0,0,0,.87)}.post-content pre code .keyword.other.special-method{color:#0d47a1}.post-content pre code .keyword.other.unit{color:#e65100}.post-content pre code .storage{color:#4a148c}.post-content pre code .constant{color:#e65100}.post-content pre code .constant.character.escape{color:#006064}.post-content pre code .constant.numeric{color:#e65100}.post-content pre code .constant.other.color{color:#006064}.post-content pre code .constant.other.symbol{color:#1b5e20}.post-content pre code .variable{color:#b71c1c}.post-content pre code .variable.interpolation{color:#3e2723}.post-content pre code .variable.parameter.function{color:rgba(0,0,0,.87)}.post-content pre code .invalid.illegal{background-color:#b71c1c;color:#f5f5f5}.post-content pre code .string{color:#1b5e20}.post-content pre code .string.regexp{color:#006064}.post-content pre code .string.regexp .source.ruby.embedded{color:#3e2723}.post-content pre code .string.other.link{color:#b71c1c}.post-content pre code .punctuation.definition.array,.post-content pre code .punctuation.definition.parameters{color:rgba(0,0,0,.87)}.post-content pre code .punctuation.definition.heading,.post-content pre code .punctuation.definition.identity{color:#0d47a1}.post-content pre code .punctuation.definition.bold{color:#3e2723;font-weight:700}.post-content pre code .punctuation.definition.italic{color:#4a148c;font-style:italic}.post-content pre code .punctuation.section.embedded{color:#3e2723}.post-content pre code .punctuation.section.class,.post-content pre code .punctuation.section.inner-class,.post-content pre code .punctuation.section.method{color:rgba(0,0,0,.87)}.post-content pre code .support.class{color:#3e2723}.post-content pre code .support.function{color:#006064}.post-content pre code .support.function.any-method{color:#0d47a1}.post-content pre code .entity.name.function{color:#0d47a1}.post-content pre code .entity.name.class,.post-content pre code .entity.name.type.class{color:#3e2723}.post-content pre code .entity.name.section{color:#0d47a1}.post-content pre code .entity.name.tag{color:#b71c1c}.post-content pre code .entity.other.attribute-name{color:#e65100}.post-content pre code .entity.other.attribute-name.id{color:#0d47a1}.post-content pre code .meta.class{color:#3e2723}.post-content pre code .meta.class.body{color:rgba(0,0,0,.87)}.post-content pre code .meta.link{color:#e65100}.post-content pre code .meta.method,.post-content pre code .meta.method-call{color:rgba(0,0,0,.87)}.post-content pre code .meta.require{color:#0d47a1}.post-content pre code .meta.selector{color:#4a148c}.post-content pre code .meta.separator{background-color:#373b41;color:rgba(0,0,0,.87)}.post-content pre code .meta.tag{color:rgba(0,0,0,.87)}.post-content pre code .none{color:rgba(0,0,0,.87)}.post-content pre code .markup.bold{color:#e65100;font-weight:700}.post-content pre code .markup.changed{color:#4a148c}.post-content pre code .markup.deleted{color:#b71c1c}.post-content pre code .markup.italic{color:#4a148c;font-style:italic}.post-content pre code .markup.heading{color:#b71c1c}.post-content pre code .markup.heading .punctuation.definition.heading{color:#0d47a1}.post-content pre code .markup.link{color:#0d47a1}.post-content pre code .markup.inserted{color:#1b5e20}.post-content pre code .markup.quote{color:#e65100}.post-content pre code .markup.raw{color:#1b5e20}.post-content pre code .source.gfm .markup{-webkit-font-smoothing:auto}.post-content pre code .source.gfm .link .entity{color:#006064}.aspect-ratio{--aspect-ratio-w:1;--aspect-ratio-h:1;position:relative}.aspect-ratio>:first-child{width:100%}@supports (--custom-props:true){.aspect-ratio::before{display:block;padding-top:calc(var(--aspect-ratio-h,1)/ var(--aspect-ratio-w,1) * 100%);content:""}.aspect-ratio>:first-child{position:absolute;top:0;right:0;bottom:0;left:0;height:100%;width:100%}}body,html{display:flex;flex-direction:column;margin:0;padding:0;box-sizing:border-box;font-family:Rubik,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:100%}.site-content{flex-grow:1;background:#eceff1;box-sizing:border-box}.mdc-button{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;text-decoration:none}
  </style>

  
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-90468985-1', 'auto');
  ga('send', 'pageview');

</script>

  
</head>


  <body>

    <header class="header" role="banner">
<div>
  <a class="header-title" href="/">sgom.es</a>
</div>
</header>


    <main class="site-content" aria-label="Content">
        
<article class="post" itemscope itemtype="http://schema.org/BlogPosting">

  <header class="post-header">
    <h1 class="post-title" itemprop="name headline">Browser module loading - can we stop bundling yet?</h1>
    <time class="post-meta" datetime="2017-06-30T18:50:00+01:00" itemprop="datePublished">(2017-06-30)</time>
  </header>

  <div class="post-content" itemprop="articleBody">
    
<p><strong>TL;DR:</strong> Not really. :-( Missing tooling and browser bugs aside, loading time can be up to 1.80x longer for large codebases.</p>
<p>If you want to jump straight to the benchmarks, go to the <a href="#building-a-benchmark">Building a benchmark</a> or <a href="#running-tests">Running tests sections</a>.</p>
<p>If you want to grab the code and run some tests yourself, pop on over to the <a href="https://github.com/GoogleChrome/samples-module-loading-comparison">GitHub repository for these tests</a>.</p>
<p>If you’d like a bit more background on ECMAScript modules, HTTP/2 and other features that can be used to speed things up, keep reading!</p>
<h2 id="modules-what-are-they-">Modules: what are they?</h2>
<p>ECMAScript modules have been a boon to the developer community; not only do they allow for organizing code better, but they also provide important features like deduplication and easier code sharing.</p>
<pre><code class="lang-js"><div class="line"><span class="source js"><span class="comment line double-slash js"><span class="punctuation definition comment js"><span>//</span></span><span>&nbsp;dependency.js</span></span></span></div><div class="line"><span class="source js"><span class="meta export js"><span class="keyword control js"><span>export</span></span><span>&nbsp;</span></span><span class="meta function js"><span class="storage type function js"><span>function</span></span><span>&nbsp;</span><span class="entity name function js"><span>dependencyMethod</span></span><span class="meta parameters js"><span class="punctuation definition parameters begin bracket round js"><span>(</span></span><span class="punctuation definition parameters end bracket round js"><span>)</span></span></span></span><span>&nbsp;</span><span class="punctuation definition function body begin bracket curly js"><span>{</span></span><span>&nbsp;</span><span class="keyword operator spread js"><span>...</span></span><span>&nbsp;</span><span class="punctuation definition function body end bracket curly js"><span>}</span></span></span></div>
</code></pre>
<pre><code class="lang-js"><div class="line"><span class="source js"><span class="comment line double-slash js"><span class="punctuation definition comment js"><span>//</span></span><span>&nbsp;app.js</span></span></span></div><div class="line"><span class="source js"><span class="meta import js"><span class="keyword control js"><span>import</span></span><span>&nbsp;</span><span class="punctuation definition modules begin js"><span>{</span></span><span>&nbsp;</span><span class="variable other module js"><span>dependencyMethod</span></span><span>&nbsp;</span><span class="punctuation definition modules end js"><span>}</span></span><span>&nbsp;</span><span class="keyword control js"><span>from</span></span><span>&nbsp;</span><span class="string quoted single js"><span class="punctuation definition string begin js"><span>&#39;</span></span><span>./dependency.js</span><span class="punctuation definition string end js"><span>&#39;</span></span></span></span><span class="punctuation terminator statement js"><span>;</span></span></span></div>
</code></pre>
<blockquote>
<p><strong>Note:</strong> The browser is picky about the import syntax, particularly where it comes to the URL. All paths must be either absolute or relative, and relative paths must start with &#39;<code>.</code>&#39; or &#39;<code>..</code>&#39;</p>
</blockquote>
<p>Up until now, we’ve been using bundlers like <a href="https://rollupjs.org/">rollup</a> and <a href="https://webpack.js.org/">webpack</a> to turn all of those modules into a single JavaScript file that the browser can run (or perhaps several of them, if we’re code-splitting). This is because up until recently browsers couldn’t handle the module loading themselves; but Safari (10.1, unflagged), Chrome M60 (behind a flag), Firefox 54 (behind a flag) and Edge 15 (behind a flag) now support it.</p>
<pre><code class="lang-html"><div class="line"><span class="text html basic"><span class="source js embedded html"><span class="punctuation definition tag html"><span>&lt;</span></span><span class="entity name tag script html"><span>script</span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>type</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>module</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>src</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>app.js</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span class="punctuation definition tag html"><span>&gt;</span></span></span></span></div>
</code></pre>
<blockquote>
<p><strong>Note:</strong> Scripts making use of modules need to be loaded with <code>type=&quot;module&quot;</code>.</p>
</blockquote>
<p>There are some potential benefits in not having to bundle things anymore: caching improves since we’re able to handle changes in a single module without invalidating everything; the file structure remains the same (or very similar) between development and production, simplifying debugging; and the build process could become simpler.</p>
<p>That said, can the performance of an unbundled website match that of a bundled one?</p>
<h2 id="problems-and-their-enabling-technologies">Problems and their enabling technologies</h2>
<h3 id="establishing-a-connection-is-slow">Establishing a connection is slow</h3>
<p>One of the issues with loading many resources used to be establishing the connections themselves. This is usually a slow process, particularly on secure connections, which require extra handshaking.</p>
<p>HTTP/1.0 required a new connection to be established for every resource. In HTTP/1.1, the problem was reduced somewhat with keep-alive, which allows for a connection to be left open for a while and thus reused to retrieve multiple resources. That said, it’s not possible to have several resources being downloaded at the same time, so if you have a lot of things to deal with simultaneously you’re still likely to run into head-of-line blocking. When trying to fetch something else, the browser’s options are limited to either waiting for the current download to finish, or to open a new connection, and when you combine this with the limit of 6 concurrent connections (to the same origin) that most browsers implement, the gains aren’t great.</p>
<p>HTTP/2 (or h2) provides a much more comprehensive solution, by allowing for the connection to be shared by multiple resources, concurrently. This enables a single connection per origin, through which all content can be sent, regardless of how many resources are being retrieved. There are exceptions to this, particularly around credentialed and uncredentialed requests (which require separate connections), but that’s the gist of it.</p>
<h3 id="no-up-front-list-of-resources">No up-front list of resources</h3>
<p>ES modules come with an interesting additional problem, though: dependencies. While great in terms of developer ergonomics, they complicate things when serving; if module ‘<code>A</code>’ depends on module ‘<code>B</code>’, which in turn depends on module ‘<code>C</code>’ and so forth, we’ll actually have to wait for each of these modules to be loaded before we know what to load next.</p>
<p>We may want to create a list of all the modules we know we’ll need up front, and start downloading them all in one go, while the browser parses and executes each one as it arrives. And we actually have several solutions for this!</p>
<h4 id="http-2-push">HTTP/2 push</h4>
<p>HTTP/2 has the ability to push resources; this is sort of like the server saying “Oh, you want this thing? Then you’ll want these as well.”, and pushing them onto the request.</p>
<p>While this gives you a great way of speeding things up, it also means you should be very careful when using push. If the items being pushed end up not being needed, they effectively just waste bandwidth. This may even cause bytes to go down the wire for an item which the browser already has in its HTTP cache, depending on how the browser chooses to handle those pushes (for details, check <a href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/">my colleague Jake Archibald’s excellent writeup on HTTP/2 push</a>).</p>
<h4 id="preload">Preload</h4>
<p>Another option is to add a <code>&lt;link rel=&quot;preload&quot;&gt;</code> to the HTML. This instructs the browser to start retrieving the resource, without actually doing anything with it just yet. You’d then use it normally further down in the page:</p>
<pre><code class="lang-html"><div class="line"><span class="text html basic"><span class="meta tag structure any html"><span class="punctuation definition tag html"><span>&lt;</span></span><span class="entity name tag structure any html"><span>head</span></span><span class="punctuation definition tag html"><span>&gt;</span></span></span></span></div><div class="line"><span class="text html basic"><span>&nbsp;&nbsp;</span><span class="meta tag inline any html"><span class="punctuation definition tag begin html"><span>&lt;</span></span><span class="entity name tag inline any html"><span>link</span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>rel</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>preload</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>href</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>/app.js</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>as</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>script</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span class="punctuation definition tag end html"><span>&gt;</span></span></span></span></div><div class="line"><span class="text html basic"><span>&nbsp;&nbsp;</span><span class="meta tag inline any html"><span class="punctuation definition tag begin html"><span>&lt;</span></span><span class="entity name tag inline any html"><span>link</span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>rel</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>preload</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>href</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>/dependency.js</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>as</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>script</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span class="punctuation definition tag end html"><span>&gt;</span></span></span></span></div><div class="line"><span class="text html basic"><span class="meta tag structure any html"><span class="punctuation definition tag html"><span>&lt;/</span></span><span class="entity name tag structure any html"><span>head</span></span><span class="punctuation definition tag html"><span>&gt;</span></span></span></span></div><div class="line"><span class="text html basic"><span class="meta tag structure any html"><span class="punctuation definition tag html"><span>&lt;</span></span><span class="entity name tag structure any html"><span>body</span></span><span class="punctuation definition tag html"><span>&gt;</span></span></span></span></div><div class="line"><span class="text html basic"><span class="source js embedded html"><span>&nbsp;&nbsp;</span><span class="punctuation definition tag html"><span>&lt;</span></span><span class="entity name tag script html"><span>script</span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>type</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>module</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span>&nbsp;</span><span class="entity other attribute-name html"><span>src</span></span><span>=</span><span class="string quoted double html"><span class="punctuation definition string begin html"><span>&quot;</span></span><span>app.js</span><span class="punctuation definition string end html"><span>&quot;</span></span></span><span class="punctuation definition tag html"><span>&gt;</span><span>&lt;/</span></span><span class="entity name tag script html"><span>script</span></span><span class="punctuation definition tag html"><span>&gt;</span></span><span>&nbsp;</span></span></span></div><div class="line"><span class="text html basic"><span class="meta tag structure any html"><span class="punctuation definition tag html"><span>&lt;/</span></span><span class="entity name tag structure any html"><span>body</span></span><span class="punctuation definition tag html"><span>&gt;</span></span></span></span></div>
</code></pre>
<p>Note that a preload retrieves the item and places it in the cache so that it’s available when needed, even if it’s not explicitly in the DOM. In the above example, <code>dependency.js</code> can still get the benefits of a quick load from cache even though it’s only loaded as a dependency by <code>app.js</code>.</p>
<p>Preloads can also be done as an additional HTTP header that gets attached to the response, instead of being part of the HTML.</p>
<pre><code><div class="line"><span class="text plain"><span class="meta paragraph text"><span>Link:&nbsp;&lt;/app.js&gt;;&nbsp;rel=preload;&nbsp;as=script,&nbsp;&lt;/dependency.js&gt;;&nbsp;rel=preload;&nbsp;as=script</span></span></span></div>
</code></pre><p>Note that the browser still initiates the retrieval itself, just as with the <code>&lt;link&gt;</code> option. HTTP/2 push is the only one that’s cheeky enough to attach bytes that weren’t requested to the response it sends.</p>
<p>Sadly, preload is still somewhat lacking in browser support, with Firefox, Edge, and Safari iOS missing it entirely.</p>
<h2 id="building-a-benchmark">Building a benchmark</h2>
<p>So in theory this should all work really well, and we should be able to just unbundle everything and run it in production (assuming users have the browser support). In practice, though, is that really the case? Time for some testing!</p>
<p>If we want a reasonable test case, we need a large ES2015 codebase built with modules that we can turn into a simple web page to analyse performance. Since it would be somewhat out of scope to build an entire website for this blog post, I decided to convert some existing large codebases instead: <a href="https://momentjs.com/">moment.js</a> and <a href="https://threejs.org/">three.js</a>.</p>
<p>I wrote a build tool that does the following:</p>
<ul>
<li>Takes a Javascript file entry point and builds a list of all its dependencies, even inside Node packages. This is implemented as a rollup plugin.</li>
<li>Rewrites all of the imports to use relative paths that the browser accepts. This is implemented as a babel plugin.</li>
<li>Generates 3 bundles.<ul>
<li>Unbundled: outputs all of the unbundled code to a <code>dist/.../unbundled</code> folder.</li>
<li>Bundled, optimized: creates a bundle using <a href="https://rollupjs.org/">rollup</a>, into a <code>dist/.../bundled-optimized</code> folder.</li>
<li>Bundled, unoptimized: creates a bundle using <a href="https://webpack.js.org/">webpack</a> with tree-shaking disabled, into a <code>dist/.../bundled-unoptimized</code> folder. I would have used rollup here too, but the ‘<code>treeshake: false</code>’ option seems to be buggy at the moment.</li>
</ul>
</li>
<li>Minifies all three builds with <a href="https://github.com/babel/babili">babili</a>.</li>
<li>Creates a JSON file with the list of dependencies, for serving purposes.</li>
</ul>
<p>The tests are built with no consideration for the <a href="https://developers.google.com/web/fundamentals/performance/prpl-pattern/">PRPL pattern</a> or critical rendering best practices. This is meant to be a simple test of how well browsers can cope with loading a large number of imports in one go, and assuming the entirety of these libraries as defined in their entry points are needed. Proper loading practices wouldn’t invalidate the total load time, but could produce a much quicker first render, allow for partial functionality while waiting, and overall reduce the perceived time to the user.</p>
<p>For the server side of things, I built a simple server using <a href="https://github.com/spdy-http2/node-spdy">node-spdy</a>, which is able to serve over a number of protocols. The server loads every file into memory on start, to provide a fair benchmark, and through command line flags can serve over HTTP/1.1 or HTTP/2, perform HTTP/2 push, and rewrite the HTML to do <code>&lt;link rel=&quot;preload&quot;&gt;</code>. It serves content with gzip compression enabled on every resource.</p>
<p>The code is all available on the <a href="https://github.com/GoogleChrome/samples-module-loading-comparison">GitHub repository for these tests</a>.</p>
<h2 id="running-tests">Running tests</h2>
<h3 id="browser-support">Browser support</h3>
<p>And we very quickly run into problems. Chrome and Firefox have issues, with Chrome throwing an error and Firefox crashing whenever we try to load the unbundled pages, regardless of any other variable.</p>
<figure>
  <div class="aspect-ratio post-image"
       style="width: 1116px; --aspect-ratio-w: 1116; --aspect-ratio-h: 166;">
    <img src="chrome.png" alt="Runtime error in Chrome">
  </div>
  <figcaption>Runtime error in Chrome</figcaption>
</figure>









<figure>
  <div class="aspect-ratio post-image"
       style="width: 1194px; --aspect-ratio-w: 1194; --aspect-ratio-h: 364;">
    <img src="firefox.png" alt="Tab crash in Firefox">
  </div>
  <figcaption>Tab crash in Firefox</figcaption>
</figure>





<p><strong>Edit (2017–07–19):</strong> The Chrome bug has since been fixed.</p>
<p>Bugs have been filed for both <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=732765">Chrome</a> and <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1372258">Firefox</a>. This is not totally unexpected, since these are experimental features that are still being worked on, but it does mean that we can’t run our benchmark on them just yet.</p>
<p>As for Edge, I ran into issues testing with module loading enabled, due to my particular test setup and the fact that I didn’t immediately have access to a physical Windows machine running Windows 10 Preview.</p>
<p>I hope to revisit things at some point, but in the meantime I decided to move forward with Safari, since it’s shipped a stable implementation of module loading.</p>
<h3 id="test-methodology">Test methodology</h3>
<p>While Safari 10.1 does have support for module loading, preload support was only added later. To keep things consistent, I decided to run all tests on Safari Technology Preview Release 32 on macOS Sierra 10.12.5, which does support both module loading and preload.</p>
<p>I’m presenting the mean load time as reported by the Safari developer tools summary bar while on the Network tab, over 5 runs, with caching disabled, and manually clearing the cache between runs (Develop → Empty Caches). Test results greater than 1 second are presented in seconds with 2 decimal places, and test results smaller than 1 second are presented as integer millisecond values, since these are the exact output formats we get back from Safari developer tools.</p>
<p>For reasons I haven’t been able to fully identify, loads are sometimes faster if they happen in quick succession, even with caching disabled. Perhaps the browser is reusing a connection and skipping the handshaking, even though it’s a complete refresh? I therefore left an interval of at least 10 seconds between runs to achieve the longer, and hopefully more representative result.</p>
<p>I’m also including the number and total size of all resources, as presented by Safari developer tools. Since this is the uncompressed size but gzip compression is enabled on the server, I also include the gzipped size measured in the proxy as the total size of the responses. This is slightly larger than the “transferred” size reported by Chrome developer tools in a quick comparison, but is hopefully still representative.</p>
<p>On the networking side of things, we need to simulate real-world conditions by adding some latency and throttling the bandwidth. Since Safari does not support this through its developer tools, I set up a local SOCKS proxy with throttling functionality. I used the speed settings from the <a href="http://webpagetest.org/">webpagetest.org</a> “Mobile 3G - Slow” profile: 780kbps downstream, 330kbps upstream and 200ms round trip latency.</p>
<h3 id="http-1-1">HTTP/1.1</h3>
<p>First things first: let’s start with the worst case of HTTP/1.1 over TLS, with no preload. This is where we expect things to go very poorly for unbundling, and sure enough, they do:</p>
<p><em>moment.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Resources</th>
<th>Size (ungzipped)</th>
<th>Size (gzipped)</th>
<th>Time</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2</td>
<td>49.7KB</td>
<td>18.34KB</td>
<td>1.13s</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2</td>
<td>62.1KB</td>
<td>21.18KB</td>
<td>1.17s</td>
</tr>
<tr>
<td>Unbundled</td>
<td>105</td>
<td>86.0KB</td>
<td>81.31KB</td>
<td>5.92s</td>
</tr>
</tbody>
</table>
<p><em>three.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Resources</th>
<th>Size (ungzipped)</th>
<th>Size (gzipped)</th>
<th>Time</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2</td>
<td>468.2KB</td>
<td>120.89KB</td>
<td>2.61s</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2</td>
<td>517.3KB</td>
<td>132.71KB</td>
<td>2.77s</td>
</tr>
<tr>
<td>Unbundled</td>
<td>334</td>
<td>588.5KB</td>
<td>328.47KB</td>
<td>16.53s</td>
</tr>
</tbody>
</table>
<p>Unbundled performance is terrible, as expected, with an unbundled three.js taking around 6x as long to load.</p>
<p>Looking at the file sizes, we notice that the unbundled size is significantly larger than even the unoptimized bundle. This is likely due to the fact that there are gains to be made from minifying a single large file, rather than many small ones, since there will be less reuse in the latter case. Compression only compounds the problem further, since there are also gains from gzipping a single large file, rather than many small files individually.</p>
<p>If we enable preload for the unbundled version, we don’t expect things to change much. Let’s take a look:</p>
<p><em>moment.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Resources</th>
<th>Size (ungzipped)</th>
<th>Size (gzipped)</th>
<th>Time</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2</td>
<td>49.7KB</td>
<td>18.34KB</td>
<td>1.12s</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2</td>
<td>62.1KB</td>
<td>21.19KB</td>
<td>1.17s</td>
</tr>
<tr>
<td>Unbundled</td>
<td>105</td>
<td>99.8KB</td>
<td>82.06KB</td>
<td>4.91s</td>
</tr>
</tbody>
</table>
<p><em>three.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Resources</th>
<th>Size (ungzipped)</th>
<th>Size (gzipped)</th>
<th>Time</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2</td>
<td>468.2KB</td>
<td>120.89KB</td>
<td>2.58s</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2</td>
<td>517.3KB</td>
<td>132.71KB</td>
<td>2.76s</td>
</tr>
<tr>
<td>Unbundled</td>
<td>334</td>
<td>636.1KB</td>
<td>330.78KB</td>
<td>15.79s</td>
</tr>
</tbody>
</table>
<p>The bundled versions are unchanged, and therefore produce approximate results on this test run. The unbundled versions produce a modest improvement: loading is 1.21x as fast in moment, and 1.05x in three.js.</p>
<p>Note the somewhat larger total size on the unbundled versions, compared to before. This is because of the all of the extra markup we needed to add to the HTML, in the form of <code>&lt;link rel=&quot;preload&quot;&gt;</code> tags. It compresses quite well, though, because of all the repetition, so it doesn’t have much impact in the end.</p>
<p>Let’s switch to HTTP/2 and see what happens.</p>
<h3 id="http-2-without-push-or-preload">HTTP/2 without push or preload</h3>
<blockquote>
<p><strong>Note:</strong> I traded the size and resources columns for a speedup column, for easier comparison with the HTTP/1.1 results. Sizes and resources should remain the same anyway.</p>
</blockquote>
<p><em>moment.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 w/o preload</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>667ms</td>
<td>1.69x</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>707ms</td>
<td>1.65x</td>
</tr>
<tr>
<td>Unbundled</td>
<td>2.00s</td>
<td>2.96x</td>
</tr>
</tbody>
</table>
<p><em>three.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 w/o preload</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2.12s</td>
<td>1.23x</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2.29s</td>
<td>1.21x</td>
</tr>
<tr>
<td>Unbundled</td>
<td>4.71s</td>
<td>3.51x</td>
</tr>
</tbody>
</table>
<p>Results are a good improvement over HTTP/1.1, even for the bundled versions, loading at between 1.21x and 1.69x as fast. The unbundled versions make considerable gains, running between 2.96x and 3.51x as fast.</p>
<p>We’re not dealing with the dependency issue in the unbundled versions yet, though; the browser still has to load each individual JS file to in order to know what to load next, which is a particular problem in our testing environment (and a lot of real-world networks) due to the 200ms spent on every round trip.</p>
<h3 id="http-2-with-push">HTTP/2 with push</h3>
<p>Let’s try pushing all the JS dependencies with the JS entry point (<code>app.js</code>) and see what that gets us.</p>
<blockquote>
<p><strong>Note:</strong> we’re not using push in the bundled builds, since the entry point JS is the full JS, and so there is nothing else to push. We could be saving a round trip and pushing the JS as part of the HTML request, but we’d run into issues with credentialed vs uncredentialed requests. The details are out of scope here, but once again my colleague Jake Archibald has a <a href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/">good writeup on this and other issues with h2 push</a>.</p>
</blockquote>
<p><em>moment.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 w/o preload</th>
<th>Speedup vs HTTP/2 w/o push</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>671ms</td>
<td>1.68x</td>
<td>—</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>711ms</td>
<td>1.65x</td>
<td>—</td>
</tr>
<tr>
<td>Unbundled</td>
<td>1.44s</td>
<td>4.11x</td>
<td>1.39x</td>
</tr>
</tbody>
</table>
<p><em>three.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 w/o preload</th>
<th>Speedup vs HTTP/2 w/o push</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2.13s</td>
<td>1.23x</td>
<td>—</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2.31s</td>
<td>1.20x</td>
<td>—</td>
</tr>
<tr>
<td>Unbundled</td>
<td>FAIL!</td>
<td>—</td>
<td>—</td>
</tr>
</tbody>
</table>
<p>Statistical variation aside, the results for the bundled versions should be the same as for HTTP/2 without push, since we haven’t changed anything.</p>
<p>As for the unbundled versions, things get interesting. Again we see a significant improvement, with moment loading 1.39x as fast with push than without. However, with three.js, we get an error!</p>
<figure>
  <div class="aspect-ratio post-image"
       style="width: 934px; --aspect-ratio-w: 934; --aspect-ratio-h: 142;">
    <img src="safari-push-error.png" alt="Protocol error in Safari">
  </div>
  <figcaption>Protocol error in Safari</figcaption>
</figure>





<p>It isn’t clear on the message, but the failing resource is ‘<code>app.js</code>’, the entry point to which we attach all the pushes. Safari doesn’t give us a lot of information on what exactly went wrong, but “protocol error” seems to indicate that it gives up above a certain number of pushes or some other metric.</p>
<p>Note that this is not just Technical Preview instability; Safari 10.1.1 (stable) produces the same error.</p>
<p>In any case, the message is clear: don’t push too much in one request, or Safari might kill it.</p>
<h3 id="http-2-with-preload">HTTP/2 with preload</h3>
<p>Preload should work a lot better combined with HTTP/2, and hopefully won’t be a problem for Safari like push was.</p>
<blockquote>
<p><strong>Note:</strong> once again, no preloading is being done in the bundled versions. Results should be the same, statistical variation aside.</p>
</blockquote>
<p><em>moment.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 with preload</th>
<th>Speedup vs HTTP/2 w/o preload</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>676ms</td>
<td>1.66x</td>
<td>—</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>710ms</td>
<td>1.65x</td>
<td>—</td>
</tr>
<tr>
<td>Unbundled</td>
<td>1.21s</td>
<td>4.06x</td>
<td>1.79x</td>
</tr>
</tbody>
</table>
<p><em>three.js</em></p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Time</th>
<th>Speedup vs HTTP/1.1 with preload</th>
<th>Speedup vs HTTP/2 w/o preload</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bundled, optimized</td>
<td>2.13s</td>
<td>1.12x</td>
<td>—</td>
</tr>
<tr>
<td>Bundled, unoptimized</td>
<td>2.30s</td>
<td>1.20x</td>
<td>—</td>
</tr>
<tr>
<td>Unbundled</td>
<td>4.13s</td>
<td>3.82x</td>
<td>1.14x</td>
</tr>
</tbody>
</table>
<p>First of all, it looks like we managed to run three.js this time around! Hooray! The preload gains are quite modest when compared to HTTP/2 without preload, though.</p>
<p>The moment.js test case paints a more interesting story: it looks like preload (1.21s) is actually faster than push (1.44s). The reasons behind this may have to do with the fact that with preload the browser is still in control, whereas with push it’s the server that chooses what to send, and when. This means that with preload the browser has more opportunity to get what it needs first, rather than passively wait until it’s delivered.</p>
<p>The speedup vs HTTP/2 without preload is much larger in the case of moment.js. I suspect this may have to do with the module structure for both projects; you might get different gains depending on how deep or wide your dependency tree is.</p>
<h2 id="conclusions">Conclusions</h2>
<p>The first conclusion is somewhat obvious: make sure you have HTTP/2 support on your site! That is the single largest improvement you can make, whether you’re bundling resources or not.</p>
<p>The second one is also straightforward: be careful with HTTP/2 push. It’s not at easy as it looks, and beyond affecting performance it can actually break your site. If you really want to use HTTP/2 push, you may want to look into stream priorities as well (which I didn’t, in my code), and have them follow your module dependency tree; it will make the static analysis even more complex, but it may provide some benefits in matching what the browser expects.</p>
<p>But here’s where we go back to the question we started this post with: can we unbundle yet? Well, let’s take a look at the numbers for our best-case scenario, HTTP/2 with preload:</p>
<table>
<thead>
<tr>
<th>Test case</th>
<th>Bundled, optimized</th>
<th>Bundled, unoptimized</th>
<th>Unbundled</th>
</tr>
</thead>
<tbody>
<tr>
<td>moment.js</td>
<td>676ms</td>
<td>710ms</td>
<td>1.21s</td>
</tr>
<tr>
<td>three.js</td>
<td>2.13s</td>
<td>2.30s</td>
<td>4.13s</td>
</tr>
</tbody>
</table>
<p>Even if we assume that the unoptimized bundle is the fairest comparison, we’re still looking at taking 1.70x (moment) or 1.80x (three) as long to load.</p>
<p>It will be hard to find gains elsewhere to compensate for this loss. These are all static dependencies, so it would be difficult to organize the code so that we could load things at different points in time. And even if we could do that, it would mean we could apply the same technique to the bundled version, by splitting it into the corresponding smaller bundles.</p>
<p>Beyond this, there is the immediate issue of tooling, in that our optimal solution requires up-front knowledge of what files need to be loaded. Plugins would need to be written, to create this dependency tree and inject preload lists into the HTML or the HTTP headers. But tooling is something that the Web community is very comfortable with, so this would be a temporary hurdle, at worst.</p>
<p>The bugs make the approach difficult to recommend for now, though, even as progressive enhancement. In two of the three tested browsers, these pages fail to work correctly. And since the browser has no way of knowing that it will crash or error out, the browser will use the unbundled version even if you add a bundled fallback. And sure, these are artificial stress test cases, so you’d have some chance of avoiding the bugs in a real site, but they&#39;re still there, waiting for the right conditions.</p>
<p>But ultimately, there isn’t much to gain from unbundling at the moment, anyway:</p>
<ul>
<li><p>Performance-wise, any effort that you’re planning to make your site less monolithic can go into bundles too; there are some very good tools that allow you to do code-splitting and route-based chunking nowadays, so that you end up with several smaller bundles, rather than a single massive one.</p>
</li>
<li><p>Developer ergonomics-wise, deploying an unbundled version is more work, not less: you’re still going to need a bundled version, for compatibility, and you’ll need to create and inject the preload/push list for the unbundled one.</p>
</li>
</ul>
<h2 id="next-steps">Next steps</h2>
<p>Once Chrome and Firefox have fixed the outstanding issues, I’d like to revisit this benchmark and analyse how much variability there is between browsers. As for Edge, I’m hoping to get a test setup for running this benchmark sometime soon — although it could be a case of finding out that there are bugs there too.</p>
<p><strong>Edit (2017–07–19):</strong> The Chrome bug has since been fixed.</p>


  </div>

  <div class="post-tags">
      <span class="post-tags-head">Tags:&nbsp;</span>
      <div class="post-tags-list">
        
          modules
        
          javascript
        
          bundling
        
      </div>
  </div>
</article>

    </main>

    <footer class="footer">
  <div class="footer-contents">
    <img class="footer-avatar" src="/assets/images/avatar.jpg" alt="Author's avatar">

    <div class="footer-text">
      <h2 class="footer-heading">Hey there!</h2>
      <p class="footer-description">I’m Sérgio, and I work with Web frontend code. Sometimes I write about it here.</p>
    </div>

    <div class="footer-icons">
      <div class="footer-icons-row">
        <a href="https://twitter.com/sergiomdgomes" class="footer-bubble footer-twitter" aria-label="Author's Twitter page"></a>
        <a href="mailto:mail@sgom.es" class="footer-bubble footer-email" aria-label="Author's email address"></a>
      </div>
      <div class="footer-icons-row">
        <a href="/feed.xml" class="footer-bubble footer-feed" aria-label="Atom feed for this site"></a>
        <a href="https://github.com/sgomes" class="footer-bubble footer-github" aria-label="Author's GitHub profile'"></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copyright">Articles under
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons 4.0 Attribution</a>,
    code under <a rel="license" href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>
    (unless otherwise indicated).</div>
  </div>
</footer>


    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function(err) {
          console.log('Service worker registration failed: ', err);
        });
      }
    </script>

  </body>

</html>
