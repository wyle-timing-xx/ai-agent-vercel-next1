-- Supabase 数据库设置脚本
-- 请在 Supabase Dashboard 的 SQL 编辑器中运行此脚本

-- 1. 创建测试连接表
CREATE TABLE IF NOT EXISTS test_connection (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. 为测试表创建更新触发器
DROP TRIGGER IF EXISTS update_test_connection_updated_at ON test_connection;
CREATE TRIGGER update_test_connection_updated_at 
    BEFORE UPDATE ON test_connection 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. 启用行级安全性 (RLS)
ALTER TABLE test_connection ENABLE ROW LEVEL SECURITY;

-- 5. 创建策略允许所有操作 (仅用于测试目的)
-- 注意：在生产环境中，您应该创建更严格的安全策略
DROP POLICY IF EXISTS "Allow all operations on test_connection" ON test_connection;
CREATE POLICY "Allow all operations on test_connection" ON test_connection
  FOR ALL USING (true) WITH CHECK (true);

-- 6. 插入一些示例数据用于测试
INSERT INTO test_connection (name, email) VALUES 
  ('张三', 'zhangsan@example.com'),
  ('李四', 'lisi@example.com'),
  ('王五', 'wangwu@example.com')
ON CONFLICT DO NOTHING;

-- 7. 创建一个视图来查看表结构信息
CREATE OR REPLACE VIEW test_connection_info AS
SELECT 
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE tablename = 'test_connection';

-- 8. 创建一个函数来获取连接状态
CREATE OR REPLACE FUNCTION get_connection_status()
RETURNS TABLE(
  status TEXT,
  table_exists BOOLEAN,
  record_count BIGINT,
  last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'connected'::TEXT as status,
    EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'test_connection') as table_exists,
    (SELECT COUNT(*) FROM test_connection) as record_count,
    (SELECT MAX(updated_at) FROM test_connection) as last_updated;
END;
$$ LANGUAGE plpgsql;

-- 完成消息
DO $$
BEGIN
  RAISE NOTICE 'Supabase 测试数据库设置完成！';
  RAISE NOTICE '表 test_connection 已创建并配置了 RLS 策略。';
  RAISE NOTICE '您现在可以运行 Next.js 应用程序中的连接测试了。';
END $$;