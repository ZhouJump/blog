---
title: Pure CSS Rating Component
description: Flexible use of sibling selectors with <input type="radio"> Pure CSS Rating Component
slug: input-star
date: 2024-09-25 00:00:00+0000
image: cover.jpeg
categories:
- technology
tags:
- HTML
- CSS
weight: 1
---
## See the effect first
The following is a rating component implemented purely by CSS. Click on the star to rate. Different ratings will display different colors.
<div class="cont"> <input class="radio" name="star" id="star1" type="radio"> <input class="radio" name="star" id="star2" type="radio"> <input class="radio" name="star" id="star3" type="radio"> <input class="radio" name="star" id="star4" type="radio"> <input class="radio" name="star" id="star5" type="radio"> <label class="label" for="star1">★</label> <label class="label" for="star2">★</label> <label class="label" for="star3">★</label> <label class="label" for="star4">★</label> <label class="label" for="star5">★</label> </div> <style> .cont{ position: relative; display: flex; } .radio{ display: none; } .label{ color: #ccc; transition-duration:.3s; font-size: 24px; scale:.9; } #star1:checked ~ .label:nth-child(6), #star2:checked ~ .label:nth-child(-n+7) { color:#515A5A; transition-duration:.3s; scale: 1; } #star3:checked ~ .label:nth-child(-n+8), #star4:checked ~ .label:nth-child(-n+9){ color:#3498db; transition-duration:.3s; scale: 1; } #star5:checked ~ .label{ color:#f1c40f; transition-duration:.3s; scale: 1; }
</style>

This component is an upgraded version of the article [Realize option selection effect without using js](https://blog.zhoujump.club/p/checked-css/). Some prerequisite knowledge is mentioned in it. Students who are interested can read this article first.

## Subsequent sibling selector `~`
In the article [Realize option selection effect without using js](https://blog.zhoujump.club/p/checked-css/), we used the adjacent sibling selector `+`, which can select the next element of the target element. But in the above case, we hope that when clicking on the star, all the stars will become selected. At this time, we need to use the subsequent sibling selector `~`, which can select all the sibling elements after the target element.

Let's look at this simple example:

<div class="cont">
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
</div>
<style>
.star{
color: lightgray;
font-size: 24px;
}
.star:hover ~ .star{
color: gold;
font-size: 24px;
}
</style>

```html
<div class="cont">
<!-- Here we put five stars -->
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
<span class="star">★</span>
</div>
<style>
.star{//Set the default style for the star
color: lightgray;
font-size: 24px;
}
.star:hover ~ .star{//When the mouse moves over a star, all the stars behind it will be selected and set to gold
color: gold;
font-size: 24px;
}
</style>
```
## Let's get started
Combining the previous case, we add `<input class="radio">`, and then replace `<span>★</span>` with `<label>★</label>`, it seems that victory is just around the corner.

The complete code of the rating component example is as follows:
```html
<div class="cont">
    <!-- We first create five inputs, which must be placed in front of the stars to facilitate the use of subsequent sibling selectors to select stars -->
    <input class="radio" name="star" id="star1" type="radio">
    <input class="radio" name="star" id="star2" type="radio">
    <input class="radio" name="star" id="star3" type="radio">
    <input class="radio" name="star" id="star4" type="radio">
    <input class="radio" name="star" id="star5" type="radio">
    <!-- Create five more stars and use for binding with the five inputs above -->
    <label class="label" for="star1">★</label>
    <label class="label" for="star2">★</label>
    <label class="label" for="star3">★</label>
    <label class="label" for="star4">★</label>
    <label class="label" for="star5">★</label>
</div>
<style>
.cont{//Use flexible layout to arrange the stars horizontally
    position: relative;
    display: flex;
}
.radio{//Tool input is still hidden
    display: none;
}
.label{//Set the default style for the stars
    color: #ccc;
    transition-duration:.3s;
    font-size: 24px;
    scale:.9;
}
#star1:checked ~ .label:nth-child(6),
#star2:checked ~ .label:nth-child(-n+7)
{//When #star1 is selected by the user, find all the .labels behind it
    //Use the child selector to select the 6th element (the first five are input) and set its color
    color:#515A5A;
    transition-duration:.3s;
    scale: 1;
}
#star3:checked ~ .label:nth-child(-n+8),
#star4:checked ~ .label:nth-child(-n+9)
{//Follow the same method, set the third and fourth stars to blue
    color:#3498db;
    transition-duration:.3s;
    scale: 1;
}
#star5:checked ~ .label
{//The last star does not need a child selector, just select all the stars and set them to gold
    color:#f1c40f;
    transition-duration:.3s;
    scale: 1;
}
</style>
```

So we have completed this rating component that does not require js, and can even submit ratings normally without using js. Isn’t it simple?
