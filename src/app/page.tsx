import Link from 'next/link'
import { Database, MessageSquare, Settings } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Agent Vercel Next
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            集成了 OpenAI、Supabase 的现代化 Next.js 应用程序。
            提供完整的 AI 对话和数据库连接功能。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* AI 聊天功能 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">AI 聊天</h2>
            </div>
            <p className="text-gray-600 mb-6">
              基于 OpenAI GPT 的智能对话系统，支持上下文理解和多轮对话。
            </p>
            <Link 
              href="/chat" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始对话
            </Link>
          </div>

          {/* Supabase 数据库 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">数据库测试</h2>
            </div>
            <p className="text-gray-600 mb-6">
              验证 Supabase 数据库连接状态，测试基本的 CRUD 操作功能。
            </p>
            <Link 
              href="/test-supabase" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              测试连接
            </Link>
          </div>

          {/* 项目配置 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">项目配置</h2>
            </div>
            <p className="text-gray-600 mb-6">
              查看项目的技术栈、环境配置和部署说明。
            </p>
            <Link 
              href="/docs" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              查看文档
            </Link>
          </div>
        </div>

        {/* 技术栈展示 */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">技术栈</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Tailwind CSS',
              'Supabase',
              'OpenAI API',
              'Vercel AI SDK',
              'Jotai'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white rounded-full shadow text-gray-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 快速开始 */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">快速开始</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h4 className="font-medium text-gray-900">安装依赖</h4>
                <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  npm install
                </code>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                2
              </span>
              <div>
                <h4 className="font-medium text-gray-900">配置环境变量</h4>
                <p className="text-sm text-gray-600">
                  复制 <code className="bg-gray-50 px-1 rounded">.env.example</code> 到 
                  <code className="bg-gray-50 px-1 rounded">.env.local</code>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                3
              </span>
              <div>
                <h4 className="font-medium text-gray-900">设置数据库</h4>
                <p className="text-sm text-gray-600">
                  在 Supabase Dashboard 中执行 
                  <code className="bg-gray-50 px-1 rounded">database/setup.sql</code>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                4
              </span>
              <div>
                <h4 className="font-medium text-gray-900">启动应用</h4>
                <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  npm run dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
