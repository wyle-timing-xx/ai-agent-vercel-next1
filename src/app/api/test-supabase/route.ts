import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createSupabaseServerClient()
    
    // 测试 1: 基础连接测试
    console.log('Testing Supabase connection...')
    
    // 测试 2: 检查数据库连通性 - 获取当前时间
    const { data: timeData, error: timeError } = await supabase
      .from('test_connection')
      .select('*')
      .limit(1)
    
    if (timeError && timeError.code !== 'PGRST116') { // PGRST116 是表不存在的错误
      console.error('Database connection error:', timeError)
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: timeError.message,
        code: timeError.code
      }, { status: 500 })
    }
    
    // 测试 3: 尝试创建测试表（如果不存在）
    if (timeError?.code === 'PGRST116') {
      console.log('Test table does not exist, this is expected on first run')
      return NextResponse.json({
        success: true,
        message: 'Supabase connection successful',
        status: 'connected',
        note: 'Test table does not exist yet. Please run the SQL script to create it.',
        timestamp: new Date().toISOString()
      })
    }
    
    // 测试 4: 如果表存在，尝试插入和读取测试数据
    const testData = {
      name: `Test User ${Date.now()}`,
      email: `test${Date.now()}@example.com`
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('test_connection')
      .insert(testData)
      .select()
      .single()
    
    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({
        success: false,
        error: 'Failed to insert test data',
        details: insertError.message,
        code: insertError.code
      }, { status: 500 })
    }
    
    // 测试 5: 读取所有记录
    const { data: allData, error: selectError } = await supabase
      .from('test_connection')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (selectError) {
      console.error('Select error:', selectError)
      return NextResponse.json({
        success: false,
        error: 'Failed to read test data',
        details: selectError.message,
        code: selectError.code
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection and operations successful!',
      status: 'connected',
      data: {
        insertedRecord: insertData,
        recentRecords: allData,
        totalRecords: allData?.length || 0
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Supabase test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    const supabase = createSupabaseServerClient()
    
    // 清理测试数据
    const { error } = await supabase
      .from('test_connection')
      .delete()
      .neq('id', 0) // 删除所有记录
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to clean test data',
        details: error.message
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Test data cleaned successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Clean test data error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clean test data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
