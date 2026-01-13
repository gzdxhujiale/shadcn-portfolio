<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import AiSidebar from '@/components/ai/AiSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAiNavigation } from '@/composables/useAiNavigation'

// 导入所有页面组件
import AiAgentList from '@/components/ai/views/AiAgentList.vue'
import AiCodingTools from '@/components/ai/views/AiCodingTools.vue'
import AiWorkflow from '@/components/ai/views/AiWorkflow.vue'

const emit = defineEmits(['navigate-back'])

const { breadcrumbs, currentPage, agentDetailId, setAgentDetail } = useAiNavigation()

// 页面组件映射
const pageComponents: Record<string, any> = {
  AiAgentList,
  AiCodingTools,
  AiWorkflow,
}

// 当前显示的组件
const CurrentPageComponent = computed(() => pageComponents[currentPage.value] || AiAgentList)

// 点击第二级面包屑返回列表
const handleCurrentNavClick = () => {
  if (agentDetailId.value) {
    setAgentDetail(null)
  }
}
</script>

<template>
  <SidebarProvider>
    <AiSidebar @navigate-back="emit('navigate-back')" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb class="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                {{ breadcrumbs.root }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block">
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <!-- 如果有详情页，第二级变为可点击的链接 -->
              <BreadcrumbLink v-if="breadcrumbs.detail" href="#" @click.prevent="handleCurrentNavClick">
                {{ breadcrumbs.current }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else>{{ breadcrumbs.current }}</BreadcrumbPage>
            </BreadcrumbItem>
            
            <!-- 第三级：详情页 -->
            <template v-if="breadcrumbs.detail">
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{{ breadcrumbs.detail }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col overflow-hidden">
        <Transition
          name="fade-slide"
          mode="out-in"
          appear
        >
          <component :is="CurrentPageComponent" :key="currentPage" />
        </Transition>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
/* Page transition effects */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
