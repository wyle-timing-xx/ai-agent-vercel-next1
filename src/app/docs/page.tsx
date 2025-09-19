import Link from 'next/link'
import { ArrowLeft, ExternalLink, Book, Settings, Database, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* 导航栏 */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        {/* 标题部分 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">项目文档</h1>
          <p className="text-gray-600">
            AI Agent Vercel Next1 项目的技术栈、配置和使用说明。
          </p>
        </div>

        {/* 技术栈 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              技术栈
            </CardTitle>
            <CardDescription>
              本项目使用的主要技术和框架
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">前端框架</h4>
                <div className="space-y-1">
                  <Badge variant="secondary">Next.js 15</Badge>
                  <Badge variant="secondary">React 19</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">样式与 UI</h4>
                <div className="space-y-1">
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Radix UI</Badge>
                  <Badge variant="secondary">Lucide Icons</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">数据与 AI</h4>
                <div className="space-y-1">
                  <Badge variant="secondary">Supabase</Badge>
                  <Badge variant="secondary">OpenAI API</Badge>
                  <Badge variant="secondary">Vercel AI SDK</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">状态管理</h4>
                <div className="space-y-1">
                  <Badge variant="secondary">Jotai</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">部署</h4>
                <div className="space-y-1">
                  <Badge variant="secondary">Vercel</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能模块 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>功能模块</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">AI 聊天系统</h4>
                  <p className="text-sm text-gray-600">
                    基于 OpenAI GPT 的智能对话，支持上下文理解和流式响应
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Database className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">数据库集成</h4>
                  <p className="text-sm text-gray-600">
                    Supabase PostgreSQL 数据库，支持实时数据和用户认证
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 环境配置 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>环境配置</CardTitle>
            <CardDescription>
              设置必要的环境变量以使项目正常运行
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">创建环境文件</h4>
              <p className="text-sm text-gray-600 mb-2">
                复制 <code className="bg-gray-100 px-1 rounded">.env.example</code> 到 <code className="bg-gray-100 px-1 rounded">.env.local</code>
              </p>
              <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`cp .env.example .env.local`}
              </pre>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">必需的环境变量</h4>
              <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key_here

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 可选：Vercel AI SDK 配置
# AI_SDK_LOG_LEVEL=info`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* 快速开始 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>快速开始</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-medium text-gray-900">克隆项目</h4>
                  <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded block mt-1">
                    git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
                  </code>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-medium text-gray-900">安装依赖</h4>
                  <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded block mt-1">
                    npm install
                  </code>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-medium text-gray-900">配置环境变量</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    设置 OpenAI API Key 和 Supabase 连接信息
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                  4
                </span>
                <div>
                  <h4 className="font-medium text-gray-900">启动开发服务器</h4>
                  <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded block mt-1">
                    npm run dev
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目结构 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>项目结构</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`src/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API 路由
│   │   └── test-supabase/ # Supabase 测试 API
│   ├── chat/              # AI 聊天页面
│   ├── test-supabase/     # 数据库测试页面
│   ├── docs/              # 文档页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # UI 组件库
│   ├── ChatInterface.tsx  # 聊天界面组件
│   └── SettingsPanel.tsx  # 设置面板组件
├── lib/                  # 工具库
│   ├── supabase.ts       # Supabase 客户端配置
│   └── utils.ts          # 工具函数
└── store/                # 状态管理
database/
└── setup.sql             # 数据库初始化脚本`}
            </pre>
          </CardContent>
        </Card>

        {/* 外部资源 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              相关文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">框架文档</h4>
                <div className="space-y-1">
                  <Link 
                    href="https://nextjs.org/docs" 
                    target="_blank" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    Next.js 文档 <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                  <br />
                  <Link 
                    href="https://tailwindcss.com/docs" 
                    target="_blank" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    Tailwind CSS 文档 <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">服务文档</h4>
                <div className="space-y-1">
                  <Link 
                    href="https://supabase.com/docs" 
                    target="_blank" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    Supabase 文档 <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                  <br />
                  <Link 
                    href="https://platform.openai.com/docs" 
                    target="_blank" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    OpenAI API 文档 <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}