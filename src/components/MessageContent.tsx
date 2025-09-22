'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';

interface MessageContentProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export default function MessageContent({ content, role }: MessageContentProps) {
  const [copiedCode, setCopiedCode] = React.useState<string>('');

  const copyToClipboard = async (text: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  // 如果是用户消息，直接显示文本，不需要markdown渲染
  if (role === 'user') {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // AI助手消息使用markdown渲染
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 代码块组件
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

            if (!inline && codeString.length > 0) {
              return (
                <div className="relative group my-4">
                  <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg">
                    <span className="text-gray-400">{language || 'code'}</span>
                    <button
                      onClick={() => copyToClipboard(codeString, codeId)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      title="复制代码"
                    >
                      {copiedCode === codeId ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="text-xs">已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="text-xs">复制</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto !mt-0">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // 段落组件
          p({ children }) {
            return <p className="mb-2 leading-relaxed text-gray-800">{children}</p>;
          },

          // 标题组件
          h1({ children }) {
            return <h1 className="text-xl font-bold mb-3 text-gray-900">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-lg font-bold mb-2 text-gray-900">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-base font-bold mb-2 text-gray-900">{children}</h3>;
          },

          // 列表组件
          ul({ children }) {
            return <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-800">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-gray-800">{children}</li>;
          },

          // 引用组件
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50 text-gray-700 italic">
                {children}
              </blockquote>
            );
          },

          // 链接组件
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {children}
              </a>
            );
          },

          // 表格组件
          table({ children }) {
            return (
              <div className="overflow-x-auto mb-3">
                <table className="min-w-full border border-gray-300 text-sm">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-50">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-b border-gray-200">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="px-3 py-2 text-left font-semibold text-gray-900 border-r border-gray-300">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-3 py-2 text-gray-700 border-r border-gray-300">
                {children}
              </td>
            );
          },

          // 水平分割线
          hr() {
            return <hr className="my-4 border-t border-gray-300" />;
          },

          // 强调文本
          strong({ children }) {
            return <strong className="font-semibold text-gray-900">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic text-gray-700">{children}</em>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}