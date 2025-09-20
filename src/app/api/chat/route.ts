import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('deepseek-chat', {
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: process.env.DEEPSEEK_API_KEY,
    }),
    messages,
    system: `You are a helpful AI assistant powered by DeepSeek. You can help users with various tasks including:
    - Answering questions
    - Providing explanations
    - Helping with problem-solving
    - Creative writing
    - Code assistance
    
    Be concise, helpful, and friendly in your responses.`,
  });

  return result.toDataStreamResponse();
}