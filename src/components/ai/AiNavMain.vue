<script setup lang="ts">
import { useAiNavigation } from '@/composables/useAiNavigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const { navItems, currentAiNav, setNavigation } = useAiNavigation()

const handleClick = (title: string) => {
  setNavigation(title)
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>导航</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in navItems" :key="item.id">
        <SidebarMenuButton
          :class="{ 'bg-sidebar-accent text-sidebar-accent-foreground': currentAiNav === item.title }"
          @click="handleClick(item.title)"
        >
          <component :is="item.icon" class="size-4" />
          <span>{{ item.title }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
