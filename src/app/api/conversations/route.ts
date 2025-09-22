import { NextRequest } from 'next/server';
import { chatService } from '@/lib/chat-service';

// GET /api/conversations - 获取对话列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const conversations = await chatService.getConversations(userId, limit);
    
    // 直接返回对话数组，保持简单的API响应格式
    return Response.json(conversations);
  } catch (error) {
    console.error('获取对话列表失败:', error);
    return Response.json(
      { error: '获取对话列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/conversations - 创建新对话
export async function POST(request: NextRequest) {
  try {
    const { userId = 1, title } = await request.json();
    
    const conversation = await chatService.createConversation(userId, title);
    
    if (!conversation) {
      return Response.json(
        { error: '创建对话失败' },
        { status: 500 }
      );
    }

    return Response.json(conversation);
  } catch (error) {
    console.error('创建对话失败:', error);
    return Response.json(
      { error: '创建对话失败' },
      { status: 500 }
    );
  }
}
