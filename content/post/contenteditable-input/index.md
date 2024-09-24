---
title: 使用contenteditable实现变宽输入框
description: 利用contenteditable属性实现不定宽度的输入框
slug: contenteditable-input
date: 2023-09-24 00:00:00+0000
image: cover.png
categories:
    - technology
tags:
    - HTML
weight: 1
---

有些时候我们需要制作宽度随输入的文字变化的输入组件，例如下面这个tag输入框：

<div
    style="height: 30px;background:#99e6ff;color:#006080; padding:0 8px; border-radius: 5px; display: inline-block;line-height: 30px;outline: none;margin-bottom: 16px;"
    contenteditable="true">我的内容是可以编辑的</div>

```html
<div
    style="height: 30px;
    background:#99e6ff;
    color:#006080;
    padding:0 8px;
    border-radius:5px;
    display:inline-block;
    line-height:30px;
    outline: none;
    margin-bottom: 16px;"
    contenteditable="true">我的内容是可以编辑的</div>
```

这个时候常规的input就显得有些困难了,因为input的宽度是固定的。

根据上面的代码，我们可以发现这种效果是通过一个不能输入的元素实现的，秘密就在style中的最后一个属性`contenteditable="true"`，这个属性可以让元素变成一个可编辑的文本框，但是它不会显示出来，所以看起来就像是一个普通的div一样。

合理使用这个属性，我们可以实现很多有趣的效果。使我们的开发效率事半功倍。
