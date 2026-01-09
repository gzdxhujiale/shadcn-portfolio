<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import NavMain from '@/components/finance/NavMain.vue'
import NavProjects from '@/components/finance/NavProjects.vue'
import NavUser from '@/components/finance/NavUser.vue'
import TeamSwitcher from '@/components/finance/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { useTeam } from '@/composables/useTeam'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// 使用团队 composable 获取过滤后的导航（teams 现在是响应式的）
const { teams, user, filteredNavMain, filteredProjects } = useTeam()
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="filteredNavMain" />
      <NavProjects :projects="filteredProjects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
