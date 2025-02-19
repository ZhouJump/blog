---
title: Pure CSS to implement circular progress bar
description: Use conical gradient and CSS variables to implement circular progress bar
slug: circular-progression
date: 2024-12-15 00:00:00+0000
image: cover.png
categories:
- technology
tags:
- CSS
- HTML
weight: 1
---

## See the effect first
This circular progress bar is made with pure CSS and uses CSS variables to control the progress. You can open the developer tool, select it and change its inline CSS variable `--progress: 60`, and both the progress and content will change.

<div class="demo-process" style="--progress: 60"> <div class="demo-process-inner"></div> </div> <style> style[contenteditable]{ display: block; outline: none; } .demo-process{ margin: auto; position: relative; width: 200px; height: 200px; border-radius: 50%; padding: 16px; background: #99e6ff; background: conic-gradient( #99e6ff 0%, #99e6ff calc(var(--progress) * 1%), transparent 0%); } .demo-process::after{ content: ''; position: absolute; left: calc(50% - 10px); top: calc(50% - 10px); width: 16px; height: 16px; border-radius: 50%; transform: rotate(calc(3.6deg * var(--progress))) translateY(-92px); background: white; background: var(--card-background); border: 4px solid #99e6ff;; } .demo-process::before{ content: ''; position: absolute; left: calc(50% - 8px); top: 0; width: 16px; height: 16px; border-radius: 50%; background: #99e6ff; } .demo-process-inner{ width: 100%; height: 100%; border-radius: 50%; background: white; display: flex; justify-content: center; align-items: center; background: var(--card-background);
}
.demo-process-inner::before{
counter-reset: process var(--progress);
content: counter(process)'%';
font-size: 30px;
color: #99e6ff;
}
</style>

## CSS variables
CSS variables are a new feature introduced in CSS3, which allows you to define a variable. You can define a CSS variable through `--variable name` and use it through `var(--variable name)`.
The following small demo shows how to use CSS variables. You can open the developer tools and play with it.

<div class="demo-var" style="--color:red">My color is controlled by CSS variables</div>
<style>
.demo-var{
color: var(--color);
}
</style>

```html
<!-- Define CSS variable color in style -->
<div class="demo-var" style="--color:red">
My color is controlled by CSS variables
</div>
<style>
.demo-var{
/* Use color here */
color: var(--color);
}
</style>
```

We use a little trick here. Use CSS counter to display CSS variables. The number in the middle of the ring is displayed like this. You can open the developer tool and play with the small demo below.

<div class="demo-num" style="--num:100"></div>
<style>
.demo-num::after{
counter-reset: num var(--num);
content: 'The value of num is:' counter(num);
}
</style>

```html
<div class="demo-var" style="--num:100"></div>
<style>
.demo-num::after{
/* Reset the num counter to the css variable you set */
counter-reset: num var(--num);
/* Use the counter again to display it in disguise, but this method can only display numbers */
content: 'The value of num is:' counter(num);
}
</style>

```

## Cone gradient
Using a conical gradient can produce a pizza shape, which is the key to our circular progress bar.

<div class="demo-conic" style="--progress:60"></div>
<style>
.demo-conic{
margin: auto;
position: relative;
width: 200px;
height: 200px;
border-radius: 50%;
background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
}
</style>

```html
<!-- We define a CSS variable by copying the same method -->
<div class="demo-conic" style="--progress:60"></div>
<style>
.demo-conic{
margin: auto;
position: relative;
width: 200px;
height: 200px;
border-radius: 50%;
/* Use CSS variables here and convert them to percentages through calc(var(--progress) * 1%) */
background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
}
</style>
```

The next step is very simple. We use a white circle to cover the conical gradient, and then use the trick mentioned above to display the progress number, so that we can get a circular progress bar.

## Complete code
```html
<!-- Create a progress bar container and define CSS variables -->
<div class="demo-process" style="--progress: 60">
    <!-- Add another circle inside to cover the pizza to form a ring -->
    <div class="demo-process-inner"></div>
</div>

<style>
.demo-process{
    margin: auto;
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 16px;
    /* Use CSS variables to generate a pizza shape */
    background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
}
.demo-process::after{
    /* Let's make a small circle to beautify the progress bar */
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    /* Control the position of the small circle through css variables to make it follow the progress */
    transform: rotate(calc(3.6deg * var(--progress))) translateY(-92px);
    /* background: white; The css variable here is to adapt to the night mode, you can just use white*/
    background: var(--card-background);
    border: 4px solid #99e6ff;;
}
.demo-process::before{
    /* This is also used to beautify the progress bar */
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #99e6ff;
}
.demo-process-inner{
    /* Inner circle to cover the pizza */
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: white; This is also to adapt to the night mode, you can just use white*/
    background: var(--card-background);
}
.demo-process-inner::before{
    /* Display progress numbers */
    counter-reset: process var(--progress);
    content: counter(process)'%';
    font-size: 30px;
    color: #99e6ff;
}
</style>
```

## Related knowledge
[css variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)<br/>
[conic gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)<br/>
[css counter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters)
