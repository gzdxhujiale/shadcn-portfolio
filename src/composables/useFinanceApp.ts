import { ref, computed } from 'vue'
import { sidebarConfig } from '@/config/sidebar'

// --- Navigation State ---
// 导航状态
const currentMainNav = ref('工作台')
const currentSubNav = ref('待办清单')
const detailTitle = ref<string | null>(null) // 存储详情页标题（第三级面包屑）
const historyFilter = ref<any>(null) // 存储要传递给历史记录页面的筛选参数

// --- Team State ---
// 全局共享的团队列表（响应式）
const teams = ref([...sidebarConfig.teams])
// 全局共享的当前团队状态
const activeTeam = ref(teams.value[0])

/**
 * 财务应用统一状态管理 Composable
 * 融合了 navigation 和 team 的逻辑
 */
export function useFinanceApp() {
    // --- Navigation Logic ---

    // 设置当前导航
    const setNavigation = (mainNav: string, subNav: string) => {
        currentMainNav.value = mainNav
        currentSubNav.value = subNav
    }

    // 设置详情标题（用于第三级面包屑）
    const setDetailTitle = (title: string | null) => {
        detailTitle.value = title
    }

    // 设置历史记录筛选参数
    const setHistoryFilter = (filter: any) => {
        historyFilter.value = filter
    }

    // 清除历史记录筛选参数
    const clearHistoryFilter = () => {
        historyFilter.value = null
    }

    // 导航到历史记录页面并设置筛选
    const navigateToHistory = (shop: string) => {
        historyFilter.value = { shop }
        currentMainNav.value = '工作台'
        currentSubNav.value = '历史记录'
        detailTitle.value = null
    }

    // 计算面包屑数据
    const breadcrumbs = computed(() => ({
        main: currentMainNav.value,
        sub: currentSubNav.value,
        detail: detailTitle.value,
    }))

    // 计算当前页面组件名称
    const currentPage = computed(() => {
        // 将中文标题映射到组件名
        const pageMap = {
            // 工作台
            '待办清单': 'TodoList',
            '历史记录': 'History',
            // 经营仓
            '公司经营仓': 'ReportCompany',
            '阿米巴经营仓': 'ReportAmeba',
            '店铺经营仓': 'ReportStore',
            // 数据看板
            '自助报表': 'SelfServiceBi',
            '对比分析': 'DashboardCompare',
            // 权限中心
            '用户管理': 'RbacUser',
            '角色管理': 'RbacRole',
            '权限配置': 'RbacPermission',
            '权限申请': 'RbacApply',
            '操作日志': 'RbacLog',
            // 系统设置
            '配置管理': 'DimensionManagement',
            '通知设置': 'NotificationSettings',
            // 项目
            '数据字典': 'DataDictionary',
            '用户操作手册': 'UserManual',
        }

        return (pageMap as Record<string, string>)[currentSubNav.value] || 'TodoList'
    })

    // --- Team Logic ---

    // 切换团队
    const setActiveTeam = (team: any) => {
        activeTeam.value = team
    }

    // 添加新团队
    const addTeam = (team: any) => {
        teams.value.push(team)
        // 自动切换到新团队
        activeTeam.value = team
    }

    // 删除团队
    const removeTeam = (teamName: string) => {
        const index = teams.value.findIndex(t => t.name === teamName)
        if (index > -1) {
            teams.value.splice(index, 1)
            // 如果删除的是当前团队，切换到第一个
            if (activeTeam.value?.name === teamName && teams.value.length > 0) {
                activeTeam.value = teams.value[0]
            }
        }
    }

    // 根据当前团队过滤主导航菜单
    const filteredNavMain = computed(() => {
        const permissions = activeTeam.value?.permissions

        // 如果没有配置权限或者是 'all'，显示所有菜单
        if (!permissions || permissions.navMain === 'all') {
            return sidebarConfig.navMain
        }

        // 根据权限配置过滤菜单
        return sidebarConfig.navMain
            .filter(nav => permissions.navMain.includes(nav.id))
            .map(nav => {
                // 如果有子项过滤配置
                if (permissions!.navItems && (permissions!.navItems as Record<string, string[]>)[nav.id]) {
                    return {
                        ...nav,
                        items: nav.items.filter(item =>
                            (permissions!.navItems as Record<string, string[]>)[nav.id]?.includes(item.id)
                        )
                    }
                }
                return nav
            })
    })

    // 根据当前团队过滤项目列表（文档）
    const filteredProjects = computed(() => {
        const permissions = activeTeam.value?.permissions

        // 如果没有配置权限或者是 'all'，显示所有项目
        if (!permissions || permissions.projects === 'all') {
            return sidebarConfig.projects
        }

        // 根据权限配置过滤项目
        return sidebarConfig.projects.filter(project =>
            (permissions!.projects as string[]).includes(project.id)
        )
    })

    // 获取所有可配置的导航项（用于权限配置界面）
    const allNavItems = computed(() => sidebarConfig.navMain)
    const allProjects = computed(() => sidebarConfig.projects)

    return {
        // Navigation Exports
        currentMainNav,
        currentSubNav,
        detailTitle,
        historyFilter,
        breadcrumbs,
        currentPage,
        setNavigation,
        setDetailTitle,
        setHistoryFilter,
        clearHistoryFilter,
        navigateToHistory,

        // Team Exports
        activeTeam,
        teams,
        setActiveTeam,
        addTeam,
        removeTeam,
        filteredNavMain,
        filteredProjects,
        allNavItems,
        allProjects,
        user: sidebarConfig.user
    }
}
