import {createPublicConversation} from '@/models/conversation';
import {ApiError} from '@/types/api';
import {Conversation} from '@/types/conversation.type';
import type {NextApiRequest, NextApiResponse} from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  try {
    if (req.method === 'POST') {
      const body: Conversation = req.body;
      const conversation = await createPublicConversation(body);
      res.status(200).json(conversation);
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
