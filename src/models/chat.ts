import {createChat} from '@/models/openai';
import {ApiError} from '@/types/api';
import {PrismaClient} from '@prisma/client';
import {type Message} from '../types/conversation.type';

const prisma = new PrismaClient();
export const createChatMessage = async (userId: string, conversationId: number, body: Message) => {
  const messages = await prisma.message.findMany({
    select: {
      content: true,
      from: true,
    },
    where: {
      conversation: {
        id: conversationId,
        conversationFolder: {
          userId: userId,
        },
      },
    },
  });
  const _messages: Message[] = messages.map(item => {
    return {
      from: item.from,
      value: item.content,
    };
  });
  const result = await createChat(body, _messages);
  const newMessage = result.choices?.at(0)?.message.content || '';
  if (!newMessage) {
    throw new ApiError(401, 'Failed');
  }
  await prisma.message.create({
    data: {
      content: body.value,
      from: 'human',
      conversationId,
    },
  });
  const data = await prisma.message.create({
    data: {
      content: newMessage,
      from: 'gpt',
      conversationId,
    },
  });
  return data;
};
