import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
import {createChat} from '../modules/openai';
import {Message} from '../types/conversation.type';

const prisma = new PrismaClient();
export const createChatMessage = async (req: Request, res: Response) => {
  const body: Message = req.body;
  const clientId = req.params['client_id'] || '';
  const conversationId = Number(req.params['id']) || 0;
  try {
    const messages = await prisma.message.findMany({
      select: {
        content: true,
        from: true,
      },
      where: {
        conversation: {
          id: conversationId,
          conversationFolder: {
            userId: clientId,
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
      res.status(401).send({message: 'Failed'});
      return;
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
    res.status(200).send(data);
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};
