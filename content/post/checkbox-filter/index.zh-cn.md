---
title: 巧用属性选择器纯CSS实现筛选器
description: 通过:has()伪类和属性选择器纯CSS实现筛选器
slug: checkbox-filter
date: 2024-10-18 00:00:00+0000
image: cover.zh-cn.webp
categories:
    - technology
    - CSS
tags:
    - HTML
    - CSS
weight: 1
---
> 文章在个人网站中发布，原文链接：[巧用属性选择器纯CSS实现筛选器](https://blog.zhoujump.com/p/checkbox-filter/)

## 先看看这个样例的效果
<div class="filter">
	<input checked type="radio" name="filter" id="all"/>
	<label for="all">所有</label>
	<input type="radio" name="filter" id="yellow"/>
	<label for="yellow">黄色</label>
	<input type="radio" name="filter" id="red"/>
	<label for="red">红色</label>
	<input type="radio" name="filter" id="green"/>
	<label for="green">绿色</label>
	<input type="radio" name="filter" id="purple"/>
	<label for="purple">紫色</label>
</div>
<div class="fruit-cont">
	<div c="r">🍉</div><div c="y">🍊</div><div c="g">🍈</div>
	<div c="p">🍇</div><div c="g">🥝</div><div c="y">🍋</div>
	<div c="y">‍🍌</div><div c="y">🍍</div><div c="y">🥭</div>
	<div c="r">🍎</div><div c="g">🍏</div><div c="g">🍐</div>
	<div c="r">🍑</div><div c="r">🍒</div><div c="r">🍓</div>
	<div c="p">🫐</div><div c="r">‍🍅</div><div c="g">🫒</div>
</div>
<style>
	.filter{display: flex;cursor: pointer;user-select: none;}
	.filter label{
		width: calc(25% - 12px);
		box-sizing: border-box;
		margin: 6px;
		height: 40px;
		line-height: 36px;
		text-align: center;
		border-radius: 8px;
		border: 2px solid;
	}
	.filter input{display: none;}
	.fruit-cont{display: flex;flex-wrap: wrap;}
	.fruit-cont div{
		display: none;
		width: calc(25% - 12px);
		box-sizing: border-box;
		margin: 6px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 30px;
		text-shadow: 0 0 6px white;
		border-radius: 8px;
	}
	.filter:has(>#yellow:checked) ~ .fruit-cont div[c="y"]{display: block}
	.filter:has(>#green:checked) ~ .fruit-cont div[c="g"]{display: block}
	.filter:has(>#red:checked) ~ .fruit-cont div[c="r"]{display: block}
	.filter:has(>#purple:checked) ~ .fruit-cont div[c="p"]{display: block}
	.filter:has(>#all:checked) ~ .fruit-cont div{display: block}
	.fruit-cont div[c="r"]{background-color: #e74c3c}
	.fruit-cont div[c="g"]{background-color: #2ecc71}
	.fruit-cont div[c="p"]{background-color: #9b59b6}
	.fruit-cont div[c="y"]{background-color: #f39c12 }
	.filter label[for="red"]{border-color: #e74c3c;color: #e74c3c;}
	.filter label[for="green"]{border-color: #2ecc71;color: #2ecc71;}
	.filter label[for="purple"]{border-color: #9b59b6;color: #9b59b6;}
	.filter label[for="yellow"]{border-color: #f39c12 ;color: #f39c12 ;}
	.filter label[for="all"]{border-color: black;color: black ;}
	.filter input:checked + label[for="red"]{background-color: #e74c3c;color: white;}
	.filter input:checked + label[for="green"]{background-color: #2ecc71;color: white;}
	.filter input:checked + label[for="purple"]{background-color: #9b59b6;color: white;}
	.filter input:checked + label[for="yellow"]{background-color: #f39c12 ;color: white;}
	.filter input:checked + label[for="all"]{background-color: black ;color: white;}
</style>

## `:has()`伪类与属性选择器
我们通过下边这个小案例来了解一下这俩选择器
### 属性选择器
<div linkto='box1'>我是</div>
<div linkto='box2'>我是</div>
<style>
	div[linkto='box1']:hover::after{content:'box1'}
	div[linkto='box2']:hover::after{content:'box2'}
</style>

```html
<!-- 鼠标摸在它们上边会被添加伪元素 -->
<div linkto='box1'>我是</div>
<div linkto='box2'>我是</div>
<style>
	div[linkto='box1']:hover::after{content:'box1'}
	div[linkto='box2']:hover::after{content:'box2'}
</style>
```
在这个例子中，两个div没有任何类名，不过都被赋予了一个自定义属性`linkto`。我们可以借此通过`[linkto='box1']`来选中他们，赋予伪元素。
#### 如何使用
除了这个例子中的完全匹配某个属性值，属性选择器还有很多其它用法：
##### 匹配属性名称
`img[alt]`

这个选择器会选择所有拥有alt属性的img元素，无论alt内容是什么。
##### 完全匹配属性
`img[hidden="true"]`

这个选择器会选择所有拥有hidden属性并且属性值为true的img元素，我们为这个选择器添加`display：none`样式就能方便的隐藏元素了。
##### 匹配存在某个属性值
`img[tag~="hd"]`

这个选择器能找到所有拥有tag属性且存在hd这个属性值的img元素，例如上边这个选择器能选中`<img tag="hd cover"/>`、`<img tag="sport football hd"/>`这些元素。
##### 匹配拥有某个前缀的属性值
匹配前缀有两种方式：
`span[lang|="zh"]`

这个选择器能选择所有lang属性值以'zh-'开头的span元素，例如`<span lang="zh-TW">`、`<span lang="zh-CN">`。

`img[type^="low"]`

这个选择器可以选择所有type属性以'low'开头的img元素，例如`<img type="lowPower"/>`、`<img type="lowLevel"/>`。它与上边的区别是可以匹配不使用'-'来分割的单词。
##### 匹配拥有某个后缀的属性值
`img[type$="ball"]`

这个选择器可以选择所有type属性以'ball'结尾的img元素，例如`<img type="football"/>`、`<img type="basketball"/>`。
##### 匹配含有某个字符串的属性值
`img[type*="0"]`

这个选择器可以选择所有type属性包含'0'的img元素，例如`<img type="110"/>`、`<img type="4008208820"/>`。

### `:has()`伪类
<div class="cont-box">
	<div linkto='box3'>我是</div>
	<div linkto='box4'>我是</div>
</div>
<div class="disply-box"></div>
<style>
	.cont-box:has(>[linkto="box3"]:hover) + .disply-box::after{content:'box3'}
	.cont-box:has(>[linkto="box4"]:hover) + .disply-box::after{content:'box4'}
</style>

```html
<div class="cont-box">
	<!-- 摸在这些盒子上，下边的disply-box将会显示伪元素 -->
	<div linkto='box3'>我是</div>
	<div linkto='box4'>我是</div>
</div>
<div class="disply-box"></div>
<style>
	.cont-box:has(>[linkto="box3"]:hover) + .disply-box::after{content:'box3'}
	.cont-box:has(>[linkto="box4"]:hover) + .disply-box::after{content:'box4'}
</style>
```
因为被hover的元素被cont-box包裹了，直接通过后续兄弟选择器无法选择到父亲的兄弟。我们可以通过给父亲`:has()`伪类来间接选择。
#### 关于`:has()`选择器
当括号内的选择器成立时，该伪类就会生效。

`h1:has(+ p)`

这个例子中，将相邻兄弟选择器放入。当某个h1标签后边紧跟着一个p标签，那么这个伪类就会生效。这样你可以给p标签前边的h1标签赋予样式而其它h1标签不受影响。

`.cont-box:has(>[linkto="box4"]:hover)`

我们解读一下例子里的选择器;括号里的内容是`>[linkto="box4"]:hover`，意思是存在某个子元素，这个子元素的linkto属性值为box4，并且正在被鼠标摸着。再搭配:has()伪类，就是找到存在这么个子元素的.cont-box，为其赋予样式。
## 完整代码
```html
<div class="filter">
	<input checked type="radio" name="filter" id="all"/>
	<label for="all">所有</label>
	<input type="radio" name="filter" id="yellow"/>
	<label for="yellow">黄色</label>
	<input type="radio" name="filter" id="red"/>
	<label for="red">红色</label>
	<input type="radio" name="filter" id="green"/>
	<label for="green">绿色</label>
	<input type="radio" name="filter" id="purple"/>
	<label for="purple">紫色</label>
</div>
<div class="fruit-cont">
	<div c="r">🍉</div><div c="y">🍊</div><div c="g">🍈</div>
	<div c="p">🍇</div><div c="g">🥝</div><div c="y">🍋</div>
	<div c="y">‍🍌</div><div c="y">🍍</div><div c="y">🥭</div>
	<div c="r">🍎</div><div c="g">🍏</div><div c="g">🍐</div>
	<div c="r">🍑</div><div c="r">🍒</div><div c="r">🍓</div>
	<div c="p">🫐</div><div c="r">‍🍅</div><div c="g">🫒</div>
</div>
<style>
	.filter{display: flex;cursor: pointer;user-select: none;}
	.filter label{
		width: calc(25% - 12px);
		box-sizing: border-box;
		margin: 6px;
		height: 40px;
		line-height: 36px;
		text-align: center;
		border-radius: 8px;
		border: 2px solid;
	}
	.filter input{display: none;}
	.fruit-cont{display: flex;flex-wrap: wrap;}
	.fruit-cont div{
		display: none;
		width: calc(25% - 12px);
		box-sizing: border-box;
		margin: 6px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 30px;
		text-shadow: 0 0 6px white;
		border-radius: 8px;
	}
	.filter:has(>#yellow:checked) ~ .fruit-cont div[c="y"]{display: block}
	.filter:has(>#green:checked) ~ .fruit-cont div[c="g"]{display: block}
	.filter:has(>#red:checked) ~ .fruit-cont div[c="r"]{display: block}
	.filter:has(>#purple:checked) ~ .fruit-cont div[c="p"]{display: block}
	.filter:has(>#all:checked) ~ .fruit-cont div{display: block}
	.fruit-cont div[c="r"]{background-color: #e74c3c}
	.fruit-cont div[c="g"]{background-color: #2ecc71}
	.fruit-cont div[c="p"]{background-color: #9b59b6}
	.fruit-cont div[c="y"]{background-color: #f39c12 }
	.filter label[for="red"]{border-color: #e74c3c;color: #e74c3c;}
	.filter label[for="green"]{border-color: #2ecc71;color: #2ecc71;}
	.filter label[for="purple"]{border-color: #9b59b6;color: #9b59b6;}
	.filter label[for="yellow"]{border-color: #f39c12 ;color: #f39c12 ;}
	.filter label[for="all"]{border-color: black;color: black ;}
	.filter input:checked + label[for="red"]{background-color: #e74c3c;color: white;}
	.filter input:checked + label[for="green"]{background-color: #2ecc71;color: white;}
	.filter input:checked + label[for="purple"]{background-color: #9b59b6;color: white;}
	.filter input:checked + label[for="yellow"]{background-color: #f39c12 ;color: white;}
	.filter input:checked + label[for="all"]{background-color: black ;color: white;}
</style>
```
## 相关知识
[:has()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has)<br/>
[属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

