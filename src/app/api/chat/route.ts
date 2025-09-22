
import { deepseek } from '@ai-sdk/deepseek';
import { streamText, Message } from 'ai';
import { chatService } from '@/lib/chat-service';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, conversationId: providedConversationId } = await req.json();

    // 创建或获取对话ID
    let conversationId = providedConversationId;
    if (!conversationId) {
      // 如果没有对话ID，创建新对话
      const firstUserMessage = messages.find((msg: Message) => msg.role === 'user')?.content || '新对话';
      const title = chatService.generateConversationTitle(firstUserMessage);
      const newConversation = await chatService.createConversation(1, title); // 默认 user_id = 1
      conversationId = newConversation?.id;
    }

    // 保存用户消息
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'user' && conversationId) {
      await chatService.saveMessage(conversationId, 'user', lastMessage.content);
    }

    const result = await streamText({
      model: deepseek('deepseek-chat'),
      messages,
      system: `You are a helpful AI assistant powered by DeepSeek. You can help users with various tasks including:
      - Answering questions
      - Providing explanations
      - Helping with problem-solving
      - Creative writing
      - Code assistance
      
      Be concise, helpful, and friendly in your responses.`,
      onFinish: async (result) => {
        // 保存AI助手的回复
        if (result.text && conversationId) {
          await chatService.saveMessage(conversationId, 'assistant', result.text);
        }
      },
    });

    // 在响应头中包含对话ID，便于前端使用
    const response = result.toDataStreamResponse();
    if (conversationId) {
      response.headers.set('X-Conversation-ID', conversationId.toString());
    }
    
    return response;
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}