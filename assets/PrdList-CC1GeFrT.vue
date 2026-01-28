<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ArrowLeft, 
  FileText, 
  Folder, 
  Search, 
  Grid, 
  List
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const emit = defineEmits(['navigate-back'])

const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')

// Mock Data
const documents = [
  {
    id: 1,
    title: '后台用户操作手册.pdf',
    date: '2025-10-24',
    size: '177 KB',
    type: 'PDF',
    status: 'Final',
    downloadable: true
  },
  {
    id: 2,
    title: 'aigenui-PRD.pdf',
    date: '2025-10-25',
    size: '1.2 MB',
    type: 'PDF',
    status: 'Draft',
    downloadable: false
  },
  {
    id: 3,
    title: 'aigenui-工作流.pdf',
    date: '2025-10-25',
    size: '1.2 MB',
    type: 'PDF',
    status: 'Draft',
    downloadable: false
  }
]

const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents
  const lowerQuery = searchQuery.value.toLowerCase()
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery)
  )
})

const goBack = () => {
  emit('navigate-back')
}

const handleDownload = (doc: any) => {
  if (doc.downloadable === false) {
    alert('该文档正在维护中，暂时无法下载')
    return
  }
  
  try {
    const fileUrl = new URL(`./${doc.title}`, import.meta.url).href
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = doc.title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Download failed:', error)
    alert(`无法下载文件: ${doc.title}。\n请确认文件是否存在于组件目录中。`)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Button variant="ghost" size="icon" @click="goBack" class="hover:bg-slate-100">
            <ArrowLeft class="w-5 h-5 text-slate-600" />
          </Button>
          <div class="flex items-center gap-2">
            <div class="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Folder class="w-5 h-5" />
            </div>
            <h1 class="text-lg font-semibold text-slate-900">PRD 文档库</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
            <!-- Search & View Toggle -->
            <div class="relative w-64 hidden md:block">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                v-model="searchQuery" 
                placeholder="搜索文档..." 
                class="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
                />
            </div>
            <div class="border-l border-slate-200 h-6 mx-2"></div>
            <div class="flex bg-slate-100 p-1 rounded-md">
                <button 
                    @click="viewMode = 'grid'"
                    class="p-1.5 rounded text-sm transition-all"
                    :class="viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'"
                >
                    <Grid class="w-4 h-4" />
                </button>
                <button 
                    @click="viewMode = 'list'"
                    class="p-1.5 rounded text-sm transition-all"
                    :class="viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'"
                >
                    <List class="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      
        <!-- Empty State (if needed) or List -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
                v-for="doc in filteredDocuments" 
                :key="doc.id" 
                class="group cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-indigo-200"
                @click="handleDownload(doc)"
            >
                <CardContent class="p-6 flex flex-col items-center text-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <FileText class="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <div class="space-y-1 w-full">
                        <h3 class="font-medium text-slate-900 truncate" :title="doc.title">{{ doc.title }}</h3>
                        <p class="text-xs text-slate-500">{{ doc.date }} · {{ doc.size }}</p>
                    </div>
                    <div class="w-full flex justify-between items-center pt-2 border-t border-slate-100">
                        <Badge variant="secondary" class="bg-slate-100 text-slate-600 font-normal">
                            {{ doc.type }}
                        </Badge>
                        <Badge :class="{
                            'bg-green-100 text-green-700 hover:bg-green-100': doc.status === 'Final',
                            'bg-yellow-100 text-yellow-700 hover:bg-yellow-100': doc.status === 'Draft',
                            'bg-blue-100 text-blue-700 hover:bg-blue-100': doc.status === 'Review'
                        }">{{ doc.status }}</Badge>
                    </div>
                </CardContent>
            </Card>

            <!-- Example "Add New" Placeholder -->
            <button class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-slate-50 transition-all gap-3 h-full min-h-[220px]">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <span class="text-2xl text-slate-400">+</span>
                </div>
                <span class="text-sm font-medium text-slate-500">上传新文档</span>
            </button>
        </div>

        <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table class="w-full text-sm text-left">
                <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                        <th class="px-6 py-4 font-medium">文档名称</th>
                        <th class="px-6 py-4 font-medium">类型</th>
                        <th class="px-6 py-4 font-medium">大小</th>
                        <th class="px-6 py-4 font-medium">最后更新</th>
                        <th class="px-6 py-4 font-medium">状态</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="doc in filteredDocuments" :key="doc.id" class="hover:bg-slate-50 transition-colors cursor-pointer group" @click="handleDownload(doc)">
                        <td class="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                            <FileText class="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                            {{ doc.title }}
                        </td>
                        <td class="px-6 py-4 text-slate-500">{{ doc.type }}</td>
                        <td class="px-6 py-4 text-slate-500">{{ doc.size }}</td>
                        <td class="px-6 py-4 text-slate-500">{{ doc.date }}</td>
                        <td class="px-6 py-4">
                            <Badge :class="{
                                'bg-green-100 text-green-700 hover:bg-green-100': doc.status === 'Final',
                                'bg-yellow-100 text-yellow-700 hover:bg-yellow-100': doc.status === 'Draft',
                                'bg-blue-100 text-blue-700 hover:bg-blue-100': doc.status === 'Review'
                            }">{{ doc.status }}</Badge>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </main>
  </div>
</template>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
