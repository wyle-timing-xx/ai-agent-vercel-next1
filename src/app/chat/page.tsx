import ChatInterface from '@/components/ChatInterface'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <div className="container mx-auto px-4 py-4 lg:hidden">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Link>
      </div>
      
      {/* 聊天界面 */}
      <main className="h-screen bg-gray-50">
        <ChatInterface />
      </main>
    </div>
  )
}