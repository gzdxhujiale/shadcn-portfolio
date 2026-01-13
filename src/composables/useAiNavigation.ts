import { ref, computed } from 'vue'
import { aiSidebarConfig } from '@/config/ai-sidebar'

// 导航状态
const currentAiNav = ref('AI Agent')
const agentDetailId = ref<string | null>(null) // 存储选中的 Agent ID

/**
 * AI 模块导航状态管理 Composable
 * 用于管理 AI 模块内的当前选中导航和面包屑
 */
export function useAiNavigation() {
    // 设置当前导航
    const setNavigation = (navTitle: string) => {
        currentAiNav.value = navTitle
        agentDetailId.value = null // 切换导航时清除 Agent 详情
    }

    // 设置 Agent 详情
    const setAgentDetail = (id: string | null) => {
        agentDetailId.value = id
    }

    // 计算面包屑数据
    const breadcrumbs = computed(() => {
        const result = {
            root: 'AI 工具',
            current: currentAiNav.value,
            detail: null as string | null,
        }

        // 如果有 Agent 详情，添加第三级面包屑
        if (agentDetailId.value && currentAiNav.value === 'AI Agent') {
            // 这里可以根据 agentDetailId 从配置中获取名称
            result.detail = agentDetailId.value
        }

        return result
    })

    // 计算当前页面组件名称
    const currentPage = computed(() => {
        const navItem = aiSidebarConfig.navMain.find(
            item => item.title === currentAiNav.value
        )
        return navItem?.component || 'AiAgentList'
    })

    // 获取导航配置
    const navItems = computed(() => aiSidebarConfig.navMain)

    return {
        currentAiNav,
        agentDetailId,
        breadcrumbs,
        currentPage,
        navItems,
        setNavigation,
        setAgentDetail,
    }
}
