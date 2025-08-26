---
title: 纯CSS实现一个炫酷的输入框效果
description: 通过:valid伪类和required属性纯css实现动态label输入框
slug: valid_input
date: 2024-10-22 00:00:00+0000
image: cover.jpg
categories:
    - technology
tags:
    - CSS
    - HTML
weight: 1
---
> 文章在个人网站中发布，原文链接：[纯CSS实现一个炫酷的输入框效果](https://blog.zhoujump.club/p/valid-input/)

## 先看效果

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
		box-sizing: border-box;
		border: 2px solid gray;
		border-radius: 6px;
		outline: none;
		padding-left: 10px;
		font-size: 20px;
		color: #006080;
	}
	.demo-input input:valid,
	.demo-input input:focus
	{border: 2px solid #006080}
	.demo-input label{
		position: absolute;
		top:0;
		left: 10px;
		font-size: 20px;
		color: grey;
		line-height: 36px;
		pointer-events: none;
	}
	.demo-input input:valid + label,
	.demo-input input:focus + label
	{
		color: #006080;
		top:-12px;
		font-size: 18px;
		padding: 0 4px;
		background-color: white;
		line-height: 18px;
	}
</style>

## `:valid`与`:invalid`伪类
这两个伪类可以用于`input`元素和`select`元素，用于选中校验通过和未校验通过的输入框。我们通过下边这个简单的小案例了解一下它们：  
这个输入框会校验输入是否是个电子邮箱地址，否则背景颜色将红色警告。

<input value="x@zhoujump.club" class="demo-input-2" type="email"/>
<style>
	.demo-input-2:invalid{background:red}
</style>

代码也非常简单：
``` html
<input class="demo-input-2" type="email"/>
<style>
	//invalid伪类可以选中不能通过校验的input
	.demo-input-2:invalid{background:red}
</style>
```
## `required`属性
这个属性可以用在`input`，`select`元素上，表示这个输入框是必填的。如果留空，将无法通过校验，可以被`:invalid`伪类选中，否则被`:valid`选中，例如：  
这个输入框不能留空，否则背景颜色将红色警告。

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
## `pattern`属性
这个属性可以用在`input`，`select`元素上，它的属性值需要填入一个正则表达式。如果输入框内容不符合正则表达式，可以被`:invalid`伪类选中，否则被`:valid`选中，例如：  
这个输入框只能输入六位数字，否则背景颜色将红色警告。

<input value="123456" class="demo-input-4" type="text" pattern="\d{6,6}"/>
<style>
	.demo-input-4:invalid{background:red}
</style>

``` html
<input class="demo-input-4" type="email"/>
<style>
	.demo-input-4:invalid{background:red}
</style>
```

## 完整代码
```html
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
		box-sizing: border-box;
		border: 2px solid gray;
		border-radius: 6px;
		outline: none;
		padding-left: 10px;
		font-size: 20px;
		color: #006080;
	}
	.demo-input input:valid,
	.demo-input input:focus
	{border: 2px solid #006080}
	.demo-input label{
		position: absolute;
		top:0;
		left: 10px;
		font-size: 20px;
		color: grey;
		line-height: 36px;
		pointer-events: none;
	}
	.demo-input input:valid + label,
	.demo-input input:focus + label
	{
		color: #006080;
		top:-12px;
		font-size: 18px;
		padding: 0 4px;
		background-color: white;
		line-height: 18px;
	}
</style>
```
## 相关知识
[表单数据校验](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation)  
[:valid伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)  
[:invalid伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)  
[required属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#required)  
[pattern属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#pattern)