import { createSupabaseServerClient } from './supabase'
import { Tables, Inserts } from './supabase'

export interface ChatMessage {
  id?: number
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at?: string
}

export interface Conversation {
  id?: number
  user_id?: number
  title?: string
  created_at?: string
  updated_at?: string
  messages?: ChatMessage[]
}

export class ChatService {
  private supabase = createSupabaseServerClient()

  // 创建新对话
  async createConversation(userId: number = 1, title?: string): Promise<Conversation | null> {
    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .insert({
          user_id: userId,
          title: title || '新对话'
        })
        .select()
        .single()

      if (error) {
        console.error('创建对话失败:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('创建对话异常:', error)
      return null
    }
  }

  // 保存消息
  async saveMessage(conversationId: number, role: 'user' | 'assistant' | 'system', content: string): Promise<ChatMessage | null> {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role,
          content
        })
        .select()
        .single()

      if (error) {
        console.error('保存消息失败:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('保存消息异常:', error)
      return null
    }
  }

  // 批量保存消息
  async saveMessages(conversationId: number, messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>): Promise<ChatMessage[]> {
    try {
      const messagesToInsert = messages.map(msg => ({
        conversation_id: conversationId,
        role: msg.role,
        content: msg.content
      }))

      const { data, error } = await this.supabase
        .from('messages')
        .insert(messagesToInsert)
        .select()

      if (error) {
        console.error('批量保存消息失败:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('批量保存消息异常:', error)
      return []
    }
  }

  // 获取对话列表
  async getConversations(userId: number = 1, limit: number = 20): Promise<Conversation[]> {
    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('获取对话列表失败:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('获取对话列表异常:', error)
      return []
    }
  }

  // 获取对话消息
  async getConversationMessages(conversationId: number): Promise<ChatMessage[]> {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('获取对话消息失败:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('获取对话消息异常:', error)
      return []
    }
  }

  // 获取完整对话（包含消息）
  async getConversationWithMessages(conversationId: number): Promise<Conversation | null> {
    try {
      const { data: conversation, error: convError } = await this.supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single()

      if (convError) {
        console.error('获取对话失败:', convError)
        return null
      }

      const messages = await this.getConversationMessages(conversationId)

      return {
        ...conversation,
        messages
      }
    } catch (error) {
      console.error('获取完整对话异常:', error)
      return null
    }
  }

  // 更新对话标题
  async updateConversationTitle(conversationId: number, title: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('conversations')
        .update({ title, updated_at: new Date() })
        .eq('id', conversationId)

      if (error) {
        console.error('更新对话标题失败:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('更新对话标题异常:', error)
      return false
    }
  }

  // 删除对话
  async deleteConversation(conversationId: number): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId)

      if (error) {
        console.error('删除对话失败:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('删除对话异常:', error)
      return false
    }
  }

  // 根据消息内容生成对话标题
  generateConversationTitle(firstMessage: string): string {
    // 取前30个字符作为标题，如果超过30个字符则截断并添加...
    const title = firstMessage.trim()
    if (title.length <= 30) {
      return title
    }
    return title.substring(0, 30) + '...'
  }
}

// 单例实例
export const chatService = new ChatService()
