---
title: 不使用js实现循环翻牌效果
description: 巧用z-index与后续兄弟选择器实现循环翻牌效果
slug: index-checked
date: 2024-09-27 00:00:00+0000
image: cover.jpg
categories:
    - technology
tags:
    - CSS
    - HTML
weight: 1 
---

## 先看效果
点击卡片就能切换一张，并且整个实现过程并没有用到js。这个样例中除了两张卡片外其实还有两个透明的`input`，你点击到的其实是这俩`input`，而且这俩`input`会在点击后修改自身的`z-index`属性，保证你下次点击必定会点击到另外一个。

<div class="box">
    <input class="radio1" type="radio" name="card"/>
    <input class="radio2" type="radio" name="card"/>
    <div style="background:#F1948A" class="card1"></div>
    <div style="background:#AED6F1" class="card2"></div>
</div>
<style>
    [class*="card"]{
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
    [class*="radio"]{
        position: absolute;
        width: 200px;
        height: 300px;
        z-index: 2;
        margin: 0;
        opacity: 0;
    }
    .radio1:checked ~ .card1{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
    .radio1:checked ~ .card2{z-index: 1;top:10px;transition-duration:.6s}
    .radio1:checked{z-index: 0;}
    .radio2:checked ~ .card2{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
    .radio2:checked ~ .card1{z-index: 1;top:10px;transition-duration:.6s}
    .radio2:checked{z-index: 0;}
    @keyframes card{
        0%{left:0;z-index:2;top:10px}
        50%{left:230px;z-index:2;rotate:10deg;}
        51%{left:230px;z-index:0;rotate:10deg;}
        100%{left:0;z-index:0;scale:.98;}
    }
</style>

## z-index
我们对元素使用定位(`posation:absolute,fixed,relative`)后，元素之间可能会发生重叠，除了html结构中后来居上的原则外，我们还能使用`z-index`来控制元素的覆盖关系，z-index的值越大，元素越处于顶层。

下面是一个简短的案例：
我们试试点击这两个巨型单选

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
        z-index: 1;//没被选择的单选框z-index为1
    }
    [name="demo1"]:checked{//被选择的单选框z-index为2
        z-index: 2;
    }
</style>
```

被赋予`z-index:2`的元素会覆盖于`z-index:1`的元素之上。如果我们将这两个单选框完全重合，然后赋予被选中的单选框较低的`z-index`,我们就能保证每次被点击的都是未被选中的那个，这就是这个翻牌案例的核心逻辑。

## 开干吧
以下是翻牌案例的全部代码：
```html
<div class="box">
    <!-- 两个input需要放置在卡片之前但是覆盖在卡片之上，我们使用z-index来实现 -->
    <input class="radio1" type="radio" name="card"/>
    <input class="radio2" type="radio" name="card"/>
    <!-- 两张卡片 -->
    <div style="background:#F1948A" class="card1"></div>
    <div style="background:#AED6F1" class="card2"></div>
</div>
<style>
    [class*="card"]{//为卡片设置初始样式
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
    [class*="radio"]{//两个单选框宽度高度均与卡片一致，并且完全透明，然后覆盖在卡片之上
        position: absolute;
        width: 200px;
        height: 300px;
        z-index: 2;
        margin: 0;
        opacity: 0;
    }
    .radio1:checked ~ .card1{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
    .radio1:checked ~ .card2{z-index: 1;top:10px;transition-duration:.6s}
    .radio1:checked{z-index: 0;}//被选择的单选框设置z-index为0
    //这样它被点击后会自己跑到底部去，这样下次点击就会戳到另外一个单选框
    .radio2:checked ~ .card2{animation: card .6s;top:0;scale:.98;transition-duration:.6s}
    //通过后续兄弟选择器选中卡片，这样选中不同的单选框将控制卡片翻一张。
    .radio2:checked ~ .card1{z-index: 1;top:10px;transition-duration:.6s}
    .radio2:checked{z-index: 0;}//与另一个单选框同类
    @keyframes card{//这里定义一个翻牌的动画
        0%{left:0;z-index:2;top:10px}
        50%{left:230px;z-index:2;rotate:10deg;}
        51%{left:230px;z-index:0;rotate:10deg;}
        100%{left:0;z-index:0;scale:.98;}
    }
</style>
```

但是这样似乎只能在两张牌之间翻来翻去，那如何可以增加牌的数量呢。
这时候只需要结合[不使用js实现评分组件](https://blog.zhoujump.club/p/input-star/)中的想法，该案例中选择一颗星星就能选中这颗星星之前的所有星星。同理，我们可以实现选中一个单选框就将它之前的单选框`z-index`值都设为0,选中最后一个单选框后将所有`z-index`重置，以实现循环翻牌。

>当然这个案例的理论意义是大于实际意义的，每增加一张牌都会产生大量的css代码，其实并不如js来的要好。但是这个案例还是可以作为一个很好的案例，来说明`z-index`的用法。

## 相关知识
[z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index);

[@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes);

[animation](@keyframes)

