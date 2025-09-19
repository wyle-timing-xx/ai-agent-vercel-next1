'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Loader2, Database, Trash2, ArrowLeft, Home } from 'lucide-react'

interface TestResult {
  success: boolean
  message: string
  status?: string
  data?: any
  error?: string
  details?: string
  code?: string
  note?: string
  timestamp: string
}

export default function TestSupabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCleaning, setIsCleaning] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/test-supabase')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cleanTestData = async () => {
    setIsCleaning(true)
    
    try {
      const response = await fetch('/api/test-supabase', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        // 重新测试连接以获取最新状态
        await testConnection()
      } else {
        setTestResult(result)
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to clean test data',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsCleaning(false)
    }
  }

  const getStatusBadge = (success: boolean, status?: string) => {
    if (success) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connected
        </Badge>
      )
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Failed
        </Badge>
      )
    }
  }

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
          <h1 className="text-3xl font-bold mb-2">Supabase 连接测试</h1>
          <p className="text-gray-600">
            测试与 Vercel Supabase 数据库的连接状态，验证基本的 CRUD 操作。
          </p>
        </div>

        {/* 测试控制面板 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              数据库连接测试
            </CardTitle>
            <CardDescription>
              点击下面的按钮来测试 Supabase 数据库连接和基本操作。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button 
                onClick={testConnection} 
                disabled={isLoading || isCleaning}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    测试连接
                  </>
                )}
              </Button>
              
              {testResult?.success && (
                <Button 
                  variant="outline"
                  onClick={cleanTestData} 
                  disabled={isLoading || isCleaning}
                  className="flex items-center gap-2"
                >
                  {isCleaning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      清理中...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      清理测试数据
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 测试结果 */}
        {testResult && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>测试结果</CardTitle>
                {getStatusBadge(testResult.success, testResult.status)}
              </div>
              <CardDescription>
                测试时间: {new Date(testResult.timestamp).toLocaleString('zh-CN')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">消息</h4>
                <p className={`p-3 rounded-md ${testResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {testResult.message}
                </p>
              </div>

              {testResult.note && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">注意</h4>
                  <p className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
                    {testResult.note}
                  </p>
                </div>
              )}

              {testResult.error && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">错误信息</h4>
                  <p className="p-3 bg-red-50 text-red-800 rounded-md font-mono text-sm">
                    {testResult.details || testResult.error}
                    {testResult.code && (
                      <span className="block mt-1 text-xs opacity-75">
                        错误代码: {testResult.code}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {testResult.data && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">数据详情</h4>
                  <div className="space-y-3">
                    {testResult.data.insertedRecord && (
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">新插入的记录:</h5>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(testResult.data.insertedRecord, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {testResult.data.recentRecords && testResult.data.recentRecords.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">
                          最近的记录 ({testResult.data.totalRecords} 条):
                        </h5>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                          {JSON.stringify(testResult.data.recentRecords, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 设置说明 */}
        <Card>
          <CardHeader>
            <CardTitle>设置说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. 环境变量配置</h4>
              <p className="text-sm text-gray-600 mb-2">
                请确保在 <code className="bg-gray-100 px-1 rounded">.env.local</code> 文件中配置了以下环境变量:
              </p>
              <pre className="bg-gray-50 p-3 rounded text-xs">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`}
              </pre>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">2. 创建测试表</h4>
              <p className="text-sm text-gray-600 mb-2">
                如果这是第一次运行测试，请在 Supabase SQL 编辑器中执行以下 SQL:
              </p>
              <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`-- 创建测试连接表
CREATE TABLE IF NOT EXISTS test_connection (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_test_connection_updated_at 
    BEFORE UPDATE ON test_connection 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全性 (可选)
ALTER TABLE test_connection ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有操作 (仅用于测试)
CREATE POLICY "Allow all operations on test_connection" ON test_connection
  FOR ALL USING (true) WITH CHECK (true);`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}