const BASEURL = "http://chat-gpt-extension-backend-env.eba-8hgfdwyp.us-east-1.elasticbeanstalk.com/api/"

export const geChat = (id: number) => `${BASEURL}conversation/${id}`;
export const googleLogin = `${BASEURL}auth/session`;