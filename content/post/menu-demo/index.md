---
title: 圆形菜单demo演示
description: 一个圆形菜单
slug: menu-demo
date: 2024-09-14 00:00:00+0000
image: cover.png
categories:
    - technology
tags:
    - 代码片段
    - 菜单
weight: 1
---
<div id="app">{{ message }}</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { createApp } = Vue
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
