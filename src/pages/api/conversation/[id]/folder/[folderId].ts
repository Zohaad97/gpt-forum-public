import {changeConversationFolderPath} from '@/models/conversation';
import {ApiError} from '@/types/api';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';
import {authOptions, type Session} from '../../../auth/[...nextauth]';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as Session;
  const userId = session?.user?.id;
  if (!userId) {
    res.status(401).json({message: 'unauthorized'});
    return;
  }

  try {
    if (req.method === 'PUT') {
      const folderId = req.query['folderId']?.toString();
      const converationId = req.query['id']?.toString();
      const conversation = await changeConversationFolderPath(
        userId,
        Number(folderId),
        Number(converationId)
      );
      if (conversation) {
        res.status(200).json(conversation);
      } else {
        res.status(404).send({message: 'content not found'});
      }
    } else {
      res.status(403).json({message: 'Method not allowed'});
    }
  } catch (e) {
    if (e instanceof ApiError) {
      const error = e as ApiError;
      res.status(error.status).json({message: e.message});
    } else {
      res.status(500).send({message: 'something went wrong'});
    }
  }
}
