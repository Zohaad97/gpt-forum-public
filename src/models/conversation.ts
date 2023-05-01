import {ApiError} from '@/types/api';
import type {Conversation, ConversationFolder} from '@/types/conversation.type';
import {parseConversationMessages} from '@/utils/conversation';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
export const createConversation = async (userId: string, body: Conversation) => {
  let folder;
  if (body.folder && !body.folder?.id) {
    folder = await fetchConversationFolder(body.folder.id, userId);
  }

  if (!folder) {
    throw new ApiError(403, 'Invalid folder');
  }
  const createdConversation = await prisma.conversation.create({
    data: {
      title: body.title,
      avatar: body.avatarUrl,
      conversationFolderId: body.folder?.id,
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

  return createdConversation;
};

export const createPublicConversation = async (body: Conversation) => {
  const createdConversation = await prisma.conversation.create({
    data: {
      title: body.title,
      avatar: body.avatarUrl,
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

  return createdConversation;
};

export const fetchConveration = async (id: string) => {
  const conversationId = id;

  const data = await prisma.conversation.findFirst({
    select: {
      id: true,
      title: true,
      messages: true,
      conversationFolder: true,
    },
    where: {id: Number(conversationId)},
  });
  const conversation: Conversation = {
    title: data?.title || '',
    avatarUrl: '',
    folder: data?.conversationFolder
      ? {
          id: data.conversationFolder.id,
          name: data.conversationFolder.name,
        }
      : null,
    items:
      data?.messages.map(item => {
        return {
          from: item.from,
          value: item.content,
        };
      }) || [],
  };
  return conversation;
};

export const fetchAllConverationFolder = async (userId: string) => {
  const data = await prisma.conversationFolder.findMany({
    select: {
      id: true,
      name: true,
      conversations: true,
    },
    where: {userId: userId},
  });
  return data || null;
};

export const createConversationFolder = async (userId: string, body: ConversationFolder) => {
  if (!body.name) {
    throw new ApiError(403, 'Folder name required');
  }
  const conversationFolder = await _createConversationFolder(body.name, userId);
  return conversationFolder || null;
};

export const changeConversationFolderPath = async (
  userId: string,
  folderId: number,
  converationId: number
) => {
  let conversation = await prisma.conversation.findFirst({
    where: {
      id: converationId,
      conversationFolder: {
        user: {
          id: userId,
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
    return null;
  }

  return conversation;
};

export const updateConversationFolder = async (
  userId: string,
  folderId: number,
  body: ConversationFolder
) => {
  if (!body.name) {
    throw new ApiError(403, 'Folder name required');
  }
  let conversationFolder = await prisma.conversationFolder.findFirst({
    where: {id: folderId, userId},
  });
  if (conversationFolder) {
    conversationFolder = await prisma.conversationFolder.update({
      where: {id: folderId},
      data: {name: body.name},
    });
  } else {
    return null;
  }

  return conversationFolder;
};

export const deleteConversationFolder = async (userId: string, folderId: number) => {
  const conversationFolder = await prisma.conversationFolder.findFirst({
    where: {id: folderId, userId},
  });
  if (conversationFolder) {
    await prisma.conversationFolder.delete({
      where: {id: folderId},
    });
  } else {
    return false;
  }

  return true;
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
