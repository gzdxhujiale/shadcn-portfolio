<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  ChevronRight,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Plus,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Settings2,
  Building2,
  Users,
  Briefcase
} from 'lucide-vue-next'

// UI Components
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
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

// Composables
import { useFinanceApp } from '@/composables/useFinanceApp'

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

// Logic
const { breadcrumbs, currentPage, setDetailTitle, currentSubNav, setNavigation } = useFinanceApp()
const { teams, user, filteredNavMain, filteredProjects, activeTeam, setActiveTeam, addTeam, allNavItems, allProjects } = useFinanceApp()

// 手动实现 isMobile 检查，因为在 SidebarProvider 内部使用 useSidebar 会有问题（provide/inject 顺序）
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

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

// --- TeamSwitcher Logic ---
const dialogOpen = ref(false)

const availableLogos = [
  { name: 'Gallery', icon: GalleryVerticalEnd },
  { name: 'Wave', icon: AudioWaveform },
  { name: 'Command', icon: Command },
  { name: 'Settings', icon: Settings2 },
  { name: 'Building', icon: Building2 },
  { name: 'Users', icon: Users },
  { name: 'Briefcase', icon: Briefcase },
]

const newTeam = reactive({
  name: '',
  plan: '',
  logoIndex: 0,
  navMain: [] as string[],
  navItems: {} as Record<string, string[]>,
  projects: [] as string[]
})

const resetForm = () => {
  newTeam.name = ''
  newTeam.plan = ''
  newTeam.logoIndex = 0
  newTeam.navMain = []
  newTeam.navItems = {}
  newTeam.projects = []
}

const toggleNavMain = (navId: string) => {
  const index = newTeam.navMain.indexOf(navId)
  if (index > -1) {
    newTeam.navMain.splice(index, 1)
    delete newTeam.navItems[navId]
  } else {
    newTeam.navMain.push(navId)
    const nav = allNavItems.value.find(n => n.id === navId)
    if (nav && nav.items?.length) {
      newTeam.navItems[navId] = nav.items.map(item => item.id)
    }
  }
}

const toggleNavItem = (navId: string, itemId: string) => {
  if (!newTeam.navItems[navId]) {
    newTeam.navItems[navId] = []
  }
  const index = newTeam.navItems[navId].indexOf(itemId)
  if (index > -1) {
    newTeam.navItems[navId].splice(index, 1)
    if (newTeam.navItems[navId].length === 0) {
      delete newTeam.navItems[navId]
    }
  } else {
    newTeam.navItems[navId].push(itemId)
  }
}

const toggleProject = (projectId: string) => {
  const index = newTeam.projects.indexOf(projectId)
  if (index > -1) {
    newTeam.projects.splice(index, 1)
  } else {
    newTeam.projects.push(projectId)
  }
}

const isItemSelected = (navId: string, itemId: string) => {
  return newTeam.navItems[navId]?.includes(itemId) ?? false
}

const handleSave = () => {
  if (!newTeam.name.trim()) return
  
  const permissions: any = {
    navMain: newTeam.navMain.length > 0 ? [...newTeam.navMain] : 'all',
    projects: newTeam.projects.length > 0 ? [...newTeam.projects] : 'all'
  }
  
  if (Object.keys(newTeam.navItems).length > 0) {
    permissions.navItems = { ...newTeam.navItems }
  }
  
  const team = {
    name: newTeam.name.trim(),
    logo: availableLogos[newTeam.logoIndex]?.icon ?? availableLogos[0]?.icon,
    plan: newTeam.plan.trim() || '自定义角色',
    permissions
  }
  
  addTeam(team)
  dialogOpen.value = false
  resetForm()
}

const openDialog = () => {
  resetForm()
  dialogOpen.value = true
}

// --- NavMain Logic ---
const handleNavClick = (mainNav: string, subNav: string) => {
  setNavigation(mainNav, subNav)
  setDetailTitle(null)
}

const isSubItemActive = (subTitle: string) => {
  return currentSubNav.value === subTitle
}

const hasActiveChild = (item: any) => {
  return item.items?.some((sub: any) => sub.title === currentSubNav.value)
}

// --- NavProjects Logic ---
const handleProjectClick = (projectName: string) => {
  setNavigation('项目文档', projectName)
  setDetailTitle(null)
}

const isProjectActive = (projectName: string) => {
  return currentSubNav.value === projectName
}
</script>

<template>
  <SidebarProvider>
    <!-- Sidebar -->
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <component :is="activeTeam?.logo" class="size-4" v-if="activeTeam?.logo" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">
                      {{ activeTeam?.name }}
                    </span>
                    <span class="truncate text-xs">{{ activeTeam?.plan }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                :side="isMobile ? 'bottom' : 'right'"
                :side-offset="4"
              >
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  切换团队
                </DropdownMenuLabel>
                <DropdownMenuItem
                  v-for="(team, index) in teams"
                  :key="team.name"
                  class="gap-2 p-2"
                  :class="{ 'bg-accent': activeTeam?.name === team.name }"
                  @click="setActiveTeam(team)"
                >
                  <div class="flex size-6 items-center justify-center rounded-sm border">
                    <component :is="team.logo" class="size-3.5 shrink-0" />
                  </div>
                  {{ team.name }}
                  <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2" @click="openDialog">
                  <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">
                    添加团队
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <!-- NavMain -->
        <SidebarGroup>
          <SidebarGroupLabel>平台</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              v-for="item in filteredNavMain"
              :key="item.title"
              as-child
              :default-open="item.defaultOpen || hasActiveChild(item)"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton 
                    :tooltip="item.title"
                    :class="{ 'bg-sidebar-accent text-sidebar-accent-foreground': hasActiveChild(item) }"
                  >
                    <component :is="item.icon" v-if="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton 
                        as-child 
                        @click="handleNavClick(item.title, subItem.title)"
                        :class="{ 
                          'bg-primary/10 text-primary font-medium': isSubItemActive(subItem.title)
                        }"
                      >
                        <a href="#">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <!-- NavProjects -->
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>文档</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in filteredProjects" :key="item.name">
              <SidebarMenuButton 
                as-child 
                @click="handleProjectClick(item.name)"
                :class="{ 'bg-primary/10 text-primary font-medium': isProjectActive(item.name) }"
              >
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuAction show-on-hover>
                    <MoreHorizontal />
                    <span class="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  class="w-48 rounded-lg"
                  :side="isMobile ? 'bottom' : 'right'"
                  :align="isMobile ? 'end' : 'start'"
                >
                  <DropdownMenuItem>
                    <Folder class="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward class="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 class="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton class="text-sidebar-foreground/70">
                <MoreHorizontal class="text-sidebar-foreground/70" />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
         <!-- NavUser -->
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="user.avatar" :alt="user.name" />
                    <AvatarFallback class="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">{{ user.name }}</span>
                    <span class="truncate text-xs">{{ user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                :side="isMobile ? 'bottom' : 'right'"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="user.avatar" :alt="user.name" />
                      <AvatarFallback class="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ user.name }}</span>
                      <span class="truncate text-xs">{{ user.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    升级到 Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    账户
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    账单
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    通知
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <!-- Main Content -->
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

  <!-- 添加团队对话框 -->
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-2xl max-h-[85vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>创建新团队</DialogTitle>
        <DialogDescription>
          配置团队基本信息和导航权限
        </DialogDescription>
      </DialogHeader>
      
      <div class="flex-1 overflow-auto py-4 space-y-6">
        <!-- 基本信息 -->
        <div class="space-y-4">
          <h4 class="font-medium text-sm border-l-2 border-primary pl-3">基本信息</h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>团队名称 *</Label>
              <Input v-model="newTeam.name" placeholder="输入团队名称" />
            </div>
            <div class="space-y-2">
              <Label>角色描述</Label>
              <Input v-model="newTeam.plan" placeholder="如：数据分析师" />
            </div>
          </div>
          
          <!-- 图标选择 -->
          <div class="space-y-2">
            <Label>选择图标</Label>
            <div class="flex gap-2">
              <button
                v-for="(logo, index) in availableLogos"
                :key="logo.name"
                class="w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all"
                :class="newTeam.logoIndex === index 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted hover:border-primary/50'"
                @click="newTeam.logoIndex = index"
              >
                <component :is="logo.icon" class="size-5" />
              </button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <!-- 导航权限配置 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-sm border-l-2 border-primary pl-3">导航权限</h4>
            <span class="text-xs text-muted-foreground">不选择任何项目则显示全部</span>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="nav in allNavItems" 
              :key="nav.id"
              class="border rounded-lg p-3"
            >
              <!-- 一级导航 -->
              <div class="flex items-center gap-3">
                <div 
                  class="flex items-center gap-2 cursor-pointer flex-1"
                  @click="toggleNavMain(nav.id)"
                >
                  <Checkbox 
                    :checked="newTeam.navMain.includes(nav.id)"
                  />
                  <component :is="nav.icon" class="size-4 text-muted-foreground" />
                  <span class="font-medium text-sm">{{ nav.title }}</span>
                  <span v-if="newTeam.navItems[nav.id]?.length" class="text-xs text-muted-foreground">
                    ({{ newTeam.navItems[nav.id]?.length || 0 }}/{{ nav.items?.length || 0 }})
                  </span>
                </div>
              </div>
              
              <!-- 子项列表 - 始终展开 -->
              <div 
                v-if="nav.items?.length"
                class="mt-3 ml-6 flex flex-wrap gap-2"
              >
                <div
                  v-for="item in nav.items"
                  :key="item.id"
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded border text-sm cursor-pointer transition-colors"
                  :class="isItemSelected(nav.id, item.id) 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'border-muted hover:border-primary/50'"
                  @click="toggleNavItem(nav.id, item.id)"
                >
                  <Checkbox 
                    :checked="isItemSelected(nav.id, item.id)"
                    class="h-3.5 w-3.5"
                  />
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <!-- 文档权限配置 -->
        <div class="space-y-4">
          <h4 class="font-medium text-sm border-l-2 border-primary pl-3">文档权限</h4>
          
          <div class="flex flex-wrap gap-2">
            <div
              v-for="project in allProjects"
              :key="project.id"
              class="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors"
              :class="newTeam.projects.includes(project.id) 
                ? 'bg-primary/10 border-primary' 
                : 'border-muted hover:border-primary/50'"
              @click="toggleProject(project.id)"
            >
              <Checkbox 
                :checked="newTeam.projects.includes(project.id)"
              />
              <component :is="project.icon" class="size-4" />
              <span class="text-sm">{{ project.name }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" @click="dialogOpen = false">取消</Button>
        <Button :disabled="!newTeam.name.trim()" @click="handleSave">创建团队</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
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
