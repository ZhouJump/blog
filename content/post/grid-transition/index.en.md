---
title: Add transition animation for elements with uncertain height
description: Use grid layout to elegantly implement the transition from fixed height and width to variable width and height (height:auto)
slug: grid-transition
date: 2024-09-24 00:00:00+0000
image: cover.jpg
categories:
  - technology
tags:
  - CSS
  - HTML
weight: 1
---

Sometimes we encounter this situation where the container is stretched by elements and its height cannot be known, but a smooth transition is required. Like this:

<div class="cont">
    <div class="head">Try touching my head with your mouse</div>
    <div class="body">
        I am the content</br>
        I am the content</br>
        I am the content</br>
        I am the content</br>
    </div>
</div>

<style>
    .cont{
    display:grid;
    background:#99e6ff;
    color:#006080;
    grid-template-rows: 30px 0fr;
    border-radius:8px;
    transition: .3s;
    padding:10px;
    line-height:30px;
    margin-bottom:20px;
    }
    .cont:hover{
    grid-template-rows: 30px 1fr;
    transition: .3s;
    
    }
    .body{
    min-height: 0;
    overflow:hidden;
    }
</style>

I believe that CSS beginners have tried this:

``` css
.cont{
height:0;//The initial height is zero
transition: .3s;
}
.cont:hover{
height:auto;//The height is automatic when the mouse is touched
transition: .3s;//Set 0.3 seconds transition
}
```

Then I got a cold shoulder. The height does change when the mouse is touched, but the transition does not take effect. This is because `transition` can only handle transitions between values, and changes between auto - 0 cannot be transitioned.
> Now this transition can be achieved through the `calc-size` attribute. For details, [please see this post](https://segmentfault.com/a/1190000045102391), but the compatibility is not very good at present.

So what can we do? At this time, we need to bring out our `display: grid`. The grid layout can control the **width-to-height ratio** of its internal container through the `fr` unit. That's a coincidence, folks. We just need to change the height ratio between 1 and 0, right?

Below is the code for the head-touching expansion example above:
```html
<div class="cont">
    <div class="head">I will form the head</div>
    <div class="body">
        I am the content</br>
        I am the content</br>
        I am the content</br>
        I am the content</br>
    </div>
</div>

    <style>
        .cont{
            display:grid;//Set grid layout
        background:#99e6ff;
            color:#006080;
            grid-template-rows: 30px 0fr;//Distribute height: head:30px, body:0%
        border-radius:8px;
            transition: .3s;
            padding:10px;
            line-height:30px;
        }
        .cont:hover{
            grid-template-rows: 30px 1fr;//Distribute height: head:30px, body:100%
        transition: .3s;//Set 0.3 seconds transition
        }
        .body{
            min-height: 0;//Set the minimum height, otherwise the text can still stretch the container.
        overflow:hidden;//Set overflow hidden, otherwise the container will be folded and the text will still be there.
        }
    </style>
```

The effect is completed in a simple way. The knowledge about grid layout cannot be explained in a few words. Students who are interested can learn it.

## Reference to this article
[How to make CSS auto height perfectly support transition animation? ](https://juejin.cn/post/7196843994030342200)
