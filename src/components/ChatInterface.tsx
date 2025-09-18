'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { useChat } from 'ai/react';
import { Send, Trash2, Bot, User } from 'lucide-react';
import { messagesAtom, inputAtom, isLoadingAtom, clearChatAtom } from '@/store/atoms';

export default function ChatInterface() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, clearChat] = useAtom(clearChatAtom);

  const {
    messages: chatMessages,
    input: chatInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatIsLoading,
    setMessages: setChatMessages,
  } = useChat({
    api: '/api/chat',
    onResponse() {
      setIsLoading(true);
    },
    onFinish() {
      setIsLoading(false);
    },
  });

  // Sync chat messages with Jotai state
  React.useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages, setMessages]);

  // Sync loading state
  React.useEffect(() => {
    setIsLoading(chatIsLoading);
  }, [chatIsLoading, setIsLoading]);

  // Sync input with Jotai state
  React.useEffect(() => {
    setInput(chatInput);
  }, [chatInput, setInput]);

  const handleClearChat = () => {
    clearChat();
    setChatMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
        </div>
        <button
          onClick={handleClearChat}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Welcome to AI Assistant</h3>
            <p>Start a conversation by typing a message below.</p>
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
    </div>
  );
}
