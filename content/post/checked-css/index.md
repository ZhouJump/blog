---
title: 纯CSS实现选项选择效果
description: 灵活使用checked伪类选择器实现元素单选多选效果
slug: checked-css
date: 2024-09-25 00:00:00+0000
image: cover.jpg
categories:
    - technology
tags:
    - HTML
    - CSS
weight: 1
---
## 先看效果
你可以通过点击来切换不同的选项，而这个样例没有使用js而是完全使用css实现的。
<div class="cont">
    <input class="input" checked type="radio" id="radio1" name="radio"/>
    <label class="label" for="radio1">选项1</label>
    <input class="input" type="radio" id="radio2" name="radio"/>
    <label class="label" for="radio2">选项2</label>
    <input class="input" type="radio" id="radio3" name="radio"/>
    <label class="label" for="radio3">选项3</label>
    <input class="input" type="radio" id="radio4" name="radio"/>
    <label class="label" for="radio4">选项4</label>
</div>
<style>
    .cont{
        display: flex;
        line-height: 120px;
        text-align: center;
    }
    .label{
        margin-right: 10px;
        width: 60px;
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

## :checked伪类选择器
实现这个效果的核心是:checked伪类选择器。这个选择器可以匹配被用户点击的元素，也就是说我们能为用户选择的元素单独设置样式。

废话不多说，直接上代码。
```html
    <div class="cont">
        <!-- 首先创建input元素，虽然它不会显示，但是我们需要它才能使元素可以被选择 -->
        <input checked type="radio" id="radio1" name="radio"/>
        <!-- 然后在input后紧接着一个lable，通过for属性与上边的input绑定，这样点击这个lable就等价于点击了input -->
        <label for="radio1">选项1</label>
        <!-- 如法炮制几个选项 -->
        <input type="radio" id="radio2" name="radio"/>
        <label for="radio2">选项2</label>
        <input type="radio" id="radio3" name="radio"/>
        <label for="radio3">选项3</label>
        <input type="radio" id="radio4" name="radio"/>
        <label for="radio4">选项4</label>
    </div>
    <style>
        .cont{
            display: flex;//为容器设置弹性布局使其内部元素横向排布。
            line-height: 120px;
            text-align: center;
        }
        label{//这里就是lable的样式啦。
            margin-right: 10px;
            width: 60px;
            height: 120px;
            background: #ccc;
            border-radius: 10px;
            transition-duration:.3s;
        }
        input{
            display: none;//隐藏input元素，它只是工具人而已。
        }
        input:checked + label{//使用checked找到被用户点击的input，再通过+相邻兄弟选择器选择到这个input后紧挨着的lable，为它设置样式。
            transition-duration:.3s;
            width: 120px;
            background:#99e6ff;
            color:#006080;
        }
    </style>
```
在上边的代码中我们利用了`<input type="radio">`可以被用户点击的特性，然后再将`lable`元素与其绑定并放置在其后边。这样不仅可以通过点击`lable`来选中`input`，还能使用相邻兄弟选择器通过` input`来选中`lable`。
此时作为工具人的`input`元素就能从页面中隐藏了，我们只需要为可操作性更强的`lable`元素设计样式即可。
使用这种技巧能实现的效果能远超你的想象。

## 相关知识
[input的radio类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/radio);

[:checked伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked);

[相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Next-sibling_combinator);

[lable及其for属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label#%E5%B1%9E%E6%80%A7)