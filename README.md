# AI Agent Vercel Next1 🤖

一个现代化的 AI 聊天应用，集成了 OpenAI GPT 和 Supabase 数据库，部署在 Vercel 平台上。

## ✨ 功能特性

- 🤖 **AI 智能对话** - 基于 OpenAI GPT 的智能聊天系统
- 💾 **Supabase 数据库** - 完整的数据库连接和 CRUD 操作
- 🔧 **连接验证** - 可视化的数据库连接测试界面
- 🎨 **现代化 UI** - 使用 Tailwind CSS 和 shadcn/ui 组件
- 🚀 **Vercel 部署** - 优化的生产环境部署
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🛠 技术栈

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **AI**: OpenAI API, Vercel AI SDK
- **Database**: Supabase (PostgreSQL)
- **State Management**: Jotai
- **Deployment**: Vercel

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
cd ai-agent-vercel-next1
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 环境配置

复制环境变量模板：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加您的 API 密钥：

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Vercel AI SDK Configuration
# AI_SDK_LOG_LEVEL=info
```

### 4. 数据库设置

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 进入 SQL Editor
3. 执行 `database/setup.sql` 中的 SQL 脚本

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📖 使用指南

### Supabase 连接测试

访问 `/test-supabase` 页面来：

- ✅ 验证数据库连接状态
- 🔄 测试 CRUD 操作
- 🧹 清理测试数据
- 📊 查看详细的连接报告

### AI 聊天功能

访问 `/chat` 页面开始与 AI 对话：

- 💬 支持多轮对话
- 🧠 上下文理解
- ⚡ 实时流式响应
- 📝 对话历史记录

## 🏗 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── test-supabase/ # Supabase 测试 API
│   ├── test-supabase/     # 数据库测试页面
│   └── page.tsx           # 主页
├── components/            # React 组件
│   └── ui/               # UI 组件库
├── lib/                  # 工具库
│   ├── supabase.ts       # Supabase 客户端配置
│   └── utils.ts          # 工具函数
└── store/                # 状态管理
database/
└── setup.sql             # 数据库初始化脚本
```

## 🔧 配置说明

### OpenAI API

1. 访问 [OpenAI Platform](https://platform.openai.com)
2. 创建 API Key
3. 将 Key 添加到 `OPENAI_API_KEY` 环境变量

### Supabase 配置

1. 在 [Supabase Dashboard](https://app.supabase.com) 创建项目
2. 获取项目 URL 和 API Keys：
   - `NEXT_PUBLIC_SUPABASE_URL`: 项目 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 匿名密钥
   - `SUPABASE_SERVICE_ROLE_KEY`: 服务角色密钥（可选，用于管理员操作）

## 🚀 部署

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wyle-timing-xx/ai-agent-vercel-next1)

1. Fork 此仓库
2. 在 Vercel 中导入项目
3. 添加环境变量
4. 部署完成

### 环境变量设置

在 Vercel 项目设置中添加：

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🔍 故障排除

### 常见问题

**1. Supabase 连接失败**
- 检查环境变量是否正确配置
- 验证 Supabase 项目状态
- 确认网络连接

**2. OpenAI API 错误**
- 验证 API Key 是否有效
- 检查账户余额
- 确认 API 使用限制

**3. 构建错误**
- 清除 `.next` 缓存：`rm -rf .next`
- 重新安装依赖：`rm -rf node_modules && npm install`

### 调试技巧

- 查看浏览器控制台错误
- 检查 Vercel 部署日志
- 使用 Supabase Dashboard 查看数据库日志

## 📚 文档

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解更多信息。

## 🙏 致谢

- [Vercel](https://vercel.com) - 部署平台
- [Supabase](https://supabase.com) - 数据库服务
- [OpenAI](https://openai.com) - AI 模型
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [Radix UI](https://radix-ui.com) - 无障碍组件

---

**⭐ 如果这个项目对您有帮助，请点个 Star！**
