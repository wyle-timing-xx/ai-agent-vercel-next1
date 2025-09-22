import { NextRequest } from 'next/server';
import { chatService } from '@/lib/chat-service';

// GET /api/conversations/[id] - 获取特定对话及其消息
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = parseInt(params.id);
    
    if (isNaN(conversationId)) {
      return Response.json(
        { success: false, error: '无效的对话ID' },
        { status: 400 }
      );
    }

    const conversation = await chatService.getConversationWithMessages(conversationId);
    
    if (!conversation) {
      return Response.json(
        { success: false, error: '对话不存在' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error('获取对话失败:', error);
    return Response.json(
      { success: false, error: '获取对话失败' },
      { status: 500 }
    );
  }
}

// PUT /api/conversations/[id] - 更新对话标题
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = parseInt(params.id);
    const { title } = await request.json();
    
    if (isNaN(conversationId)) {
      return Response.json(
        { success: false, error: '无效的对话ID' },
        { status: 400 }
      );
    }

    if (!title) {
      return Response.json(
        { success: false, error: '标题不能为空' },
        { status: 400 }
      );
    }

    const success = await chatService.updateConversationTitle(conversationId, title);
    
    if (!success) {
      return Response.json(
        { success: false, error: '更新对话标题失败' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: '对话标题更新成功'
    });
  } catch (error) {
    console.error('更新对话标题失败:', error);
    return Response.json(
      { success: false, error: '更新对话标题失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/conversations/[id] - 删除对话
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = parseInt(params.id);
    
    if (isNaN(conversationId)) {
      return Response.json(
        { success: false, error: '无效的对话ID' },
        { status: 400 }
      );
    }

    const success = await chatService.deleteConversation(conversationId);
    
    if (!success) {
      return Response.json(
        { success: false, error: '删除对话失败' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: '对话删除成功'
    });
  } catch (error) {
    console.error('删除对话失败:', error);
    return Response.json(
      { success: false, error: '删除对话失败' },
      { status: 500 }
    );
  }
}
