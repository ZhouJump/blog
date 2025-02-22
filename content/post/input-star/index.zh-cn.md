---
title: 纯CSS实现评分组件
description: 灵活使用兄弟选择器搭配<input type="radio">纯CSS实现评分组件
slug: input-star
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
以下是一个纯靠css实现的评分组件，点击星星即可评分，不同的评分将会展示不同的颜色。
<div class="cont">
    <input class="radio" name="star" id="star1" type="radio">
    <input class="radio" name="star" id="star2" type="radio">
    <input class="radio" name="star" id="star3" type="radio">
    <input class="radio" name="star" id="star4" type="radio">
    <input class="radio" name="star" id="star5" type="radio">
    <label class="label" for="star1">★</label>
    <label class="label" for="star2">★</label>
    <label class="label" for="star3">★</label>
    <label class="label" for="star4">★</label>
    <label class="label" for="star5">★</label>
</div>
<style>
    .cont{
        position: relative;
        display: flex;
    }
    .radio{
        display: none;
    }
    .label{
        color: #ccc;
        transition-duration:.3s;
        font-size: 24px;
        scale:.9;
    }
    #star1:checked ~ .label:nth-child(6),
    #star2:checked ~ .label:nth-child(-n+7)
    {
        color:#515A5A;
        transition-duration:.3s;
        scale: 1;
    }
    #star3:checked ~ .label:nth-child(-n+8),
    #star4:checked ~ .label:nth-child(-n+9){
        color:#3498db;
        transition-duration:.3s;
        scale: 1;
    }
    #star5:checked ~ .label{
        color:#f1c40f;
        transition-duration:.3s;
        scale: 1;
    }
</style>

这个组件是[不使用js实现选项选择效果](https://blog.zhoujump.club/p/checked-css/)这篇文章的升级版本，一些前置知识其中有提到，感兴趣的同学可以先看看这篇文章。

## 后续兄弟选择器`~`
[不使用js实现选项选择效果](https://blog.zhoujump.club/p/checked-css/)这篇文章中我们使用了相邻兄弟选择器`+`,它可以选择到目标元素的下一个元素。但是上边这个案例中，我们希望点击星星的时候，所有的星星都变成选中状态，这时候就需要用到后继兄弟选择器`~`了，它可以选择到目标元素之后的所有兄弟元素。

让我们看看这个简单的案例：

<div class="cont">
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
    <!-- 此处我们放了五颗星星 -->
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
</div>
<style>
    .star{//为星星设置默认样式
        color: lightgray;
        font-size: 24px;
    }
    .star:hover ~ .star{//当鼠标移动到星星上时，将会选中后边的所有星星，将其设为金色
        color: gold;
        font-size: 24px;
    }
</style>
```
## 开干把
结合之前的案例，我们加入`<input class="radio">`,再将`<span>★</span>`换成`<label>★</label>`，似乎胜利就在眼前了。

评分组件案例的全部代码如下：
```html
<div class="cont">
    <!-- 我们先创建五个input，它们必须摆在星星前边，方便使用后续兄弟选择器选中星星 -->
    <input class="radio" name="star" id="star1" type="radio">
    <input class="radio" name="star" id="star2" type="radio">
    <input class="radio" name="star" id="star3" type="radio">
    <input class="radio" name="star" id="star4" type="radio">
    <input class="radio" name="star" id="star5" type="radio">
    <!-- 再创建五个星星并且与上边五个input使用for绑定 -->
    <label class="label" for="star1">★</label>
    <label class="label" for="star2">★</label>
    <label class="label" for="star3">★</label>
    <label class="label" for="star4">★</label>
    <label class="label" for="star5">★</label>
</div>
<style>
    .cont{//使用弹性布局让星星横向排列
        position: relative;
        display: flex;
    }
    .radio{//工具人input还是隐藏掉
        display: none;
    }
    .label{//为星星设置默认样式
        color: #ccc;
        transition-duration:.3s;
        font-size: 24px;
        scale:.9;
    }
    #star1:checked ~ .label:nth-child(6),
    #star2:checked ~ .label:nth-child(-n+7)
    {//当#star1被用户选中时，找到后边的所有.label
    //再使用孩子选择器选中第6个元素(前五个是input)，为其设置颜色
        color:#515A5A;
        transition-duration:.3s;
        scale: 1;
    }
    #star3:checked ~ .label:nth-child(-n+8),
    #star4:checked ~ .label:nth-child(-n+9)
    {//如法泡制，第三四颗星星开始设置蓝色
        color:#3498db;
        transition-duration:.3s;
        scale: 1;
    }
    #star5:checked ~ .label
    {//最后一颗星星就不需要孩子选择器了，直接选中所有星星设置金色
        color:#f1c40f;
        transition-duration:.3s;
        scale: 1;
    }
</style>
```

于是我们就完成了这个不需要js的评分组件，甚至能够不使用js正常提交评分，是不是很简单呢？
