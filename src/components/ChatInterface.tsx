'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useChat } from '@ai-sdk/react';
import { Send, Trash2, Bot, User, Settings } from 'lucide-react';
import { messagesAtom, inputAtom, isLoadingAtom, clearChatAtom, agentPersonalityAtom, CompatibleMessage } from '@/store/atoms';
import SettingsPanel from './SettingsPanel';

export default function ChatInterface() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, clearChat] = useAtom(clearChatAtom);
  const [agentPersonality] = useAtom(agentPersonalityAtom);
  const [showSettings, setShowSettings] = useState(false);

  // Local input state since useChat no longer manages it
  const [localInput, setLocalInput] = useState('');

  const {
    messages: chatMessages,
    sendMessage,
    stop,
    regenerate,
    status,
    error,
    setMessages: setChatMessages,
  } = useChat({
    api: '/api/chat',
    onFinish: (options) => {
      setIsLoading(false);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Chat error:', error);
    },
  });

  // Convert UIMessage to CompatibleMessage for consistency
  const convertMessages = (uiMessages: any[]): CompatibleMessage[] => {
    return uiMessages.map((msg) => ({
      id: msg.id || '',
      role: msg.role,
      content: msg.content || '',
      parts: msg.parts,
      status: msg.status,
      metadata: msg.metadata,
    }));
  };

  // Sync chat messages with Jotai state
  React.useEffect(() => {
    const convertedMessages = convertMessages(chatMessages);
    setMessages(convertedMessages);
  }, [chatMessages, setMessages]);

  // Sync loading state based on status
  React.useEffect(() => {
    const loading = status === 'streaming' || status === 'submitted';
    setIsLoading(loading);
  }, [status, setIsLoading]);

  // Sync input with Jotai state
  React.useEffect(() => {
    setInput(localInput);
  }, [localInput, setInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!localInput.trim() || status === 'streaming' || status === 'submitted') return;

    const messageContent = localInput.trim();
    setLocalInput(''); // Clear input immediately for better UX
    setIsLoading(true);

    try {
      // Use the correct message format for AI SDK 5.0
      await sendMessage({
        role: 'user',
        content: messageContent,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    clearChat();
    setChatMessages([]);
    setLocalInput('');
    stop(); // Stop any ongoing generation
  };

  const handleRegenerate = () => {
    if (chatMessages.length > 0) {
      regenerate();
    }
  };

  // Check if currently loading
  const currentlyLoading = status === 'streaming' || status === 'submitted';

  // Helper function to render message content safely
  const renderMessageContent = (message: CompatibleMessage) => {
    // Try to render parts first (new SDK format)
    if (message.parts && Array.isArray(message.parts) && message.parts.length > 0) {
      return message.parts.map((part, partIndex) => {
        // Handle different part types safely
        if (typeof part === 'object' && part !== null) {
          // Check for text property
          if ('text' in part && typeof part.text === 'string') {
            return <span key={partIndex}>{part.text}</span>;
          }
          // Check for content property as fallback
          if ('content' in part && typeof part.content === 'string') {
            return <span key={partIndex}>{part.content}</span>;
          }
        }
        // Fallback for string parts
        if (typeof part === 'string') {
          return <span key={partIndex}>{part}</span>;
        }
        return null;
      });
    }
    
    // Fallback to content property (backward compatibility)
    return message.content || '';
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{agentPersonality.name}</h1>
            <p className="text-sm text-gray-600">{agentPersonality.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          {chatMessages.length > 0 && (
            <button
              onClick={handleRegenerate}
              disabled={currentlyLoading}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <span>Regenerate</span>
            </button>
          )}
          <button
            onClick={handleClearChat}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Chat</span>
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

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">Error: {error.message}</p>
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
          messages.map((message) => (
            <div
              key={message.id}
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
                <div className="whitespace-pre-wrap">
                  {renderMessageContent(message)}
                </div>
                {/* Show status for assistant messages */}
                {message.role === 'assistant' && message.status === 'streaming' && (
                  <div className="mt-2 text-xs opacity-60">Typing...</div>
                )}
              </div>
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {currentlyLoading && (
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
          value={localInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={currentlyLoading}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={currentlyLoading || !localInput.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
        {currentlyLoading && (
          <button
            type="button"
            onClick={stop}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Stop
          </button>
        )}
      </form>

      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
