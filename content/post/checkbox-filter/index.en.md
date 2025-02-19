---
title: Cleverly use attribute selectors to implement filters in pure CSS
description: Implement filters in pure CSS through the :has() pseudo-class and attribute selectors
slug: checkbox-filter
date: 2024-10-18 00:00:00+0000
image: cover.jpg
categories:
- technology
tags:
- HTML
- CSS
weight: 1
---
## Take a look at the effect of this example first
<div class="filter">
<input checked type="radio" name="filter" id="all"/>
<label for="all">All</label>
<input type="radio" name="filter" id="yellow"/>
<label for="yellow">Yellow</label>
<input type="radio" name="filter" id="red"/>
<label for="red">Red</label>
<input type="radio" name="filter" id="green"/>
<label for="green">green</label> <input type="radio" name="filter" id="purple"/> <label for="purple">Purple</label> </div> <div class="fruit-cont"> <div c="r">🍉</div><div c="y">🍊</div><div c="g">🍈</div> <div c="p">🍇</div><div c="g">🥝</div><div c="y">🍋</div> <div c="y">‍🍌</div><div c="y">🍍</div><div c="y">🥭</div> <div c="r">🍎</div><div c="g">🍏</div><div c="g">🍐</div> <div c="r">🍑</div><div c="r">🍒</div><div c="r">🍓</div> <div c="p">🫐</div><div c="r">‍🍅</div><div c="g">🫒</div> </div> <style> .filter{display: flex;cursor: pointer;user-select: none;} .filter label{ width: calc(25% - 12px); box-sizing: border-box; margin: 6px; height: 40px; line-height: 36px; text-align: center; border-radius: 8px; border: 2px solid; } .filter input{display: none;} .fruit-cont{display: flex;flex-wrap: wrap;} .fruit-cont div{ display: none; width: calc(25% - 12px); box-sizing: border-box; margin: 6px; height: 60px; line-height: 60px; text-align: center; font-size: 30px; text-shadow: 0 0 6px white; border-radius: 8px; } .filter:has(>#yellow:checked) ~ .fruit-cont div[c="y"]{display: block} .filter:has(>#green:checked) ~ .fruit-cont div[c="g"]{display: block} .filter:has(>#red:checked) ~ .fruit-cont div[c="r"]{display: block} .filter:has(>#purple:checked) ~ .fruit-cont div[c="p"]{display: block} .filter:has(>#all:checked) ~ .fruit-cont div{display: block} .fruit-cont div[c="r"]{background-color: #e74c3c} .fruit-cont div[c="g"]{background-color: #2ecc71} .fruit-cont div[c="p"]{background-color: #9b59b6} .fruit-cont div[c="y"]{background-color: #f39c12 } .filter label[for="red"]{border-color: #e74c3c;color: #e74c3c;} .filter label[for="green"]{border-color: #2ecc71;color: #2ecc71;} .filter label[for="purple"]{border-color: #9b59b6;color: #9b59b6;} .filter label[for="yellow"]{border-color: #f39c12 ;color: #f39c12 ;}
.filter label[for="all"]{border-color: black;color: black ;}
.filter input:checked + label[for="red"]{background-color: #e74c3c;color: white;}
.filter input:checked + label[for="green"]{background-color: #2ecc71;color: white;}
.filter input:checked + label[for="purple"]{background-color: #9b59b6;color: white;}
.filter input:checked + label[for="yellow"]{background-color: #f39c12 ;color: white;}
.filter input:checked + label[for="all"]{background-color: black ;color: white;}
</style>

## `:has()` pseudo-class and attribute selector
Let's learn about these two selectors through the following small example
### Attribute selector
<div linkto='box1'>I am</div>
<div linkto='box2'>I am</div>
<style>
div[linkto='box1']:hover::after{content:'box1'}
div[linkto='box2']:hover::after{content:'box2'}
</style>

```html
<!-- Pseudo-elements will be added when the mouse touches them -->
<div linkto='box1'>I am</div>
<div linkto='box2'>I am</div>
<style>
div[linkto='box1']:hover::after{content:'box1'}
div[linkto='box2']:hover::after{content:'box2'}
</style>
```
In this example, the two divs do not have any class names, but are given a custom attribute `linkto`. We can use this to select them through `[linkto='box1']` and assign pseudo elements.
#### How to use
In addition to the exact match of a certain attribute value in this example, attribute selectors have many other uses:
##### Match attribute name
`img[alt]`
This selector will select all img elements with an alt attribute, regardless of the alt content.
##### Exactly match attribute
`img[hidden="true"]`
This selector will select all img elements with a hidden attribute and a value of true. We can easily hide the element by adding the `display:none` style to this selector.
##### Match the existence of a certain attribute value
`img[tag~="hd"]`
This selector can find all img elements with a tag attribute and a value of hd. For example, the selector above can select elements such as `<img tag="hd cover"/>` and `<img tag="sport football hd"/>`.
##### Match attribute values ​​with a certain prefix
There are two ways to match prefixes:
`span[lang|="zh"]`

This selector can select all span elements whose lang attribute values ​​start with 'zh-', such as `<span lang="zh-TW">`, `<span lang="zh-CN">`.

`img[type^="low"]`

This selector can select all img elements whose type attributes start with 'low', such as `<img type="lowPower"/>`, `<img type="lowLevel"/>`. The difference between it and the above is that it can match words that are not separated by '-'.
##### Match attribute values ​​with a certain suffix
`img[type$="ball"]`

This selector can select all img elements whose type attributes end with 'ball', such as `<img type="football"/>`, `<img type="basketball"/>`.
##### Match attribute values ​​containing a certain string
`img[type*="0"]`

This selector can select all img elements whose type attribute contains '0', such as `<img type="110"/>`, `<img type="4008208820"/>`.

### `:has()` pseudo class
<div class="cont-box">
<div linkto='box3'>I am</div>
<div linkto='box4'>I am</div>
</div>
<div class="disply-box"></div>
<style>
.cont-box:has(>[linkto="box3"]:hover) + .disply-box::after{content:'box3'}
.cont-box:has(>[linkto="box4"]:hover) + .disply-box::after{content:'box4'}
</style>

```html
<div class="cont-box">
<!-- Touch these boxes, the disply-box below will display pseudo elements -->
<div linkto='box3'>I am</div>
<div linkto='box4'>I am</div>
</div>
<div class="disply-box"></div>
<style>
    .cont-box:has(>[linkto="box3"]:hover) + .disply-box::after{content:'box3'}
    .cont-box:has(>[linkto="box4"]:hover) + .disply-box::after{content:'box4'}
</style>
```
Because the hovered element is wrapped by cont-box, the father's brothers cannot be selected directly through the subsequent sibling selector. We can give the father `:has()
`pseudo-class to indirectly select.
#### About the `:has()` selector
When the selector in the brackets is true, the pseudo-class will take effect.

`h1:has(+ p)`

In this example, the adjacent sibling selector is put in. When a h1 tag is followed by a p tag, this pseudo-class will take effect. In this way, you can give styles to the h1 tag before the p tag while other h1 tags are not affected.

`.cont-box:has(>[linkto="box4"]:hover)`

Let's interpret the selector in the example; the content in the brackets is `>[linkto="box4"]:hover`, which means that there is a child element, the linkto attribute value of this child element is box4, and it is being touched by the mouse. Combined with the :has() pseudo-class, it is to find the .cont-box with such a child element and give it a style.
## Complete code 
```html
<div class="filter">
	<input checked type="radio" name="filter" id="all"/>
	<label for="all">All</label>
	<input type="radio" name="filter" id="yellow"/>
	<label for="yellow">Yellow</label>
	<input type="radio" name="filter" id="red"/>
	<label for="red">Red</label>
	<input type="radio" name="filter" id="green"/>
	<label for="green">Green</label>
	<input type="radio" name="filter" id="purple"/>
	<label for="purple">Purple</label>
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
