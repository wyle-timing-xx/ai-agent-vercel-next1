# 聊天历史记录和对话切换功能

本次更新为聊天应用添加了完整的聊天历史记录和对话切换功能。

## 🆕 新增功能

### 1. 聊天侧边栏 (ChatSidebar)
- **对话列表展示**：显示所有历史对话，按更新时间倒序排列
- **搜索功能**：可以按标题搜索对话
- **对话管理**：
  - 重命名对话标题（双击或点击编辑图标）
  - 删除对话（点击删除图标）
  - 新建对话（点击加号按钮）

### 2. 对话切换功能
- **无缝切换**：点击侧边栏中的任意对话可立即切换并加载历史消息
- **状态保持**：当前对话会在侧边栏中高亮显示
- **自动保存**：每次聊天都会自动创建或更新对话记录

### 3. 响应式设计
- **桌面端**：侧边栏固定在左侧，可通过按钮切换显示/隐藏
- **移动端**：侧边栏以抽屉形式出现，支持手势关闭

## 🔧 API接口

### 对话管理接口

#### 获取对话列表
```
GET /api/conversations
```
返回用户的所有对话列表

#### 获取特定对话
```
GET /api/conversations/[id]
```
返回指定对话及其所有消息

#### 更新对话标题
```
PATCH /api/conversations/[id]
```
更新对话的标题

#### 删除对话
```
DELETE /api/conversations/[id]
```
删除指定对话及其所有消息

## 💾 数据库结构

项目使用 Supabase 作为数据库，包含以下表：

### 1. users 表
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 2. conversations 表
```sql
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  title VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 3. messages 表
```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT REFERENCES conversations(id),
  role VARCHAR(20) CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🚀 使用方法

### 1. 开启聊天历史
在聊天界面点击"聊天记录"按钮打开侧边栏：
- 桌面端：点击左上角的"聊天记录"按钮
- 移动端：点击汉堡菜单按钮

### 2. 管理对话
- **查看历史**：侧边栏显示所有历史对话，最新的在顶部
- **切换对话**：点击任意对话可立即切换并加载历史消息
- **搜索对话**：使用搜索框快速找到特定对话
- **重命名对话**：鼠标悬停在对话上，点击编辑图标进行重命名
- **删除对话**：鼠标悬停在对话上，点击删除图标删除对话

### 3. 新建对话
- 点击侧边栏顶部的"+"按钮
- 或点击主界面的"Clear Chat"按钮

## 🛠️ 技术实现

### 核心组件
1. **ChatSidebar.tsx** - 聊天历史侧边栏组件
2. **ChatInterface.tsx** - 主聊天界面，集成了侧边栏
3. **chat-service.ts** - 数据库操作服务
4. **API Routes** - RESTful API接口

### 数据流程
1. 用户发送消息 → API保存到数据库
2. AI回复生成 → API保存回复到数据库
3. 对话自动创建/更新时间戳
4. 侧边栏实时显示对话列表

### 状态管理
- 使用 Jotai 进行全局状态管理
- 使用 useChat hook 处理聊天逻辑
- 本地状态管理对话ID和侧边栏显示状态

## 📱 界面特性

### 桌面端体验
- 宽屏显示，侧边栏和主聊天区域并排显示
- 流畅的动画过渡效果
- 鼠标悬停显示操作按钮

### 移动端体验
- 抽屉式侧边栏，不占用主要聊天空间
- 触摸友好的按钮大小
- 遮罩层防止误操作

## 🔄 自动化功能

### 智能标题生成
- 新对话标题基于第一条用户消息自动生成
- 标题长度限制为30字符，超出部分用省略号显示

### 时间显示
- 相对时间显示（如"5分钟前"、"2小时前"）
- 自动处理各种时间格式

### 数据同步
- 对话列表自动刷新
- 删除对话后自动清理界面状态
- 切换对话时自动加载历史消息

## 🐛 错误处理

- API调用失败的优雅降级
- 网络错误的用户友好提示
- 数据加载状态的视觉反馈
- 输入验证和边界情况处理

## 🔐 安全考虑

- 使用用户ID隔离数据（默认user_id=1）
- SQL注入防护（Supabase自动处理）
- 输入验证和清理
- CORS和API端点保护

## 📈 性能优化

- 按需加载对话列表
- 消息分页（可扩展）
- 组件懒加载
- 状态更新优化

## 🔧 配置要求

确保以下环境变量已配置：
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 待开发功能

- [ ] 消息搜索功能
- [ ] 对话分类/标签
- [ ] 对话导出功能
- [ ] 多用户支持
- [ ] 消息分页加载
- [ ] 对话收藏功能