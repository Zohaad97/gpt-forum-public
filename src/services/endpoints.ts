const BASEURL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const geChat = (id: number) => `${BASEURL}conversation/${id}`;
export const googleLogin = `${BASEURL}auth/session`;
export const getAllFolders = `${BASEURL}conversation-folder/all`;
export const createFolder = `${BASEURL}conversation-folder`;
export const updateChatFolder = (chatId: number, folderId: number): string =>
  `${BASEURL}conversation/${chatId}/folder/${folderId}`;
