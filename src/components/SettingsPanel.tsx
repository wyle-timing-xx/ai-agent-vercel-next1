'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { Settings, Bot, User2 } from 'lucide-react';
import { chatConfigAtom, agentPersonalityAtom } from '@/store/atoms';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsProps) {
  const [chatConfig, setChatConfig] = useAtom(chatConfigAtom);
  const [agentPersonality, setAgentPersonality] = useAtom(agentPersonalityAtom);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Chat Configuration */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              Chat Configuration
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Model</label>
                <select
                  value={chatConfig.model}
                  onChange={(e) =>
                    setChatConfig(prev => ({ ...prev, model: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Temperature: {chatConfig.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={chatConfig.temperature}
                  onChange={(e) =>
                    setChatConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Conservative</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Tokens</label>
                <input
                  type="number"
                  value={chatConfig.maxTokens}
                  onChange={(e) =>
                    setChatConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="100"
                  max="4000"
                />
              </div>
            </div>
          </div>

          {/* Agent Personality */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <User2 className="h-4 w-4 mr-2" />
              Agent Personality
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={agentPersonality.name}
                  onChange={(e) =>
                    setAgentPersonality(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Role</label>
                <input
                  type="text"
                  value={agentPersonality.role}
                  onChange={(e) =>
                    setAgentPersonality(prev => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Traits</label>
                <input
                  type="text"
                  value={agentPersonality.traits.join(', ')}
                  onChange={(e) =>
                    setAgentPersonality(prev => ({
                      ...prev,
                      traits: e.target.value.split(', ').map(t => t.trim()).filter(Boolean)
                    }))
                  }
                  placeholder="helpful, friendly, knowledgeable"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Separate traits with commas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
