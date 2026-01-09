<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import AppSidebar from '@/components/finance/AppSidebar.vue'
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
import { useNavigation } from '@/composables/useNavigation'

// 导入所有页面组件
// workspace
import TodoList from '@/components/finance/views/workspace/TodoList.vue'
import History from '@/components/finance/views/workspace/History.vue'
// report
import ReportCompany from '@/components/finance/views/report/ReportCompany.vue'
import ReportAmeba from '@/components/finance/views/report/ReportAmeba.vue'
import ReportStore from '@/components/finance/views/report/ReportStore.vue'
import SelfServiceBi from '@/components/finance/views/report/SelfServiceBi.vue'
import DashboardCompare from '@/components/finance/views/report/DashboardCompare.vue'
// rbac
import RbacUser from '@/components/finance/views/rbac/RbacUser.vue'
import RbacRole from '@/components/finance/views/rbac/RbacRole.vue'
import RbacPermission from '@/components/finance/views/rbac/RbacPermission.vue'
import RbacApply from '@/components/finance/views/rbac/RbacApply.vue'
import RbacLog from '@/components/finance/views/rbac/RbacLog.vue'
// config
import DimensionManagement from '@/components/finance/views/config/DimensionManagement.vue'
import NotificationSettings from '@/components/finance/views/config/NotificationSettings.vue'
import DataDictionary from '@/components/finance/views/config/DataDictionary.vue'
import UserManual from '@/components/finance/views/config/UserManual.vue'

const { breadcrumbs, currentPage, setDetailTitle } = useNavigation()

// 页面组件映射
const pageComponents: Record<string, any> = {
  TodoList,
  History,
  ReportCompany,
  ReportAmeba,
  ReportStore,
  SelfServiceBi,
  DashboardCompare,
  RbacUser,
  RbacRole,
  RbacPermission,
  RbacApply,
  RbacLog,
  DimensionManagement,
  NotificationSettings,
  DataDictionary,
  UserManual,
}

// 当前显示的组件
const CurrentPageComponent = computed(() => pageComponents[currentPage.value] || TodoList)

// 点击第二级面包屑返回列表
const handleSubNavClick = () => {
  if (breadcrumbs.value.detail) {
    setDetailTitle(null)
  }
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb class="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                {{ breadcrumbs.main }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block">
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <!-- 如果有详情页，第二级变为可点击的链接 -->
              <BreadcrumbLink v-if="breadcrumbs.detail" href="#" @click.prevent="handleSubNavClick">
                {{ breadcrumbs.sub }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else>{{ breadcrumbs.sub }}</BreadcrumbPage>
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
        
        <!-- 页面操作区域 - Teleport 目标 -->
        <div id="breadcrumb-actions" class="flex items-center gap-4">
          <!-- 各页面会通过 Teleport 在此渲染内容 -->
        </div>
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
