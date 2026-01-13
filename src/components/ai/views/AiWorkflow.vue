<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// 动态配置：通过调整数组顺序即可排序，添加对象即可新增
const workflowConfig = [
  {
    title: '内容生成工作流',
    desc: '从选题到大纲，再到正文生成的全自动流程。'
  },
  {
    title: '研报分析工作流',
    desc: '自动抓取研报，提取关键信息并生成摘要。'
  }
]
</script>

<template>
  <div class="flex-1 overflow-y-auto p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-foreground mb-2">AI 工作流编排</h1>
      <p class="text-muted-foreground">基于 AI 的自动化工作流，串联多个任务节点，实现复杂业务流程的自动化执行。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="(item, index) in workflowConfig"
        :key="index"
        class="transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-emerald-500"
      >
        <CardHeader>
          <CardTitle class="text-lg">{{ item.title }}</CardTitle>
          <CardDescription>{{ item.desc }}</CardDescription>
        </CardHeader>
        <CardFooter class="pt-0">
          <span class="text-sm font-medium text-emerald-600 inline-flex items-center gap-2">
            配置工作流
            <ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
