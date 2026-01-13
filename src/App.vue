<script setup lang="ts">
import { ref } from 'vue'
import Portfolio from '@/components/Portfolio.vue'
import FinanceApp from '@/components/finance/FinanceApp.vue'
import AiApp from '@/components/ai/AiApp.vue'

// 获取当前 URL 参数
const urlParams = new URLSearchParams(window.location.search)
const pageParam = urlParams.get('page')
const initialPage = pageParam === 'finance' ? 'finance' : pageParam === 'ai' ? 'ai' : 'portfolio'

// 当前页面状态：'portfolio' 、'finance' 或 'ai'
const currentPage = ref<'portfolio' | 'finance' | 'ai'>(initialPage)

// 处理从 Portfolio 导航到其他页面
const handleNavigate = (page: string) => {
  if (page === 'finance' || page === '/finance') {
    currentPage.value = 'finance'
  } else if (page === 'ai' || page === '/ai') {
    currentPage.value = 'ai'
  }
}

// 返回简历页
const handleNavigateBack = () => {
  currentPage.value = 'portfolio'
  // 如果是新开页面进入的，返回可能需要清理 URL 参数
  if (initialPage === 'finance' || initialPage === 'ai') {
     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
     window.history.pushState({path:newUrl},'',newUrl);
  }
}
</script>

<template>
  <Portfolio 
    v-if="currentPage === 'portfolio'" 
    @navigate="handleNavigate" 
  />
  <FinanceApp 
    v-else-if="currentPage === 'finance'" 
    @navigate-back="handleNavigateBack"
  />
  <AiApp 
    v-else-if="currentPage === 'ai'" 
    @navigate-back="handleNavigateBack"
  />
</template>

<style scoped>
/* 保留原有的过渡效果 */
</style>
