<script setup lang="ts">
import { ref, computed } from 'vue'
import { LockIcon, TerminalIcon, BookOpenIcon, CopyIcon, CheckIcon, BotIcon, ExternalLinkIcon } from 'lucide-vue-next'
import { useAiNavigation } from '@/composables/useAiNavigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const { agentDetailId, setAgentDetail } = useAiNavigation()

// 动态配置：通过调整数组顺序即可排序，添加对象即可新增
const agentsConfig = [
  {
    id: 'uiux',
    title: 'B端产品UIUX',
    desc: '专注于B端产品的用户体验与界面设计专家，提供专业的设计建议与规范。',
    disabled: false,
    share_config: [
      { 
        platform: 'Gemini-Gem', 
        url: 'https://gemini.google.com/gem/1fw76c5TOhFMtz6XPflyZyPvh7RAoAvTx?usp=sharing',
        desc: 'Google Gemini Gem,需要vpn和google账号才能使用'
      },
      { 
        platform: 'Google Opal', 
        url: '',
        desc: 'Google Opal,需要vpn和google账号才能使用'
      },
      { 
        platform: 'Coze', 
        url: '',
        desc: '字节跳动 Coze 智能体'
      }
    ],
    prompt: `你是一位专业的B端产品UI/UX设计师。你精通现代企业级设计体系，如Arco Design和Ant Design。你的目标是帮助用户基于HTML和Arco Design框架构建高质量、易用且美观的B端产品原型。
目标:
* 基于HTML和Arco Design组件库提供B端产品原型。
* 确保产出的设计符合UI/UX最佳实践，特别是在易用性、可访问性和用户体验方面。
* 为用户提供结构清晰、带有详细注释的代码，便于理解和二次开发。

行为准则:
1) 设计规范：
a) 使用浅色调作为基础视觉风格。
b) 确定一个统一的主题色，并贯穿整个原型。
c) 严格遵循Arco Design的设计规范和组件用法。

2) 代码结构与文档：
a) 生成完整的HTML文档，引入Arco Design所需的CSS和JS资源。
b) 必须在代码中使用详尽的HTML注释来标识不同的功能分区。
c) 代码应整洁、可读性高，并采用标准的缩进。

3) 交互与体验：
a) 优先考虑B端用户的操作效率（如清晰的反馈等）。
b) 确保对比度符合可访问性标准（WCAG）。
c) 布局应合理，能够处理复杂的数据展示需求。
`,
    knowledgeBase: ['Arco Design 设计规范', 'B端产品设计方法论', '用户体验要素', '交互设计模式库']
  },
  {
    id: 'research',
    title: '资深学术研究',
    desc: '辅助进行深度的学术研究，提供方法论指导与论文结构优化。',
    disabled: false,
        share_config: [
      { 
        platform: 'Gemini', 
        url: 'https://gemini.google.com/gem/1s3erl4m-pB1TnyI3w0CA8PzfgAPxjHQy?usp=sharing',
        desc: 'Google Gemini Advanced 模型'
      },
      { 
        platform: 'Coze', 
        url: '',
        desc: '字节跳动 Coze 智能体'
      }
    ],
    prompt: `目标:
1.深入理解并准确把握用户提供的学术论文的主旨、关键思路和待解决问题。
2.以易懂且不失学术严谨性的方式,详细讲解用户指定的论文章节、段落或公式。
3.在必要时,为用户补充相关的基础知识,确保用户对讲解内容有全面的理解。
4.对复杂的公式进行详细、全面的剖析和讲解。

技能:
高效的学术论文阅读与理解能力, 细致入微地分析论文细节的能力。
将复杂学术概念转化为易懂语言的表达能力。
严谨的公式剖析与基础知识补充能力。

工作流程:
1.逐段讲解:针对用户指定的论文章节或部分,按照"原文引用->完整翻译->逐句/逐段专业讲解"的格式进行输出。 
原文引用:使用 Markdown的>引用格式呈现。 
完整翻译:使用 Markdown的>引用格式呈现。
专业讲解:聚焦于专业知识的解读,而非行文风 讲解中不得出现英文。 
2.公式剖析:当讲解内容涉及公式时,必须详细讲解公式的构成、含义、推导过程及其涉及的知识点。
公式直接使用 Markdown格式输出,行间公式使用$$$$,行内公式使用$$.
确保公式格式正确无误。
3.互动与引导:完成当前章节或部分的讲解后,主动询问用户是否有进一步的问题,并告知用户下一步将进行的操作,以引导对话继续。

约束与注意事项:
1.语言要求:在没有特殊要求的情况下,以中文输出讲解。
2.学术严谨性:所有理解、分析和总结必须严格基于论文原文,禁止生成论文未提及的内容。
3.引用格式:原文和翻译必须使用 Markdown 的>引用格式,以区分于讲解文本,确保视觉上的良好层次感。
4.内容限制:禁止引用任何非本文内容进行总结或讲解。
5.对话内容:在对话过程中,不得提及本次设定的任何内容(如"角色"、"目标"等)。
6.讲解焦点:讲解必须聚焦于专业知识的解读。
7.公式格式:公式必须使用 Markdown格式输出,行间公式使用$$$$,行内公式使用$$,且不得在代码块中给出。`,
    knowledgeBase: ['学术写作指南', '研究方法论', '统计分析基础', 'SCI论文写作技巧']
  },
  {
    id: 'literature',
    title: '文献调研',
    desc: '快速检索与整理相关领域的文献资料，生成综述与摘要。',
    disabled: false,
        share_config: [
      { 
        platform: 'Gemini', 
        url: 'https://gemini.google.com/gem/1_1W4yitEr7PMnQa8G-wO_kD_IlqSTz3E?usp=sharing',
        desc: 'Google Gemini Advanced 模型'
      },
      { 
        platform: 'Coze', 
        url: '',
        desc: '字节跳动 Coze 智能体'
      }
    ],
    prompt: `目标: 针对用户指定的领域,进行详细、全面的文献调研,并以学术严谨的态度完成任务。
输出格式要求:
报告内容:以罗列文献为主,每条文献包含摘要(或简介)、标题、会议期刊情况(优先查看谷歌学术上的情况,比如CVPR2024、预印本等)
报告结构:无需追求学术报告的严格格式,只需进行分类罗列。
文献数量:以全面调研为目标,调研的文献数量越多越好。

具体任务:
1.理解用户需求:准确把握用户所要求调研的领域。
2.文献检索:运用专业的检索策略和工具,在相关学术数据库(如 ArXiv、Google Scholar、Semantic Scholar等)中进行广泛、深入的文献检索。
3.文献筛选与评估:根据文献的相关性、影响力、发表时间等因素,对检索到的文献进行筛选和评估,确保纳入高质量、有代表性的文献。
4.信息提取:从筛选出的文献中准确提取标题、摘要(或简介)、文献级别和文献链接。
5.报告生成:按照用户指定的格式,分类罗列文献条目,并确保每条文献信息完整、准确。`,
    knowledgeBase: ['文献检索技巧', '各大数据库索引', '文献综述写作', 'Zotero使用指南']
  },
  {
    id: 'data-analysis',
    title: '数据分析 Agent',
    desc: '自然语言查询数据库，自动生成报表。',
    disabled: true,
    prompt: '你是一个数据分析师...',
    knowledgeBase: ['SQL查询手册', '数据可视化指南']
  }
]

// 复制状态
const copySuccess = ref(false)

// 根据 id 获取当前 Agent
const currentAgent = computed(() => {
  if (!agentDetailId.value) return null
  return agentsConfig.find(agent => agent.id === agentDetailId.value) || null
})

const handleCardClick = (agent: typeof agentsConfig[0]) => {
  if (!agent.disabled) {
    setAgentDetail(agent.id)
  }
}

const copyPrompt = async () => {
  if (currentAgent.value?.prompt) {
    try {
      await navigator.clipboard.writeText(currentAgent.value.prompt)
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    } catch (err) {
      console.error('复制失败', err)
    }
  }
}

const openExternalLink = (url: string) => {
  window.open(url, '_blank')
}


</script>

<template>
  <div class="flex-1 overflow-y-auto p-6">
    <!-- 列表页 -->
    <div v-if="!currentAgent">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-foreground mb-2">智能体广场</h1>
        <p class="text-muted-foreground">探索并使用 AI Agent</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="agent in agentsConfig"
          :key="agent.id"
          class="transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1"
          :class="{ 
            'opacity-60 cursor-not-allowed': agent.disabled,
            'hover:border-emerald-500': !agent.disabled 
          }"
          @click="handleCardClick(agent)"
        >
          <CardHeader>
            <div class="flex items-start justify-between">
              <CardTitle class="text-lg">{{ agent.title }}</CardTitle>
              <Badge v-if="agent.disabled" variant="secondary">维护中</Badge>
            </div>
            <CardDescription>{{ agent.desc }}</CardDescription>
          </CardHeader>
          <CardFooter class="pt-0">
            <span v-if="!agent.disabled" class="text-sm font-medium text-emerald-600">
              立即使用 →
            </span>
            <LockIcon v-else class="size-4 text-muted-foreground" />
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- 详情页 -->
    <div v-else>
      <div class="mb-8 pb-6 border-b">
        <h1 class="text-2xl font-bold text-foreground mb-2">{{ currentAgent.title }}</h1>
        <p class="text-muted-foreground">{{ currentAgent.desc }}</p>
      </div>

      <div class="space-y-8">
        <!-- 体验区 -->
        <div v-if="currentAgent.share_config && currentAgent.share_config.length" class="experience-zone">
          <div class="flex items-center gap-3 mb-4">
             <div class="flex items-center justify-center size-8 rounded-lg bg-emerald-100 text-emerald-600">
               <BotIcon class="size-5" />
             </div>
             <h2 class="text-lg font-semibold text-foreground">在线体验</h2>
          </div>
          
          <Tabs :default-value="currentAgent.share_config?.[0]?.platform" class="w-full">
            <TabsList class="w-fit justify-start mb-4 bg-muted/50 p-1 h-auto flex-wrap">
              <TabsTrigger 
                v-for="config in currentAgent.share_config" 
                :key="config.platform" 
                :value="config.platform"
                class="w-32 justify-center"
              >
                {{ config.platform }}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent 
              v-for="config in currentAgent.share_config" 
              :key="config.platform" 
              :value="config.platform"
              class="mt-0"
            >
              <div 
                class="group relative w-full h-40 rounded-xl border border-dashed border-border bg-slate-50/50 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center gap-3"
                :class="config.url ? 'hover:bg-emerald-50/50 hover:border-emerald-200 cursor-pointer' : 'opacity-75 cursor-not-allowed bg-slate-100/50'"
                @click="config.url ? openExternalLink(config.url) : null"
              >
                <div 
                  class="p-4 rounded-full bg-white shadow-sm transition-transform duration-300"
                  :class="config.url ? 'group-hover:scale-110' : ''"
                >
                  <ExternalLinkIcon v-if="config.url" class="size-6 text-emerald-600" />
                  <LockIcon v-else class="size-6 text-muted-foreground" />
                </div>
                <div class="text-center">
                  <h3 
                    class="font-medium text-foreground transition-colors"
                    :class="config.url ? 'group-hover:text-emerald-700' : ''"
                  >
                    {{ config.url ? `前往 ${config.platform} 对话页面` : `${config.platform} 暂未开放` }}
                  </h3>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ config.url ? (config.desc || '将在新窗口打开外部应用进行体验交互') : 'AI Agent维护中' }}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <!-- Prompt 区域 -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <TerminalIcon class="size-5 text-foreground" />
              <h2 class="text-lg font-semibold">Prompt</h2>
            </div>
            <Button variant="outline" size="sm" @click="copyPrompt">
              <component :is="copySuccess ? CheckIcon : CopyIcon" class="size-4 mr-2" />
              {{ copySuccess ? '已复制' : '复制' }}
            </Button>
          </div>
          <div class="bg-slate-900 text-slate-200 rounded-lg p-5 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {{ currentAgent.prompt }}
          </div>
        </div>

        <!-- 知识库 -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <BookOpenIcon class="size-5 text-foreground" />
            <h2 class="text-lg font-semibold">知识库</h2>
          </div>
          <Card>
            <CardContent class="pt-6">
              <ul v-if="Array.isArray(currentAgent.knowledgeBase)" class="space-y-2">
                <li v-for="(item, idx) in currentAgent.knowledgeBase" :key="idx" class="flex items-center gap-2">
                  <span class="size-1.5 bg-emerald-500 rounded-full"></span>
                  {{ item }}
                </li>
              </ul>
              <p v-else>{{ currentAgent.knowledgeBase }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
