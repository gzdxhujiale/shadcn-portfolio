<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, Bot, Home } from 'lucide-vue-next'
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAiNavigation } from '@/composables/useAiNavigation'
import { aiSidebarConfig } from '@/config/ai-sidebar'

// 导入所有页面组件
import AiAgentList from '@/components/ai/views/AiAgentList.vue'
import AiCodingTools from '@/components/ai/views/AiCodingTools.vue'
import AiWorkflow from '@/components/ai/views/AiWorkflow.vue'

const emit = defineEmits(['navigate-back'])

const { 
  breadcrumbs, 
  currentPage, 
  agentDetailId, 
  setAgentDetail,
  navItems,
  currentAiNav,
  setNavigation 
} = useAiNavigation()

// 页面组件映射
const pageComponents: Record<string, any> = {
  AiAgentList,
  AiCodingTools,
  AiWorkflow,
}

// 当前显示的组件
const CurrentPageComponent = computed(() => pageComponents[currentPage.value] || AiAgentList)

// 点击导航菜单
const handleNavClick = (title: string) => {
  setNavigation(title)
}

// 点击第二级面包屑返回列表
const handleCurrentNavClick = () => {
  if (agentDetailId.value) {
    setAgentDetail(null)
  }
}

// 返回首页
const handleGoHome = () => {
  emit('navigate-back')
}
</script>

<template>
  <SidebarProvider>
    <!-- 侧边栏部分 -->
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" class="cursor-default">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Bot class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ aiSidebarConfig.title }}</span>
                <span class="truncate text-xs text-muted-foreground">AI 能力展示</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in navItems" :key="item.id">
              <SidebarMenuButton
                :class="{ 'bg-sidebar-accent text-sidebar-accent-foreground': currentAiNav === item.title }"
                @click="handleNavClick(item.title)"
              >
                <component :is="item.icon" class="size-4" />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton @click="handleGoHome" class="cursor-pointer">
              <Home class="size-4" />
              <span>返回首页</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <!-- 主内容区域 -->
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
