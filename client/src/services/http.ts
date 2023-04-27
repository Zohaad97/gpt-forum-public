import axios from 'axios';

function defaultHeaders() {
  return {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export const get = async (url: string) => {
  const response = await axios.get(url, { ...defaultHeaders() });
  return response;
};

export const post = async (url: string, body: any) => {
  const response = await axios.post(url, body, { ...defaultHeaders() });
  return response;
};
export const put = async (url: string, body: any) => {
  const response = await axios.put(url, body, { ...defaultHeaders() });
  return response;
};
