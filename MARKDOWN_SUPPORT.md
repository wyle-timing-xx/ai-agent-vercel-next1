# Markdown 支持功能

本次更新为聊天应用添加了完整的 Markdown 渲染支持，让AI助手的回复能够以更丰富的格式展示。

## 🆕 新增功能

### 1. Markdown 渲染组件 (MessageContent)
- **智能渲染**：AI助手消息支持完整的Markdown语法
- **用户消息保持原样**：用户输入的消息保持纯文本格式
- **代码高亮**：支持多种编程语言的语法高亮

### 2. 代码块功能
- **语言检测**：自动识别代码块的编程语言
- **一键复制**：每个代码块都有复制按钮
- **语法高亮**：使用深色主题的代码高亮样式
- **复制反馈**：复制成功后显示"已复制"提示

### 3. 支持的 Markdown 语法

#### 基础格式
- **粗体文本**：`**文本**` 或 `__文本__`
- *斜体文本*：`*文本*` 或 `_文本_`
- ~~删除线~~：`~~文本~~`
- `行内代码`：`` `代码` ``

#### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 列表
```markdown
- 无序列表项
- 另一个列表项

1. 有序列表项
2. 另一个有序列表项
```

#### 引用
```markdown
> 这是一个引用
> 可以是多行的
```

#### 代码块
````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

#### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

#### 链接
```markdown
[链接文本](https://example.com)
```

#### 分割线
```markdown
---
```

## 🎨 样式特性

### 代码块样式
- **深色主题**：使用深灰色背景，提供良好的对比度
- **语言标签**：在代码块顶部显示编程语言
- **复制按钮**：鼠标悬停时显示复制按钮
- **滚动条**：长代码自动出现水平滚动条

### 文本样式
- **标题层级**：不同级别的标题有不同的字体大小
- **列表缩进**：有序和无序列表都有合适的缩进
- **引用样式**：蓝色左边框，浅蓝色背景
- **链接样式**：蓝色文字，悬停时变深蓝色

### 表格样式
- **边框设计**：清晰的表格边框
- **表头突出**：表头使用灰色背景
- **响应式设计**：表格过宽时可水平滚动

## 🔧 技术实现

### 使用的库
- **react-markdown**：主要的Markdown渲染库
- **remark-gfm**：GitHub风格的Markdown扩展支持
- **lucide-react**：提供复制图标

### 核心组件
```typescript
// MessageContent 组件结构
interface MessageContentProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
}
```

### 智能渲染逻辑
```typescript
// 用户消息：纯文本显示
if (role === 'user') {
  return <div className="whitespace-pre-wrap">{content}</div>;
}

// AI消息：Markdown渲染
return <ReactMarkdown {...props}>{content}</ReactMarkdown>;
```

## 📝 使用示例

### AI助手现在可以输出格式化内容：

**代码示例：**
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 计算第10个斐波那契数
result = fibonacci(10)
print(f"第10个斐波那契数是: {result}")
```

**表格示例：**
| 功能 | 支持状态 | 说明 |
|------|----------|------|
| 代码高亮 | ✅ | 支持多种语言 |
| 表格渲染 | ✅ | 完整的表格支持 |
| 数学公式 | ❌ | 未来可能添加 |

**列表示例：**
1. 第一步：分析问题
2. 第二步：设计方案
3. 第三步：实现代码
4. 第四步：测试验证

## 🚀 性能优化

### 按需渲染
- 用户消息不进行Markdown解析，提高性能
- 只有AI助手消息才会进行复杂的Markdown渲染

### 代码复制优化
- 使用防抖机制避免重复复制
- 复制状态有2秒自动重置
- 只在鼠标悬停时显示复制按钮

### 样式优化
- 使用Tailwind CSS实现一致的设计语言
- 响应式设计，适配各种屏幕尺寸
- 合理的间距和排版，提升阅读体验

## 🔄 兼容性

### 浏览器支持
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

### 移动端优化
- 触摸友好的复制按钮
- 响应式表格设计
- 适配移动端的代码块滚动

## 🛠️ 开发说明

### 添加新的Markdown功能
如需添加新的Markdown功能，可以在 `MessageContent.tsx` 的 `components` 对象中添加新的组件：

```typescript
components={{
  // 自定义组件
  customElement({ children }) {
    return <div className="custom-style">{children}</div>;
  },
  // ... 其他组件
}}
```

### 自定义样式
可以通过修改 Tailwind CSS 类名来调整样式，或者添加自定义CSS。

## 📈 未来计划

- [ ] 数学公式支持 (LaTeX)
- [ ] 图表渲染支持 (Mermaid)
- [ ] 更多代码主题选择
- [ ] 自定义Markdown组件
- [ ] 导出Markdown格式的对话记录