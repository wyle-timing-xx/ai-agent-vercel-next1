# 🔧 故障排除指南

如果您遇到 **"Module not found: Can't resolve '@/lib/supabase'"** 错误，请按照以下步骤解决：

## ✅ 解决方案

### 1. 确认文件存在
检查以下文件是否存在：
- `src/lib/supabase.ts` ✅ (已创建)
- `src/lib/utils.ts` ✅ (已存在)

### 2. 重新安装依赖
```bash
# 删除 node_modules 和 lock 文件
rm -rf node_modules
rm package-lock.json

# 重新安装
npm install
```

### 3. 清除 Next.js 缓存
```bash
# 删除 .next 缓存目录
rm -rf .next

# 重新启动开发服务器
npm run dev
```

### 4. 检查 TypeScript 配置
确认 `tsconfig.json` 中有正确的路径映射：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. 重启 VS Code (如果使用)
有时 VS Code 的 TypeScript 服务需要重启：
- `Ctrl/Cmd + Shift + P`
- 输入 "TypeScript: Restart TS Server"
- 选择并执行

## 🚀 验证修复

运行以下命令确认问题已解决：

```bash
npm run dev
```

如果看到类似输出且没有错误，说明问题已解决：
```
✓ Ready in 2.3s
✓ Local:        http://localhost:3000
✓ Network:      http://192.168.1.100:3000
```

## 📁 当前项目结构

```
src/
├── app/
│   ├── api/
│   │   └── test-supabase/route.ts
│   ├── chat/page.tsx
│   ├── docs/page.tsx  
│   ├── test-supabase/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   ├── ChatInterface.tsx
│   └── SettingsPanel.tsx
├── lib/
│   ├── supabase.ts ✅
│   └── utils.ts ✅
└── store/
```

## 🔄 其他常见问题

### 问题: "Cannot find module '@/components/ui/button'"
**解决方案**: 确认所有 UI 组件都已创建，或临时注释掉导入语句。

### 问题: Supabase 连接失败  
**解决方案**: 
1. 检查 `.env.local` 文件中的环境变量
2. 确认 Supabase 项目状态正常
3. 运行数据库设置脚本

### 问题: 页面 404 错误
**解决方案**: 
1. 确认页面文件在正确的目录下
2. 文件名必须是 `page.tsx`
3. 重启开发服务器

## 💡 预防措施

1. **定期清理缓存**:
   ```bash
   npm run dev -- --reset-cache
   ```

2. **使用绝对导入**:
   ```typescript
   // ✅ 推荐
   import { supabase } from '@/lib/supabase'
   
   // ❌ 避免
   import { supabase } from '../../../lib/supabase'
   ```

3. **检查文件扩展名**: 确保使用 `.ts` 或 `.tsx`

## 📞 仍需帮助？

如果问题仍然存在：

1. 检查浏览器控制台的完整错误信息
2. 查看终端中的详细错误日志
3. 确认 Node.js 版本 >= 18
4. 在项目 GitHub Issues 中报告问题

---

**⚡ 快速修复命令**:
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```
