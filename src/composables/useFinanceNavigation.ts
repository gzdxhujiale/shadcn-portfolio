import { ref, shallowRef, markRaw, type Component } from 'vue'

// Import all view components
// Workspace
import TodoList from '@/components/finance/views/workspace/TodoList.vue'
import History from '@/components/finance/views/workspace/History.vue'
import TaskDetail from '@/components/finance/views/workspace/TaskDetail.vue'

// Report
import ReportCompany from '@/components/finance/views/report/ReportCompany.vue'
import ReportAmeba from '@/components/finance/views/report/ReportAmeba.vue'
import ReportStore from '@/components/finance/views/report/ReportStore.vue'
import SelfServiceBi from '@/components/finance/views/report/SelfServiceBi.vue'
import DashboardCompare from '@/components/finance/views/report/DashboardCompare.vue'

// RBAC
import RbacUser from '@/components/finance/views/rbac/RbacUser.vue'
import RbacRole from '@/components/finance/views/rbac/RbacRole.vue'
import RbacPermission from '@/components/finance/views/rbac/RbacPermission.vue'
import RbacLog from '@/components/finance/views/rbac/RbacLog.vue'
import RbacApply from '@/components/finance/views/rbac/RbacApply.vue'

// Config
import DimensionManagement from '@/components/finance/views/config/DimensionManagement.vue'
import NotificationSettings from '@/components/finance/views/config/NotificationSettings.vue'
import DataDictionary from '@/components/finance/views/config/DataDictionary.vue'
import UserManual from '@/components/finance/views/config/UserManual.vue'

// View name to component mapping
const viewComponents: Record<string, Component> = {
    // Workspace
    'todo': TodoList,
    'history': History,
    'task-detail': TaskDetail,

    // Report - 经营仓
    'company': ReportCompany,
    'ameba': ReportAmeba,
    'store': ReportStore,

    // Report - BI 中心
    'self-service-bi': SelfServiceBi,
    'comparison': DashboardCompare,

    // RBAC
    'user': RbacUser,
    'role': RbacRole,
    'permission': RbacPermission,
    'log': RbacLog,
    'apply': RbacApply,

    // Config
    'dimension': DimensionManagement,
    'notification': NotificationSettings,
    'data-dictionary': DataDictionary,
    'user-manual': UserManual,
}

// Current view state
const currentViewName = ref('todo')
const currentView = shallowRef<Component>(markRaw(TodoList))

export function useFinanceNavigation() {
    const navigateTo = (viewName: string) => {
        const component = viewComponents[viewName]
        if (component) {
            currentViewName.value = viewName
            currentView.value = markRaw(component)
        } else {
            console.warn(`Unknown view: ${viewName}`)
        }
    }

    const getCurrentViewName = () => currentViewName.value
    const getCurrentView = () => currentView.value

    return {
        currentViewName,
        currentView,
        navigateTo,
        getCurrentViewName,
        getCurrentView,
    }
}

export default useFinanceNavigation
