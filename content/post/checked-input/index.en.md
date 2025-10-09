---
title: Pure CSS to implement the edit and save buttons of the input box
description: Use the checked pseudo-class to implement the click button to switch the input box to the input state
slug: checked_input
date: 2024-09-29 00:00:00+0000
image: cover.jpg
categories:
- technology
- CSS
tags:
- CSS
- HTML
weight: 1
---
> Original article: [Pure CSS to implement the edit and save buttons of the input box](https://blog.zhoujump.club/en/p/checked_input/)

## See the effect first
Click the `Edit` on the right to activate the input on the left, and click the `Finish` on the right to save the input box content
<div class="s-box">
<input id="s-edit" type="checkbox"/>
<input class="s-input" value="Click the 'Edit' button on the right→"/>
<label class="s-label" for="s-edit"></label>
</div>
<style>
.s-box {
background: #fff;
border: 1px solid #ddd;
border-radius: 12px;
padding: 10px; transition: all .3s; } .s-box:hover{ box-shadow: 0 0 10px #ddd; transition: all .3s; } .s-input,.s-input:focus{ width:calc(100% - 60px); font-size: 16px; padding: 4px; outline: none; border: none; pointer-events: none; border: 1px solid #fff; transition: all .3s; } .s-label{ width: 40px; cursor: pointer; float: right; text-align: center; } #s-edit:checked ~ .s-input{ pointer-events: auto; border: 1px solid #ddd; border-radius: 4px; transition: all .3s; } #s-edit{display: none;}
.s-label::after{content:"编辑";}
#s-edit:checked ~ .s-label::after{content:"完成";}
</style>

## pointer-events
We all know that the disabled attribute in `<input disabled="true"/>` can be used to make the input box uneditable, but as an element attribute, it needs to be modified using js. So how do we achieve this in a pure CSS environment?
The answer is to use the `pointer-events` attribute, which is used to define how an element responds to user clicks. For example, the following two examples:

<a style="pointer-events: auto;" href='https://blog.zhoujump.club' target="_blank">pointer-events: auto</a><br/>
<a style="pointer-events: none;" href='https://blog.zhoujump.club' target="_blank">pointer-events: none</a>
```html
<!-- This a tag sets pointer-events: auto -->
<a style="pointer-events: auto;"
href='https://blog.zhoujump.club'
target="_blank">pointer-events: auto</a>
<!-- This a tag sets pointer-events: auto -->
<a style="pointer-events: none;"
href='https://blog.zhoujump.club'
target="_blank">pointer-events: none</a>
```
In this example, the a tag with `pointer-events: none` cannot be clicked, while the a tag with `pointer-events: auto` can be clicked normally. We can use this method to achieve the effect of disabling the input box.
## Complete code
```html
<div class="s-box">
<!-- I am an old tool user. If you don’t understand its usage, you can read the previous article -->
<input id="s-edit" type="checkbox"/>
<input class="s-input" value="Click the 'Edit' button on the right →"/>
<!-- The content of this label is dynamically assigned using pseudo-elements, so leave it blank here -->
<label class="s-label" for="s-edit"></label>
</div>
<style>
.s-box {//External large box style
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 10px;
    transition: all .3s;
}
.s-box:hover{//External large box style when touched by mouse
    box-shadow: 0 0 10px #ddd;
    transition: all .3s;
}
.s-input,.s-input:focus{//Design input style and remove its default style
    width:calc(100% - 60px);
    font-size: 16px;
    padding: 4px;
    outline: none;
    border: none;
    pointer-events: none;//By default, we make it uneditable
    border: 1px solid #fff;
    transition: all .3s;
}
.s-label{//Right button style
    width: 40px;
    cursor: pointer;
    float: right;
    text-align: center;
}
#s-edit:checked ~ .s-input{//When the button is clicked, the checkbox is selected
    pointer-events: auto;//Make the input editable
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all .3s;
}
#s-edit{display: none;}//Hide tool input
.s-label::after{content:"Edit";}//Assign button content through pseudo-element
#s-edit:checked ~ .s-label::after{content:"Complete";}//Assign button content when the checkbox is selected by clicking the button
</style>
```

## Related knowledge
[pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)<br/>
[::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)
