// const BASEURL = "http://chat-gpt-extension-backend-env.eba-8hgfdwyp.us-east-1.elasticbeanstalk.com/api/"
const BASEURL = 'https://gpt-forum-git-dev-zohaad97.vercel.app/api/';
export const geChat = (id: number) => `${BASEURL}conversation/${id}`;
export const googleLogin = `${BASEURL}auth/session`;
export const getAllFolders = `${BASEURL}conversation-folder/all`;
export const createFolder = `${BASEURL}conversation-folder`;
export const updateChatFolder = (chatId: number, folderId: number): string =>
  `${BASEURL}conversation/${chatId}/folder/${folderId}`;
