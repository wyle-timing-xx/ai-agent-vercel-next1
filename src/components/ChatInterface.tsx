'use client';

import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useChat } from 'ai/react';
import { Send, Trash2, Bot, User, Settings, Menu, MessageSquare } from 'lucide-react';
import { messagesAtom, inputAtom, isLoadingAtom, clearChatAtom, agentPersonalityAtom } from '@/store/atoms';
import SettingsPanel from './SettingsPanel';
import ChatSidebar from './ChatSidebar';

export default function ChatInterface() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, clearChat] = useAtom(clearChatAtom);
  const [agentPersonality] = useAtom(agentPersonalityAtom);
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<number | undefined>();

  const {
    messages: chatMessages,
    input: chatInput,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading: chatIsLoading,
    setMessages: setChatMessages,
  } = useChat({
    api: '/api/chat',
    body: {
      conversationId: currentConversationId,
    },
    onResponse(response) {
      setIsLoading(true);
      // 从响应头获取对话ID
      const conversationId = response.headers.get('X-Conversation-ID');
      if (conversationId && !currentConversationId) {
        setCurrentConversationId(parseInt(conversationId));
      }
    },
    onFinish() {
      setIsLoading(false);
    },
  });

  // Sync chat messages with Jotai state
  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages, setMessages]);

  // Sync loading state
  useEffect(() => {
    setIsLoading(chatIsLoading);
  }, [chatIsLoading, setIsLoading]);

  // Sync input with Jotai state
  useEffect(() => {
    setInput(chatInput);
  }, [chatInput, setInput]);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await originalHandleSubmit(e);
  };

  // 处理清空聊天
  const handleClearChat = () => {
    clearChat();
    setChatMessages([]);
    setCurrentConversationId(undefined);
  };

  // 处理新建聊天
  const handleNewChat = () => {
    handleClearChat();
    setShowSidebar(false);
  };

  // 处理选择对话
  const handleSelectConversation = async (conversationId: number) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}`);
      if (response.ok) {
        const conversation = await response.json();
        
        // 将消息转换为 useChat 期望的格式
        const formattedMessages = conversation.messages?.map((msg: any) => ({
          id: msg.id?.toString() || Math.random().toString(),
          role: msg.role,
          content: msg.content,
          createdAt: new Date(msg.created_at),
        })) || [];

        setChatMessages(formattedMessages);
        setCurrentConversationId(conversationId);
        setShowSidebar(false);
      }
    } catch (error) {
      console.error('加载对话失败:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <ChatSidebar
        isOpen={showSidebar}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onClose={() => setShowSidebar(false)}
      />

      {/* 主聊天区域 */}
      <div className={`flex flex-col h-screen transition-all duration-300 ${
        showSidebar ? 'lg:ml-80' : ''
      } flex-1`}>
        <div className="flex flex-col h-full max-w-4xl mx-auto p-4 w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>聊天记录</span>
              </button>
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{agentPersonality.name}</h1>
                  <p className="text-sm text-gray-600">{agentPersonality.role}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={handleClearChat}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            </div>
          </div>

          {/* Agent Traits */}
          {agentPersonality.traits.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {agentPersonality.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Welcome to {agentPersonality.name}</h3>
                <p>I'm your {agentPersonality.role}. Start a conversation by typing a message below.</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Try asking me about:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• General questions and explanations</li>
                    <li>• Code help and programming guidance</li>
                    <li>• Creative writing and brainstorming</li>
                    <li>• Problem-solving assistance</li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white ml-12'
                        : 'bg-gray-100 text-gray-800 mr-12'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 p-4 rounded-lg bg-gray-100 text-gray-800 mr-12">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              value={chatInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading || !chatInput.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Settings Panel */}
          <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        </div>
      </div>

      {/* 移动端遮罩 */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}
