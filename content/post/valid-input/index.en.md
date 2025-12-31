---
title: Pure CSS to achieve a cool input box effect
description: Through the :valid pseudo-class and the required attribute, pure CSS realizes a dynamic label input box
slug: valid_input
date: 2024-10-22 00:00:00+0000
image: cover.en.webp
categories:
- technology
- CSS
tags:
- CSS
- HTML
weight: 1
---

> Original article: [Pure CSS to achieve a cool input box effect](https://blog.zhoujump.club/en/p/valid-input/)

## See the effect first

<div class="demo-input">
<input required/>
<label>username</label>
</div>
<style>
.demo-input{
position: relative;
height: 40px;
width: 300px;
margin: 8px;
}
.demo-input *{transition-duration: 100ms}
.demo-input input{
width: 100%;
height: 100%;
box-sizing: border-box; border: 2px solid gray; border-radius: 6px; outline: none; padding-left: 10px; font-size: 20px; color: #006080; } .demo-input input:valid, .demo-input input:focus {border: 2px solid #006080} .demo-input label{ position: absolute; top:0; left: 10px; font-size: 20px; color: gray; line-height: 36px; pointer-events: none; } .demo-input input:valid + label, .demo-input input:focus + label { color: #006080; top:-12px; font-size: 18px; padding: 0 4px; background-color: white;
line-height: 18px;
}
</style>

## `:valid` and `:invalid` pseudo-classes
These two pseudo-classes can be used on `input` and `select` elements to select input boxes that have passed or failed validation. Let's learn about them through the following simple example:
This input box will check whether the input is an email address, otherwise the background color will be red warning.

<input value="x@zhoujump.club" class="demo-input-2" type="email"/>
<style>
.demo-input-2:invalid{background:red}
</style>

The code is also very simple:
``` html
<input class="demo-input-2" type="email"/>
<style>
//The invalid pseudo-class can select inputs that cannot pass the validation
.demo-input-2:invalid{background:red}
</style>
```
## `required` attribute
This attribute can be used on `input` and `select` elements to indicate that this input box is required. If left blank, it will fail the validation and can be selected by the `:invalid` pseudo-class, otherwise it will be selected by `:valid`, for example:
This input box cannot be left blank, otherwise the background color will be red warning.

<input value="123456" class="demo-input-3" type="text" required/>
<style>
.demo-input-3:invalid{background:red}
</style>

``` html
<input class="demo-input-3" type="email"/>
<style>
.demo-input-2:invalid{background:red}
</style>
```
## `pattern` attribute
This attribute can be used on `input` and `select` elements. Its attribute value needs to be filled in with a regular expression. If the content of the input box does not match the regular expression, it can be selected by the `:invalid` pseudo-class, otherwise it will be selected by `:valid`. For example:
This input box can only enter six digits, otherwise the background color will be red warning.

<input value="123456" class="demo-input-4" type="text" pattern="\d{6,6}"/>
<style> .demo-input-4:invalid{background:red} </style>

``` html
<input class="demo-input-4" type="email"/> <style> .demo-input-4:invalid{background:red} </style> 
```
## Complete code 
```html
<div class="demo-input">
    <input required/>
    <label>username</label>
</div>
<style>
    .demo-input{
        position: relative; height: 40px; width: 300px; margin: 8px;
    }
    .demo-input *{
        transition-duration: 100ms
    }
    .demo-input input{
        width: 100%; height: 100%;
        box-sizing: border-box;
        border: 2px solid gray;
        border-radius: 6px;
        outline: none;
        padding-left: 10px;
        font-size: 20px;
        color: #006080; }
    .demo-input input:valid, .demo-input input:focus {
        border: 2px solid #006080
    }
    .demo-input label{
        position: absolute;
        top:0;
        left: 10px;
        font-size: 20px;
        color: gray;
        line-height: 36px;
        pointer-events: none;
    }
    .demo-input input:valid + label, .demo-input input:focus + label {
        color: #006080;
        top:-12px;
        font-size: 18px;
        padding: 0 4px;
        background-color: white;
        line-height: 18px;
    }
</style>
```
## Related knowledge
[Form data validation](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation)<br/>
[:valid pseudo-class](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)<br/>
[:invalid pseudo-class](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)<br/>
[required attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#required)<br/>
[pattern attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#pattern)
