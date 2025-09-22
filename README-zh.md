# AI 智能助手 - Vercel AI SDK + Jotai

一个基于 Next.js 15、Vercel AI SDK 和 Jotai 状态管理构建的现代化 AI 聊天机器人应用。

## 功能特性

- 🤖 **AI 聊天界面**：与 OpenAI GPT 模型进行交互式聊天
- 🧠 **状态管理**：基于 Jotai 的响应式状态管理
- ⚡ **流式响应**：使用 Vercel AI SDK 实现 AI 响应的实时流式传输
- 🎛️ **可定制设置**：调整模型参数、温度和智能助手个性
- 🎨 **现代化界面**：使用 Tailwind CSS 的简洁响应式设计
- 🚀 **Next.js 15**：基于最新 Next.js 和 App Router 构建
- 📱 **移动端响应式**：针对所有设备尺寸进行优化

## 技术栈

- **前端**：Next.js 15、React 19、TypeScript
- **样式**：Tailwind CSS 4
- **状态管理**：Jotai
- **AI 集成**：Vercel AI SDK、OpenAI
- **图标**：Lucide React
- **包管理器**：PNPM（推荐）
- **开发**：Turbopack、ESLint

## 先决条件

在运行此项目之前，请确保您具备：

- **Node.js** 版本 18.0 或更高（[点此下载](https://nodejs.org/)）
- **包管理器**：PNPM（推荐）、npm 或 yarn
- **OpenAI API 密钥**（[点此获取](https://platform.openai.com/api-keys)）

### 安装 PNPM（推荐）

如果您尚未安装 PNPM：

```bash
npm install -g pnpm
```

或使用 curl：
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## 快速开始

### 步骤 1：克隆仓库

```bash
git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
cd ai-agent-vercel-next1
```

### 步骤 2：安装依赖

选择以下命令之一：

```bash
# 使用 PNPM（推荐）
pnpm install

# 使用 npm
npm install

# 使用 yarn
yarn install
```

### 步骤 3：配置环境变量

1. **复制环境变量模板：**
   ```bash
   cp .env.example .env.local
   ```

2. **编辑 `.env.local` 文件：**
   ```bash
# OpenAI API Configuration
DEEPSEEK_API_KEY=


# Optional: Vercel AI SDK Configuration
# AI_SDK_LOG_LEVEL=info
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
SUPABASE_JWT_SECRET=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
POSTGRES_PRISMA_URL=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
POSTGRES_URL_NON_POOLING=
   ```

3. **添加您的密钥：**
   ```env
  OpenAI API Configuration
DEEPSEEK_API_KEY=


# Optional: Vercel AI SDK Configuration
# AI_SDK_LOG_LEVEL=info
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
SUPABASE_JWT_SECRET=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
POSTGRES_PRISMA_URL=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
POSTGRES_URL_NON_POOLING=
   ```

   **⚠️ 重要提示：** 
   - 将 `sk-your-actual-openai-api-key-here` 替换为您实际的 OpenAI API 密钥
   - 切勿将 `.env.local` 文件提交到版本控制系统
   - 密钥应以 `sk-` 开头，后跟一长串字符

### 步骤 4：运行开发服务器

```bash
# 使用 PNPM（推荐）
pnpm dev

# 使用 npm
npm run dev

# 使用 yarn
yarn dev
```

### 步骤 5：在浏览器中打开

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用程序。

您应该会看到 AI 助手界面已准备就绪！




## 项目结构

```
ai-agent-vercel-next1/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # AI 聊天 API 端点
│   │   ├── favicon.ico
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.tsx            # 根布局与 Jotai Provider
│   │   └── page.tsx              # 主页
│   ├── components/
│   │   ├── ChatInterface.tsx     # 主聊天界面
│   │   └── SettingsPanel.tsx     # 设置配置面板
│   └── store/
│       └── atoms.ts              # Jotai 状态原子
├── .env.example                  # 环境变量模板
├── .env.local                    # 您的环境变量（需要创建）
├── .gitignore
├── next.config.ts                # Next.js 配置
├── package.json                  # 依赖和脚本
├── pnpm-lock.yaml               # PNPM 锁定文件
├── postcss.config.mjs           # PostCSS 配置
├── tailwind.config.ts           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── README.md
```

## 可用脚本

```bash
# 使用 Turbopack 的开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 运行代码检查
pnpm lint
```

## 使用指南

### 基础聊天

1. 在底部的消息输入框中开始输入
2. 按回车键或点击发送按钮（📤）
3. 观看 AI 实时流式响应
4. 自然地继续对话

### 自定义设置

3. 点击"保存设置"应用更改

### 清除聊天

点击页头的"清除聊天"按钮（🗑️）开始新的对话。

## 故障排除

### 常见问题

**1. "找不到 OpenAI API 密钥"错误：**
- 确保您已创建 `.env.local` 文件
- 验证您的 API 密钥已正确设置在文件中
- 添加密钥后重启开发服务器

**2. 依赖安装失败：**
- 尝试删除 `node_modules` 和 `pnpm-lock.yaml`
- 重新运行 `pnpm install`
- 确保您安装了 Node.js 18+

**3. 端口 3000 已被占用：**
- 服务器会自动尝试下一个可用端口
- 或指定自定义端口：`pnpm dev -- --port 3001`

**4. 构建失败：**
- 运行 `pnpm lint` 检查代码问题
- 确保解决所有 TypeScript 错误
- 验证所有环境变量已设置

### 性能提示

- 使用 **GPT-3.5 Turbo** 获得更快响应和更低成本
- 调整 **最大令牌数** 控制响应长度和成本
- 降低 **温度** 获得更一致的响应

## 部署

### 部署到 Vercel（推荐）

1. **将代码推送到 GitHub**（如果尚未完成）

2. **连接到 Vercel：**
   - 前往 [vercel.com](https://vercel.com)
   - 点击"新建项目"
   - 导入您的 GitHub 仓库
   - Vercel 会自动检测这是一个 Next.js 项目


4. **部署：**
   - 点击"部署"
   - 您的应用将在 `https://your-project.vercel.app` 可用

### 部署到其他平台

该应用可以部署到任何支持 Next.js 的平台：
- **Netlify**：使用 `npm run build` 并部署 `.next` 文件夹
- **Railway**：连接您的 GitHub 仓库并设置环境变量
- **Digital Ocean**：使用其 Node.js App 平台
- **AWS/Google Cloud**：使用其各自的托管服务

**记住在您的部署平台上设置 `OPENAI_API_KEY` 环境变量。**

## 使用 Jotai 进行状态管理

该应用使用 Jotai 原子进行状态管理：

- `messagesAtom`：存储聊天消息
- `inputAtom`：当前输入值  
- `isLoadingAtom`：加载状态
- `chatConfigAtom`：聊天配置（模型、温度等）
- `agentPersonalityAtom`：助手个性设置
- `clearChatAtom`：清除聊天历史的操作

### Jotai 的优势

- **原子化**：自下而上的状态管理方法
- **响应式**：组件在状态变化时自动重新渲染  
- **TypeScript**：完整的 TypeScript 支持
- **性能**：只重新渲染使用已更改原子的组件
- **简单**：与其他状态管理解决方案相比样板代码最少


## 贡献

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature-name`
3. 进行更改
4. 运行测试：`pnpm lint`
5. 提交：`git commit -am 'Add some feature'`
6. 推送：`git push origin feature-name`
7. 创建 Pull Request

## 许可证

此项目是开源的，在 [MIT 许可证](LICENSE) 下可用。

## 支持

如果您遇到任何问题：

1. 查看此 README 的常见解决方案
2. 浏览 [GitHub Issues](https://github.com/wyle-timing-xx/ai-agent-vercel-next1/issues)
3. 创建新的问题，包含：
   - 您的 Node.js 版本（`node --version`）
   - 包管理器和版本（`pnpm --version`）
   - 错误消息（如果有）
   - 重现问题的步骤

## 致谢

- 使用 [Vercel AI SDK](https://sdk.vercel.ai/) 构建
- 状态管理由 [Jotai](https://jotai.org/) 提供
- 基于 [Next.js](https://nextjs.org/) 构建
- UI 组件来自 [Lucide React](https://lucide.dev/)

---

⭐ **如果您觉得这个仓库有帮助，请给它一个星星！**