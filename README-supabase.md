# Supabase 集成说明

本项目已集成 Supabase 数据库，提供完整的连接验证和测试功能。

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local` 并配置您的 Supabase 凭据：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI 配置（如果需要）
OPENAI_API_KEY=your-openai-api-key
```

### 3. 设置数据库

在 Supabase Dashboard 的 SQL 编辑器中运行 `database/setup.sql` 脚本：

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择您的项目
3. 进入 "SQL Editor"
4. 复制 `database/setup.sql` 的内容并执行

### 4. 运行应用程序

```bash
npm run dev
```

### 5. 测试连接

访问 `http://localhost:3000/test-supabase` 来测试 Supabase 连接。

## 项目结构

```
src/
├── lib/
│   └── supabase.ts          # Supabase 客户端配置
├── app/
│   ├── api/
│   │   └── test-supabase/
│   │       └── route.ts     # API 路由用于测试连接
│   └── test-supabase/
│       └── page.tsx         # 测试页面
├── components/
│   └── ui/                  # UI 组件
database/
└── setup.sql                # 数据库初始化脚本
```

## 功能特性

### ✅ 连接验证
- 基础连接测试
- 数据库通信验证
- 错误处理和详细报告

### ✅ CRUD 操作测试
- 创建记录
- 读取记录
- 数据清理

### ✅ 安全配置
- 行级安全性 (RLS)
- 环境变量保护
- 服务端和客户端分离

### ✅ 开发友好
- 详细的错误信息
- 可视化测试界面
- 完整的设置文档

## API 端点

### GET /api/test-supabase
测试 Supabase 连接并执行基本的 CRUD 操作。

**响应示例：**
```json
{
  "success": true,
  "message": "Supabase connection and operations successful!",
  "status": "connected",
  "data": {
    "insertedRecord": {...},
    "recentRecords": [...],
    "totalRecords": 5
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/test-supabase
清理测试数据。

## 数据库架构

### test_connection 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | BIGSERIAL | 主键，自增 |
| name | VARCHAR(255) | 用户名称 |
| email | VARCHAR(255) | 电子邮件 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 故障排除

### 常见问题

1. **连接失败**
   - 检查环境变量是否正确配置
   - 验证 Supabase 项目 URL 和密钥
   - 确认项目状态是否正常

2. **表不存在错误**
   - 运行 `database/setup.sql` 脚本
   - 检查 SQL 执行是否成功

3. **权限错误**
   - 验证 RLS 策略是否正确设置
   - 检查服务密钥权限

### 调试技巧

- 查看浏览器控制台的网络请求
- 检查 Supabase Dashboard 的日志
- 使用测试页面的详细错误信息

## 生产部署

### Vercel 部署

1. 在 Vercel 项目设置中添加环境变量
2. 确保所有 Supabase 配置正确
3. 部署并测试连接

### 安全注意事项

- 在生产环境中使用更严格的 RLS 策略
- 定期轮换数据库密钥
- 监控数据库访问日志
- 限制服务密钥的使用范围

## 扩展功能

您可以基于现有的架构添加更多功能：

- 用户认证集成
- 实时订阅
- 文件存储
- 边缘函数

## 支持

如果您遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查 Supabase 官方文档
3. 在项目仓库中创建 Issue

---

**注意：** 这是一个测试配置，在生产环境中请根据实际需求调整安全策略和权限设置。