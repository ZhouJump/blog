---
title: 纯css实现环形进度条
description: 借助锥形渐变与css变量实现环形进度条
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

## 先看效果
这个环形进度条使用纯css制作，使用css变量控制进度，你可以打开开发者工具选中它改变它内联的css变量`--progress: 60`，进度和内容均会发生变化。


<div class="demo-process" style="--progress: 60">
    <div class="demo-process-inner"></div>
</div>

<style>
    style[contenteditable]{
        display: block;
        outline: none;
    }
    .demo-process{
        margin: auto;
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        padding: 16px;
        background: #99e6ff;
        background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
    }
    .demo-process::after{
        content: '';
        position: absolute;
        left: calc(50% - 12px);
        top: calc(50% + 2px);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transform: rotate(calc(3.6deg * var(--progress))) translateY(-108px);
        background: white;
        //background: var(--card-background);
        border: 4px solid #99e6ff;;
    }
    .demo-process::before{
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
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        //background: var(--card-background);
    }
    .demo-process-inner::before{
        counter-reset: process var(--progress);
        content: counter(process)'%';
        font-size: 30px;
        color: #99e6ff;
    }
</style>

## CSS变量
CSS变量是css3引入的新特性，它允许你定义一个变量。你可以通过`--变量名`来定义一个css变量，通过`var(--变量名)`来使用它。
下边这个小demo展示了如何使用css变量。你可以打开开发者工具摆弄一下。

<div class="demo-var" style="--color:red">我的颜色由css变量控制</div>
<style>
    .demo-var{
        color: var(--color);
    }
</style>

```html
<!-- 在style内定义了css变量color -->
<div class="demo-var" style="--color:red">
    我的颜色由css变量控制
</div>
<style>
    .demo-var{
        /* 在此处使用color */
        color: var(--color);
    }
</style>
```






我们此处使用了一个小技巧。通过css计数器来显示css变量，环形中间的数字就是这样显示的，你可以打开开发者工具摆弄一下下边的小demo。

<div class="demo-num" style="--num:100"></div>
<style>
    .demo-num::after{
        counter-reset: num var(--num);
        content: 'num的值是：'counter(num);
    }
</style>

```html
<div class="demo-var" style="--num:100"></div>
<style>
    .demo-num::after{
        /* 将num计数器重置为你设置的css变量 */
        counter-reset: num var(--num);
        /* 再使用计数器，就变相显示了它，不过这种方法只能显示数字 */
        content: 'num的值是：'counter(num);
    }
</style>
```

## 锥型渐变
使用锥型渐变可以产生一个披萨形状，这是我们环形进度条的关键。

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
<!-- 我们照葫芦画瓢定义一个css变量 -->
<div class="demo-conic" style="--progress:60"></div>
<style>
    .demo-conic{
        margin: auto;
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        /* 在此处使用css变量，通过calc(var(--progress) * 1%)将其转化为百分比 */
        background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
    }
</style>
```

接下来要做的就很简单了，我们使用一个白色的圆来覆盖锥型渐变，再通过前边说的小技巧显示进度数字，这样我们就可以得到一个环形进度条了。

## 完整代码
```html
<!-- 创建进度条容器并定义css变量 -->
<div class="demo-process" style="--progress: 60">
    <!-- 内部再来个圆遮住披萨形成环形 -->
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
        /* 用css变量产生一个披萨形 */
        background: conic-gradient( #99e6ff 0%,#99e6ff calc(var(--progress) * 1%),transparent 0%);
    }
    .demo-process::after{
        /* 我们弄一个小圆来美化进度条 */
        content: '';
        position: absolute;
        left: calc(50% - 12px);
        top: calc(50% + 2px);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        /* 通过css变量控制小圆的位置，使他跟随进度 */
        transform: rotate(calc(3.6deg * var(--progress))) translateY(-108px);
        /* background: white; 此处css变量是为了适配夜间模式，你直接使用白色即可*/
        background: var(--card-background);
        border: 4px solid #99e6ff;;
    }
    .demo-process::before{
        /* 此处也是用于美化进度条 */
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
        /* 内部的用于遮住披萨的圆 */
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: white; 此处也是为了适配夜间模式，你直接使用白色即可*/
        background: var(--card-background);
    }
    .demo-process-inner::before{
        /* 显示进度的数字 */
        counter-reset: process var(--progress);
        content: counter(process)'%';
        font-size: 30px;
        color: #99e6ff;
    }
</style>
```

## 相关知识
[css变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)<br/>
[锥型渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)<br/>
[css计数器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters)

