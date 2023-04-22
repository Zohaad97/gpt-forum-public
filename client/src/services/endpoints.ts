// const BASEURL = "http://chat-gpt-extension-backend-env.eba-8hgfdwyp.us-east-1.elasticbeanstalk.com/api/"
const BASEURL = "http://127.0.0.1:8080/api/"
export const geChat = (id: number) => `${BASEURL}conversation/${id}`;
export const googleLogin = `${BASEURL}auth/session`;
export const getAllFolders = `${BASEURL}conversation-folder/all`