---
title: Pure CSS to achieve the effect of circular flipping
description: Cleverly use z-index and subsequent sibling selectors to achieve the effect of circular flipping
slug: index-checked
date: 2024-09-27 00:00:00+0000
image: cover.jpg
categories:
- technology
- HTML
tags:
- CSS
- HTML
weight: 1
---

> Original article: [Pure CSS to achieve the effect of circular flipping](https://blog.zhoujump.club/en/p/index-checked/)

## See the effect first
Click on the card to switch one, and the entire implementation process does not use js. In addition to the two cards, this sample actually has two transparent `input`s. You actually click on these two `input`s, and these two `input`s will modify their own `z-index` properties after clicking, ensuring that you will definitely click on another one next time you click.

<div class="box"> <input class="radio1" type="radio" name="card"/> <input class="radio2" type="radio" name="card"/> <div style="background:#F1948A" class="cardd1"></div> <div style="background:#AED6F1" class="cardd2"></div> </div> <style> [class*="cardd"]{ width: 200px; height: 300px; position: absolute; border-radius: 16px; box-shadow: 0 0 10px rgba(0,0,0,0.2); transition: all 1s; } .box{ height: 300px; width: 200px; position: relative; } [class*="radio"]{ position: absolute; width: 200px; height: 300px; z-index: 2; margin: 0; opacity: 0; } .radio1:checked ~ .cardd1{animation: card .6s;top:0;scale:.98;transition-duration:.6s} .radio1:checked ~ .cardd2{z-index: 1;top:10px;transition-duration:.6s} .radio1:checked{z-index: 0;} .radio2:checked ~ .cardd2{animation: card .6s;top:0;scale:.98;transition-duration:.6s} .radio2:checked ~ .cardd1{z-index: 1;top:10px;transition-duration:.6s} .radio2:checked{z-index: 0;} @keyframes card{ 0%{left:0;z-index:2;top:10px}
50%{left:230px;z-index:2;rotate:10deg;}
51%{left:230px;z-index:0;rotate:10deg;}
100%{left:0;z-index:0;scale:.98;}
}
</style>

## z-index
After we use positioning (`posation:absolute,fixed,relative`) on elements, the elements may overlap. In addition to the principle of catching up in the html structure, we can also use `z-index` to control the covering relationship of elements. The larger the z-index value, the more the element is at the top.

Here is a short example:
Let's try clicking on these two giant radio buttons

<div>
<input name="demo1" style="width:100px;height:100px;position:relative" type="radio">
<input name="demo1" checked style="width:100px;height:100px;position:relative;right:50px" type="radio">
</div>
<style>
[name="demo1"]{
z-index: 1;
}
[name="demo1"]:checked{
z-index: 2;
}
</style>

```html
<div>
    <input name="demo1"
    style="width:100px;height:100px;position:relative"
    type="radio">
    <input checked
    name="demo1"
    style="width:100px;height:100px;position:relative;right:50px"
    type="radio">
</div>
<style>
    [name="demo1"]{
    z-index: 1;//Unselected radio button z-index is 1
    }
    [name="demo1"]:checked{//Selected radio button z-index is 2
    z-index: 2;
    }
</style>
```

The element assigned `z-index:2` will cover the element of `z-index:1`. If we completely overlap these two radio buttons and assign a lower `z-index` to the selected radio button, we can ensure that the one that is clicked each time is the unselected one. This is the core logic of this flip case.

## Let's get started
The following is the full code for the flip card example:
```html
<div class="box">
    <!-- The two inputs need to be placed before the card but cover it. We use z-index to achieve this -->
    <input class="radio1" type="radio" name="card"/>
    <input class="radio2" type="radio" name="card"/>
    <!-- Two cards -->
    <div style="background:#F1948A" class="card1"></div>
    <div style="background:#AED6F1" class="card2"></div>
</div>
<style>
[class*="card"]{//Set the initial style for the card
    width: 200px;
    height: 300px;
    position: absolute;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    transition: all 1s;
}
.box{
    height: 300px;
    width: 200px;
    position: relative;
}
[class*="radio"]{//The width and height of the two radio buttons are consistent with the card, and they are completely transparent, and then covered on the card
    position: absolute;
    width: 200px;
    height: 300px;
    z-index: 2;
    margin: 0;
    opacity: 0;
}
.radio1:checked ~ .card1{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
.radio1:checked ~ .card2{z-index: 1;top:10px;transition-duration:.6s}
.radio1:checked{z-index: 0;}//The selected radio button sets z-index to 0
//After being clicked, it will automatically move to the bottom, so that the next click will hit another radio button
.radio2:checked ~ .card2{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
//Select the card through the subsequent sibling selector, so that selecting a different radio button will control the card to flip one.
.radio2:checked ~ .card1{z-index: 1;top:10px;transition-duration:.6s}
.radio2:checked{z-index: 0;}//Same as another radio button
@keyframes card{//Define a flip animation here
    0%{left:0;z-index:2;top:10px}
    50%{left:230px;z-index:2;rotate:10deg;}
    51%{left:230px;z-index:0;rotate:10deg;}
    100%{left:0;z-index:0;scale:.98;}
}
</style>
```

But it seems that this can only flip between two cards, so how can we increase the number of cards?
At this time, you only need to combine the ideas in [Realizing the Rating Component without Using JS](https://blog.zhoujump.club/p/input-star/). In this case, selecting a star can select all the stars before this star. Similarly, we can set the z-index value of all the previous radio buttons to 0 when selecting a radio button, and reset all z-index after selecting the last radio button to achieve a cyclic flip.

>Of course, the theoretical significance of this case is greater than the practical significance. Every time a card is added, a lot of css code will be generated, which is not as good as js. But this case can still be used as a good case to illustrate the use of z-index.

## Related knowledge
[z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index);

[@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes);

[animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)
