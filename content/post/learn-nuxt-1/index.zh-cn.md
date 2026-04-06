---
title: Nuxt 学习之旅 1
description: 
slug: learn-nuxt-1
date: 2026-04-06 00:00:00+0000
image: cover.zh-cn.webp
categories:
    - Nuxt
    - Vue
tags:
    - Nuxt
weight: 1
---
> 文章在个人网站中发布，原文链接：[Nuxt学习之旅1](https://blog.zhoujump.club/p/learn-nuxt-1/)

## 前言  

在AI时代的冲击下，单纯的切图仔或者会一点前端工程化和系统化，已经不是什么值钱的技能了。  
为了不被时代滚滚的车轮轧到，决心趁着年轻学习一点全栈技术。而且目前中文Nuxt的教程还是较少的，所以就有了这套帖子，自己学习，也是帮助后来人少走弯路。  

## 安装Nuxt  

我就直接使用WebStorm来建立项目了，作为初学者便利性和少踩坑还是应该在首位的。  
当然使用其它IDE建立项目也很简单，如下的命令就是使用当前最新nuxt版本创建项目：  

```bash
npm create nuxt@latest 你的项目名称
```
之后的流程无论使用什么IDE都一样，Nuxt会启动一个交互式的配置流程，完成之后就可以使用`npm run dev`启动开发服务器了。  

```bash
npm run dev
```

然后，咱们的第一个Nuxt项目就启动了！  

![一个全新的Nuxt项目截图](2-1.webp)
 
 ## 约定大于配置

 Nuxt有个特点就是约定大于配置，理论上我们无需编写任何配置文件，Nuxt会按照约定来工作。例如我们无需配置路由，直接在`pages`目录下创建文件，Nuxt会自动识别并创建对应的路由。  
 现在我们来尝试添加一个login页面：  

 ### 建立页面  

我们在先`app`目录下建立一个`pages`目录，新建一个`app/pages/index.vue`，然后再建立`app/pages/login.vue`，并写上相应的内容。此时如果我们删掉`app.vue`，Nuxt就会把`index.vue`作为首页渲染出来了。  

```vue
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "index"
})
</script>

<template>
  <div>
    <!--  Nuxt用于页面跳转  -->
    <NuxtLink to="/login">前往登录页</NuxtLink>
    <h2>我是首页</h2>
  </div>
</template>

<style scoped>

</style>
```

### 默认布局  

那`app.vue`是什么呢？他是我们的默认布局文件，也就是所有页面的父组件，我们把它删掉，Nuxt就会按照约定渲染`index.vue`。不过我们现在先把它加回来并编写一点布局：  

```vue
<template>
  <div>
    <!--  app.vue是Nuxt约定的入口  -->
    <h1>这里是默认布局哦！</h1>
    <!--  NuxtPage可以渲染下一级路由的内容  -->
    <NuxtPage />
  </div>
</template>

```
Nuxt发现`app.vue`存在就会使用它来渲染`index.vue`作为首页，现在我们的页面和项目结构就变成了这样:  

![项目结构截图](3-1.webp)

### 建立网络接口  

Nuxt的网络接口也是约定式的，使用js语言来编写，对于咱们前端十分友好。  
我们在项目根目录下建立一个`server`目录（注意不是`app`目录下），然后建立`server/api/hello.ts`文件。那么Nuxt就会自动创建`/api/hello`的接口。  
我们写一个简单的接口用来计算两个数字的和：  

```ts
export default defineEventHandler((event) => {
    // 获取路由参数num1和num2
    const query = getQuery(event)
    const num1 = Number(query.num1)
    const num2 = Number(query.num2)
    if(isNaN(num1) || isNaN(num2)) {
        // 如果参数不是数字，抛出错误
        throw createError({
            status: 500,
            statusText: "Invalid query number",
        })
    }else{
        // 返回计算结果
        return num1 + num2
    }
})
```

### 前端使用接口

我们在`app/pages/index.vue`中调用这个接口试试看，这些代码乍一看可能难以理解，在后边我会分开解释。  

```vue
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "index",
  data(): any{
    // 此处的数据由服务器处理完毕后将会随页面一起携带至前端
    return {
      result: 0,
      num1: 0,
      num2: 0,
    }
  },
  created(): any {
    // 这部分代码在服务器上执行
    const route = useRoute()
    if(route.query.num1){ this.num1 = route.query.num1 }
    if(route.query.num2){ this.num2 = route.query.num2 }
    const data = useFetch('/api/hello',{
      query: { num1: this.num1, num2: this.num2 }
    })
    this.result = data.data
  },
  methods: {
    // 这里的代码在浏览器执行
    async plus(){
      this.result = await $fetch('/api/hello',{
        query: { num1: this.num1, num2: this.num2 }
      })
    }
  }
})
</script>

<template>
  <div>
    <!--  Nuxt用于页面跳转  -->
    <NuxtLink to="/login">前往登录页</NuxtLink>
    <h2>我是首页</h2>
    <input v-model="num1"/> + <input v-model="num2"/> = {{result}}
    <button @click="plus">计算</button>
  </div>
</template>

<style scoped>

</style>
```

我们先看服务器上处理的这部分：

```js
    // 这部分代码在服务器上执行
    // useRoute()可以获得路由参数，我们从这里获取num1和num2参数
    const route = useRoute()
    if(route.query.num1){ this.num1 = route.query.num1 }
    if(route.query.num2){ this.num2 = route.query.num2 }
    // useFetch()用于在服务器内部调用接口
    const data = useFetch('/api/hello',{
      query: { num1: this.num1, num2: this.num2 }
    })
    // 给data赋值，nuxt将会将它渲染到页面上
    this.result = data.data
```

在Nuxt中，`beforeCreate`和`created`两个生命周期是在服务器上被运行的。我们可以像php那样预先在服务器组装好页面。

![服务器返回的页面是已经渲染好的内容](3-2.webp)  

可以看到，我们带参数访问页面时，服务器直接返回了计算好结果的页面，而不是SPA那样先获取一个空页面再填充数据。  
  
然后再看浏览器端的代码：

```js
methods: {
    // 这里的代码在浏览器执行
    async plus(){
      // $fetch()是Nuxt提供的数据请求函数
      this.result = await $fetch('/api/hello',{
        query: { num1: this.num1, num2: this.num2 }
      })
    }
  }
```

这就和SPA没有区别了，将这个方法绑定到按钮上，就会在浏览器发起网络请求。

![浏览器发起网络请求](3-3.webp)  

## 小结
我们今天新建并体验了一把Nuxt。  
创建了两个页面和一个接口，并且在前后端分别使用了它。了解了Nuxt强大的服务端渲染能力，前后端无缝连接。