import { atom } from 'jotai';

// Define a compatible message type that works with both old and new SDK
export interface CompatibleMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  parts?: Array<{ text: string }>;
  status?: 'submitted' | 'streaming' | 'ready' | 'error';
  metadata?: unknown;
}

// Chat messages atom
export const messagesAtom = atom<CompatibleMessage[]>([]);

// Input value atom
export const inputAtom = atom<string>('');

// Loading state atom
export const isLoadingAtom = atom<boolean>(false);

// Chat configuration atoms
export const chatConfigAtom = atom({
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 1000,
});

// Agent personality atom
export const agentPersonalityAtom = atom({
  name: 'AI Assistant',
  role: 'helpful assistant',
  traits: ['helpful', 'friendly', 'knowledgeable', 'concise'],
});

// Conversation history atom (derived from messages)
export const conversationHistoryAtom = atom(
  (get) => {
    const messages = get(messagesAtom);
    return messages.map(message => ({
      role: message.role,
      content: message.content,
      timestamp: new Date().toISOString(),
    }));
  }
);

// Clear chat atom (write-only)
export const clearChatAtom = atom(
  null,
  (get, set) => {
    set(messagesAtom, []);
    set(inputAtom, '');
    set(isLoadingAtom, false);
  }
);
