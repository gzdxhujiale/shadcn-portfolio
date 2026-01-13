import {
    Bot,
    Code,
    GitBranch,
    Home,
} from 'lucide-vue-next'

/**
 * AI 模块侧边栏配置
 * 定义 AI Agent、AI Coding 工具和 AI 工作流的导航结构
 */
export const aiSidebarConfig = {
    // 模块标题
    title: 'AI 工具箱',

    // 主导航菜单
    navMain: [
        {
            id: 'agent',
            title: 'AI Agent',
            icon: Bot,
            component: 'AiAgentList',
        },
        {
            id: 'coding',
            title: 'AI Coding 工具箱',
            icon: Code,
            component: 'AiCodingTools',
        },
        {
            id: 'workflow',
            title: 'AI 工作流',
            icon: GitBranch,
            component: 'AiWorkflow',
        },
    ],

    // 底部导航
    footer: {
        home: {
            title: '返回首页',
            icon: Home,
        }
    }
}
