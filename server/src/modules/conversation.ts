import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
import {parseConversationMessages} from '../utils/conversation';
import {Conversation, ConversationFolder} from '../types/conversation.type';

const prisma = new PrismaClient();
export const createConversation = async (req: Request, res: Response) => {
  const body: Conversation = req.body;
  const clientId = req.params['client_id'] || '';
  try {
    const folder = await fetchConversationFolder(body.folder.id, clientId);

    if (!folder) {
      res.status(403).send({message: 'Invalid folder'});
      return;
    }
    const createdConversation = await prisma.conversation.create({
      data: {
        title: body.title,
        avatar: body.avatarUrl,
        conversationFolderId: body.folder.id,
        messages: {
          createMany: {
            data: parseConversationMessages(body.items).map(item => {
              return {
                content: item.value,
                from: item.from,
              };
            }),
          },
        },
      },
      include: {messages: true},
    });

    res.status(200).send(createdConversation);
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const fetchConveration = async (req: Request, res: Response) => {
  const conversationId = req.params['id'];
  try {
    const data = await prisma.conversation.findFirst({
      select: {
        id: true,
        title: true,
        messages: true,
        conversationFolder: true,
      },
      where: {id: Number(conversationId)},
    });
    if (data?.conversationFolder) {
      const conversation: Conversation = {
        title: data?.title || '',
        avatarUrl: '',
        folder: {
          id: data.conversationFolder.id,
          name: data.conversationFolder.name,
        },
        items:
          data?.messages.map(item => {
            return {
              from: item.from,
              value: item.content,
            };
          }) || [],
      };
      res.send(conversation);
    } else {
      res.status(404).send();
    }
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const fetchAllConverationFolder = async (req: Request, res: Response) => {
  const clientId = req.params['client_id'] || '';
  try {
    const data = await prisma.conversationFolder.findMany({
      select: {
        id: true,
        name: true,
        conversations: true,
      },
      where: {userId: clientId},
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send();
    }
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const createConversationFolder = async (req: Request, res: Response) => {
  const body: ConversationFolder = req.body;
  const clientId = req.params['client_id'] || '';
  try {
    if (!body.name) {
      res.status(403).send({message: 'Folder name required'});
    }
    const conversationFolder = await _createConversationFolder(body.name, clientId);

    res.send(conversationFolder);
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const changeConversationFolderPath = async (req: Request, res: Response) => {
  const clientId = req.params['client_id'] || '';
  const folderId = Number(req.params['folderId']) || 0;
  const converationId = Number(req.params['id']) || 0;
  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        id: converationId,
        conversationFolder: {
          user: {
            id: clientId,
          },
        },
      },
    });
    if (conversation) {
      conversation = await prisma.conversation.update({
        where: {id: converationId},
        data: {conversationFolderId: folderId},
      });
    } else {
      res.status(404).send();
      return;
    }

    res.send(conversation);
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const updateConversationFolder = async (req: Request, res: Response) => {
  const body: ConversationFolder = req.body;
  const clientId = req.params['client_id'] || '';
  const folderId = Number(req.params['id']) || 0;
  try {
    if (!body.name) {
      res.status(403).send({message: 'Folder name required'});
    }
    let conversationFolder = await prisma.conversationFolder.findFirst({
      where: {id: folderId, userId: clientId},
    });
    if (conversationFolder) {
      conversationFolder = await prisma.conversationFolder.update({
        where: {id: folderId},
        data: {name: body.name},
      });
    } else {
      res.status(404).send();
      return;
    }

    res.send(conversationFolder);
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

export const deleteConversationFolder = async (req: Request, res: Response) => {
  const clientId = req.params['client_id'] || '';
  const folderId = Number(req.params['id']) || 0;
  try {
    let conversationFolder = await prisma.conversationFolder.findFirst({
      where: {id: folderId, userId: clientId},
    });
    if (conversationFolder) {
      await prisma.conversationFolder.delete({
        where: {id: folderId},
      });
    } else {
      res.status(404).send();
      return;
    }

    res.status(200).send();
  } catch (err: any) {
    console.error(err);
    res.status(401).send({message: err.message});
  }
};

const _createConversationFolder = async (name: string, userId: string) => {
  try {
    const data = await prisma.conversationFolder.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return data;
  } catch (err: any) {
    console.error(err);
    throw err.message;
  }
};

const fetchConversationFolder = async (id: number, userId: string) => {
  try {
    const data = await prisma.conversationFolder.findFirst({
      where: {
        id,
        userId,
      },
    });

    return data;
  } catch (err: any) {
    console.error(err);
    throw err.message;
  }
};
