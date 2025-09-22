export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          username: string | null
          created_at: string
        }
        Insert: {
          id?: number
          username?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          username?: string | null
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: number
          user_id: number | null
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: number | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: number | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: number
          conversation_id: number | null
          role: 'user' | 'assistant' | 'system' | null
          content: string | null
          created_at: string
        }
        Insert: {
          id?: number
          conversation_id?: number | null
          role?: 'user' | 'assistant' | 'system' | null
          content?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          conversation_id?: number | null
          role?: 'user' | 'assistant' | 'system' | null
          content?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}