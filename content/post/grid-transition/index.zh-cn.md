---
title: 为不确定高度的元素添加过渡动画
description: 巧用grid布局优雅实现 定高定宽向不定宽高height:auto之间的过渡
slug: grid-transition
date: 2024-09-24 00:00:00+0000
image: cover.jpg
categories:
    - technology
    - HTML
tags:
    - CSS
    - HTML
weight: 1
---
> 文章在个人网站中发布，原文链接：[为不确定高度的元素添加过渡动画](https://blog.zhoujump.club/p/grid-transition/)

有时候我们会遇到这种情况，容器内部由元素撑开无法知道其高度，又需要实现平滑过渡。就像这样：

<div class="cont">
  <div class="head">把鼠标摸我头上试试</div>
  <div class="body">
    我是内容</br>
    我是内容</br>
    我是内容</br>
    我是内容</br>
  </div>
</div>

<style>
  .cont{
    display:grid;
    background:#99e6ff;
    color:#006080;
    grid-template-rows: 30px 0fr;
    border-radius:8px;
    transition: .3s;
    padding:10px;
    line-height:30px;
    margin-bottom:20px;
  }
  .cont:hover{
    grid-template-rows: 30px 1fr;
    transition: .3s;
    
  }
  .body{
    min-height: 0;
    overflow:hidden;
  }
</style>

我相信作为CSS初学者都有过这样的尝试：

```css
  .cont{
      height:0;//初始状态时高度为零
      transition: .3s;
    }
  .cont:hover{
    height:auto;//鼠标摸上去时高度为自动
    transition: .3s;//设置0.3秒过渡
    }
```

然后狠狠吃了一个闭门羹，鼠标摸上去确实会变换高度，但过渡不生效。这是因为`transition`只能处理数值之间的过渡，auto - 0之间的变化无法过渡。
> 现在通过`calc-size`属性能够实现这种过渡了，具体[请看这篇帖子](https://segmentfault.com/a/1190000045102391),不过目前兼容性还不是很好。

那有什么办法能做到呢，此时就要搬出我们的`display: grid`了，网格布局可以通过`fr`单位控制自己内部容器的**宽高比例**。那就很巧了家人们，只需要对高度比例作1 - 0之间的变换不就成了吗？

下面是上文中摸头展开样例的代码：
```html
  <div class="cont">
    <div class="head">我来组成头部</div>
    <div class="body">
      我是内容</br>
      我是内容</br>
      我是内容</br>
      我是内容</br>
    </div>
  </div>

  <style>
    .cont{
      display:grid;//设置网格布局
      background:#99e6ff;
      color:#006080;
      grid-template-rows: 30px 0fr;//分配高度：head:30px，body:0%
      border-radius:8px;
      transition: .3s;
      padding:10px;
      line-height:30px;
    }
    .cont:hover{
      grid-template-rows: 30px 1fr;//分配高度：head:30px，body:100%
      transition: .3s;//设置0.3秒过渡
    }
    .body{
      min-height: 0;//设置最小高度，不然文字仍能把容器撑开。
      overflow:hidden;//设置超出隐藏，不然容器收起来了，文字还在。
    }
  </style>
```

水灵灵的就完成了一个效果，有关网格布局的知识三言两语无法讲明白，有兴趣的同学可以学习学习。

## 本文参考
[CSS 如何让auto height完美支持过渡动画？](https://juejin.cn/post/7196843994030342200)
