import { Database } from '@/types/database'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// 客户端 Supabase 实例 (用于客户端组件)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 服务端 Supabase 实例 (用于 API 路由和服务端组件)
export const createSupabaseServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (serviceRoleKey) {
    // 使用 service role key 获得更高权限
    return createClient(supabaseUrl, serviceRoleKey)
  } else {
    // 回退到 anon key
    return createClient(supabaseUrl, supabaseAnonKey)
  }
}




// 类型别名，方便使用
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
