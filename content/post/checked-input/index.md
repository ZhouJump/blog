---
title: 不使用js实现输入框的编辑和保存按钮
description: 使用checked伪类实现点击按钮切换input输入框的可输入状态
slug: checked_input
date: 2024-09-29 00:00:00+0000
image: cover.jpg
categories:
    - technology
tags:
    - CSS
    - HTML
weight: 1
---
## 先看效果
点击右侧`编辑`激活左侧input,点击右侧`完成`保存输入框内容
<div class="s-box">
    <input id="s-edit" type="checkbox"/>
    <input class="s-input" value="点击右侧‘编辑’按钮→"/>
    <label class="s-label" for="s-edit"></label>
</div>
<style>
    .s-box {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 10px;
        transition: all .3s;
    }
    .s-box:hover{
        box-shadow: 0 0 10px #ddd;
        transition: all .3s;
    }
    .s-input,.s-input:focus{
        width:calc(100% - 60px);
        font-size: 16px;
        padding: 4px;
        outline: none;
        border: none;
        pointer-events: none;
        border: 1px solid #fff;
        transition: all .3s;
    }
    .s-label{
        width: 40px;
        cursor: pointer;
        float: right;
        text-align: center;
    }
    #s-edit:checked ~ .s-input{
        pointer-events: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: all .3s;
    }
    #s-edit{display: none;}
    .s-label::after{content:"编辑";}
    #s-edit:checked ~ .s-label::after{content:"完成";}
</style>

## pointer-events
我们都知道可以通过`<input disabled="true"/>`中disabled属性来使输入框不可编辑，但是它作为元素属性需要使用js来修改。那我们纯css环境如何实现呢？
答案是使用`pointer-events`属性，它用来定义元素如何响应用户的点击。例如下边这两个例子：
<a style="pointer-events: auto;" herf='https://blog.zhoujump.club' target="_blank">pointer-events: auto</a>
<a style="pointer-events: none;"  herf='https://blog.zhoujump.club' target="_blank">pointer-events: none</a>
```html
<!-- 这个a标签设置了pointer-events: auto -->
<a style="pointer-events: auto;"
    href='https://blog.zhoujump.club'
    target="_blank">pointer-events: auto</a><br/>
<!-- 这个a标签设置了pointer-events: auto -->
<a style="pointer-events: none;" 
    href='https://blog.zhoujump.club'
    target="_blank">pointer-events: none</a>
```

这个例子中被设置了`pointer-events: none`的a标签无法被点击，而设置了`pointer-events: auto`的a标签可以正常点击。我们可以使用这种方式曲线救国实现禁用input输入框的的效果
## 完整代码
```html
<div class="s-box">
    <!-- 老工具人了，不理解它的用法的可以去看一下之前的文章 -->
    <input id="s-edit" type="checkbox"/>
    <input class="s-input" value="点击右侧‘编辑’按钮→"/>
    <!-- 这个label的内容使用伪元素动态赋予，所以这里留空 -->
    <label class="s-label" for="s-edit"></label>
</div>
<style>
    .s-box {//外部大盒子样式
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 10px;
        transition: all .3s;
    }
    .s-box:hover{//外部大盒子被鼠标摸的样式
        box-shadow: 0 0 10px #ddd;
        transition: all .3s;
    }
    .s-input,.s-input:focus{//设计input样式和去除它的默认样式
        width:calc(100% - 60px);
        font-size: 16px;
        padding: 4px;
        outline: none;
        border: none;
        pointer-events: none;//默认情况我们使它无法编辑
        border: 1px solid #fff;
        transition: all .3s;
    }
    .s-label{//右侧按钮样式
        width: 40px;
        cursor: pointer;
        float: right;
        text-align: center;
    }
    #s-edit:checked ~ .s-input{//当点击按钮使checkbox被选中时
        pointer-events: auto;//使input可以编辑
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: all .3s;
    }
    #s-edit{display: none;}//隐藏工具人input
    .s-label::after{content:"编辑";}//通过伪元素赋予按钮内容
    #s-edit:checked ~ .s-label::after{content:"完成";}//当点击按钮使checkbox被选中时赋予按钮内容
</style>
```

## 相关知识
[pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)<br/>
[::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)