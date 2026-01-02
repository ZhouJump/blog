---
title: 删除具有大量部署的cloudflare pages项目
description: 删除cloudflare pages时出现提示Your project has too many deployments to be deleted, follow this guide to delete them该如何处理
slug: delete-cloudflare-project
date: 2026-1-2 00:00:00+0000
image: cover.zh-cn.webp
categories:
    - technology
tags:
  - cloudflare
weight: 1
---

> 文章在个人网站中发布，原文链接：[删除具有大量部署的cloudflare pages项目](https://blog.zhoujump.club/p/delete-cloudflare-project/)

## 部署量不是很大
如果你的部署量也就是一两百，可以尝试手动删除旧的部署，删除到部署数量小于一百一般就能删除了。
![如何删除部署](1-1.webp)

## 部署量很大
需要通过cloudflare的api删除部署，得安装[cloudflare cli](https://developers.cloudflare.com/workers/wrangler/install-and-update/)进行操作。  
这一部分也有其他人出过教程，这不做赘述,可以参考[这篇文章](https://furrycon.top/posts/80caf843).
