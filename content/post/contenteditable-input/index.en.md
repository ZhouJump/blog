---
title: How to implement an input box whose width changes with the text
description: Use the contenteditable attribute to implement an input box with variable width
slug: contenteditable-input
date: 2024-09-24 00:00:00+0000
image: cover.webp
categories:
- technology
- HTML
tags:
- HTML
weight: 1
---
> Original article: [How to implement an input box whose width changes with the text](https://blog.zhoujump.club/en/p/contenteditable-input/)

Sometimes we need to make an input component whose width changes with the input text, such as the tag input box below:

<div
style="height: 30px;background:#99e6ff;color:#006080; padding:0 8px; border-radius: 5px; display: inline-block;line-height: 30px;outline: none;margin-bottom: 16px;"
contenteditable="true">My content is editable</div>

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
contenteditable="true">My content is editable</div>
```

At this time, regular input seems a bit difficult because the width of input is fixed.

According to the above code, we can find that this effect is achieved by an element that cannot be input. The secret lies in the last attribute `contenteditable="true"` in style. This attribute can turn the element into an editable text box, but it will not be displayed, so it looks like an ordinary div.

Using this attribute reasonably, we can achieve many interesting effects. Make our development efficiency twice as good with half the effort.
