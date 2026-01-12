<script setup lang="ts">
import { ref } from 'vue'
import Portfolio from '@/components/Portfolio.vue'
import FinanceApp from '@/components/finance/FinanceApp.vue'

// 获取当前 URL 参数
const urlParams = new URLSearchParams(window.location.search)
const initialPage = urlParams.get('page') === 'finance' ? 'finance' : 'portfolio'

// 当前页面状态：'portfolio' 或 'finance'
const currentPage = ref<'portfolio' | 'finance'>(initialPage)

// 处理从 Portfolio 导航到其他页面
const handleNavigate = (page: string) => {
  if (page === 'finance' || page === '/finance') {
    currentPage.value = 'finance'
    // 可选：更新 URL，但这可能会导致刷新行为不一致，视需求而定。
    // 这里暂时只做组件切换，保持单页应用体验，或者由调用方决定是否新开TAB
  }
}

// 返回简历页
const handleNavigateBack = () => {
  currentPage.value = 'portfolio'
  // 如果是新开页面进入的，返回可能需要清理 URL 参数，或者直接由用户关闭标签页
  // 这里简单处理为切换组件
  if (initialPage === 'finance') {
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
</template>

<style scoped>
/* 保留原有的过渡效果 */
</style>
