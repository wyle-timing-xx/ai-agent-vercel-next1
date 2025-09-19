# 🚀 快速启动指南

## 📋 前提条件

在开始之前，请确保您已经有以下账户和服务：

- [Supabase 账户](https://supabase.com) （免费）
- [OpenAI 账户](https://platform.openai.com) （需要 API 额度）
- [Node.js 18+](https://nodejs.org) 安装在本地

## 🎯 第一步：环境配置

### 1. 克隆项目并安装依赖

```bash
# 克隆项目
git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
cd ai-agent-vercel-next1

# 安装依赖
npm install
```

### 2. 设置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加以下配置：

```env
# OpenAI API Key - 从 https://platform.openai.com/api-keys 获取
OPENAI_API_KEY=sk-your-openai-api-key

# Supabase 配置 - 从 Supabase Dashboard 项目设置中获取
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🗄️ 第二步：Supabase 数据库设置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://app.supabase.com)
2. 点击 "New project"
3. 选择组织，输入项目名称，设置数据库密码
4. 等待项目创建完成

### 2. 执行数据库脚本

1. 在 Supabase Dashboard 中，进入 "SQL Editor"
2. 复制 `database/setup.sql` 文件中的全部内容
3. 粘贴到 SQL Editor 中并点击 "RUN"
4. 确认看到成功消息

### 3. 获取 API Keys

在 Supabase Dashboard 的项目设置中：
- 进入 "API" 标签页
- 复制 "Project URL" 到 `NEXT_PUBLIC_SUPABASE_URL`
- 复制 "anon public" key 到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 复制 "service_role" key 到 `SUPABASE_SERVICE_ROLE_KEY`

## 🤖 第三步：OpenAI API 设置

### 1. 获取 API Key

1. 访问 [OpenAI Platform](https://platform.openai.com)
2. 登录并进入 [API Keys](https://platform.openai.com/api-keys) 页面
3. 点击 "Create new secret key"
4. 复制生成的 key 到 `OPENAI_API_KEY`

### 2. 确保账户有额度

- 查看 [Usage](https://platform.openai.com/usage) 页面确认有可用额度
- 新账户通常会有免费试用额度

## 🚀 第四步：启动项目

```bash
# 启动开发服务器
npm run dev
```

现在您可以访问：
- **首页**: http://localhost:3000
- **数据库测试**: http://localhost:3000/test-supabase
- **AI 聊天**: http://localhost:3000/chat
- **项目文档**: http://localhost:3000/docs

## ✅ 验证设置

### 1. 测试数据库连接

1. 访问 http://localhost:3000/test-supabase
2. 点击 "测试连接" 按钮
3. 如果看到绿色的 "Connected" 状态，说明数据库配置正确

### 2. 测试 AI 聊天

1. 访问 http://localhost:3000/chat
2. 在输入框中输入任何消息
3. 如果收到 AI 回复，说明 OpenAI API 配置正确

## 🔧 常见问题

### 数据库连接失败

**错误**: "Database connection failed"
**解决方案**:
1. 检查 Supabase URL 和 API keys 是否正确
2. 确认项目状态正常（在 Supabase Dashboard 中）
3. 验证是否已执行数据库初始化脚本

### OpenAI API 错误

**错误**: "API key not found" 或 "Insufficient quota"
**解决方案**:
1. 检查 API key 是否正确设置
2. 确认账户有可用额度
3. 检查 API key 的使用限制

### 表不存在错误

**错误**: "relation does not exist"
**解决方案**:
1. 确认已在 Supabase SQL Editor 中执行了 `database/setup.sql`
2. 检查 RLS 策略是否正确设置
3. 验证表是否在 "public" schema 中

### 页面无法访问

**错误**: 404 Not Found
**解决方案**:
1. 确认 Next.js 开发服务器正在运行
2. 检查路由是否存在
3. 重启开发服务器: `npm run dev`

## 🚢 部署到 Vercel

### 1. 连接 GitHub

1. 将代码推送到您的 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project" 并选择您的仓库

### 2. 设置环境变量

在 Vercel 项目设置中添加相同的环境变量：
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. 部署

点击 "Deploy" 按钮，等待部署完成。

## 📞 需要帮助？

如果遇到问题：
1. 查看浏览器控制台的错误信息
2. 检查 Next.js 开发服务器的日志
3. 访问 [GitHub Issues](https://github.com/wyle-timing-xx/ai-agent-vercel-next1/issues)

---

**🎉 恭喜！您的 AI Agent 应用已经准备就绪！**
