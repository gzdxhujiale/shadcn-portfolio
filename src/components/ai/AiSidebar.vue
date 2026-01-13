<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { Bot, Home } from 'lucide-vue-next'

import AiNavMain from '@/components/ai/AiNavMain.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

import { aiSidebarConfig } from '@/config/ai-sidebar'

const emit = defineEmits(['navigate-back'])

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

const handleGoHome = () => {
  emit('navigate-back')
}
</script>

<template>
  <Sidebar v-bind="props">
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
      <AiNavMain />
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
</template>
