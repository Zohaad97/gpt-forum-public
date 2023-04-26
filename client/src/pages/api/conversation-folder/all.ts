import {fetchAllConverationFolder} from '@/models/conversation';
import {ApiError} from '@/types/api';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';
import {authOptions, Session} from '../auth/[...nextauth]';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as Session;
  const userId = session?.user?.id;
  if (!userId) {
    res.status(401).json({message: 'unauthorized'});
    return;
  }

  try {
    if (req.method === 'GET') {
      const result = await fetchAllConverationFolder(userId);
      res.status(200).json(result);
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
