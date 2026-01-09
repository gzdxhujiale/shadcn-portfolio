<script setup lang="ts">
import { ref } from 'vue'
import Portfolio from '@/components/Portfolio.vue'
import FinanceApp from '@/components/finance/FinanceApp.vue'

// 当前页面状态：'portfolio' 或 'finance'
const currentPage = ref<'portfolio' | 'finance'>('portfolio')

// 处理从 Portfolio 导航到其他页面
const handleNavigate = (page: string) => {
  if (page === 'finance' || page === '/finance') {
    currentPage.value = 'finance'
  }
}

// 返回简历页
const handleNavigateBack = () => {
  currentPage.value = 'portfolio'
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
