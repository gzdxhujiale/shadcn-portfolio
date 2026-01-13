<script setup lang="ts">
import { DownloadIcon } from 'lucide-vue-next'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 动态配置：通过调整数组顺序即可排序，添加对象即可新增
const toolsConfig = [
  {
    title: '窗口控制器',
    desc: '一键管理桌面窗口，提升多任务处理效率。',
    link: 'https://pan.quark.cn/s/7a89f42d2c70'
  },
  {
    title: 'ReadBook',
    desc: '沉浸式电子书阅读器，支持多种格式与笔记功能。',
    link: 'https://pan.quark.cn/s/4c0eb46b3a5d'
  },
  {
    title: '智能直播助手',
    desc: 'AI 驱动的直播间场控与互动助手，自动回复弹幕。',
    link: 'https://pan.quark.cn/s/79b9109992bc'
  },
  {
    title: 'MD Reader',
    desc: '轻量级 Markdown 阅读器，支持实时预览与大纲导航。',
    link: 'https://pan.quark.cn/s/d8bf9a214aea'
  },
  {
    title: '智聘',
    desc: '暂无描述',
    link: 'https://pan.quark.cn/s/e6a7c6fa2647'
  }
]
</script>

<template>
  <div class="flex-1 overflow-y-auto p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-foreground mb-2">AI Coding 工具箱</h1>
      <p class="text-muted-foreground">AI 辅助生成的实用小工具集合，提升开发与办公效率。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="(tool, index) in toolsConfig"
        :key="index"
        class="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-500"
      >
        <CardHeader>
          <CardTitle class="text-lg">{{ tool.title }}</CardTitle>
          <CardDescription>{{ tool.desc }}</CardDescription>
        </CardHeader>
        <CardFooter class="pt-0">
          <Button variant="outline" size="sm" as-child class="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
            <a :href="tool.link" target="_blank" class="inline-flex items-center gap-2">
              <DownloadIcon class="size-4" />
              下载应用
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
