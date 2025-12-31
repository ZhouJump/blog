---
title: Pure CSS to achieve option selection effect
description: Flexible use of checked pseudo-class selector to achieve single-select and multiple-select element effects
slug: checked-css
date: 2024-09-25 00:00:00+0000
image: cover.webp
categories:
- technology
- CSS
tags:
- HTML
- CSS
weight: 1
---
> Original article: [Pure CSS to achieve option selection effect](https://blog.zhoujump.club/en/p/checked-css/)

## See the effect first
You can switch different options by clicking, and this example does not use js but is completely implemented with css.
<div class="cont"> <input class="input" checked type="radio" id="radio1" name="radio"/> <label class="label" for="radio1">Option 1</label> <input class="input" type="radio" id="radio2" name="radio"/> <label class="label" for="radio2">Option 2</label> <input class="input" type="radio" id="radio3" name="radio"/> <label class="label" for="radio3">Option 3</label> <input class="input" type="radio" id="radio4" name="radio"/> <label class="label" for="radio4">Option 4</label> </div> <style> .cont{ display: flex; line-height: 120px; text-align: center; } .label{ margin-right: 10px; width: 60px;
height: 120px;
background: #ccc;
border-radius: 10px;
transition-duration:.3s;
}
.input{
display: none;
}
.input:checked + .label{
transition-duration:.3s;
width: 120px;
background:#99e6ff;
color:#006080;
}
</style>

## :checked pseudo-class selector
The core of this effect is the :checked pseudo-class selector. This selector can match the element clicked by the user, which means that we can set the style for the element selected by the user separately.

Without further ado, let's get straight to the code.
```html
<div class="cont">
<!-- First create an input element. Although it will not be displayed, we need it to make the element selectable -->
<input checked type="radio" id="radio1" name="radio"/>
<!-- Then add a label after the input, and bind it to the input above through the for attribute, so that clicking this label is equivalent to clicking the input -->
<label for="radio1">Option 1</label>
<!-- Do the same for several options -->
<input type="radio" id="radio2" name="radio"/>
<label for="radio2">Option 2</label>
<input type="radio" id="radio3" name="radio"/>
<label for="radio3">Option 3</label>
<input type="radio" id="radio4" name="radio"/>
<label for="radio4">Option 4</label>
</div>
<style>
.cont{
    display: flex; // Set a flexible layout for the container so that its internal elements are arranged horizontally.
    line-height: 120px;
    text-align: center;
}
label{ // This is the style of the label.
    margin-right: 10px;
    width: 60px;
    height: 120px;
    background: #ccc;
    border-radius: 10px;
    transition-duration:.3s;
}
input{
    display: none; // Hide the input element, it is just a tool.
}
input: checked + label{ // Use checked to find the input clicked by the user, and then use the + adjacent sibling selector to select the label next to this input and set the style for it.
    transition-duration:.3s;
    width: 120px;
    background:#99e6ff;
    color:#006080;
}
</style>
```
In the above code, we take advantage of the fact that `<input type="radio">` can be clicked by users, and then bind the `label` element to it and place it behind it. In this way, not only can `input` be selected by clicking `label`, but also `label` can be selected by `input` using the adjacent sibling selector.
At this time, the `input` element as a tool can be hidden from the page, and we only need to design the style for the more operable `label` element.
The effect achieved by using this technique is far beyond your imagination.

## Related knowledge
[Input radio type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/radio);

[:checked pseudo-class selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked);

[Adjacent sibling selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Next-sibling_combinator);

[label and its for attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label#%E5%B1%9E%E6%80%A7)
