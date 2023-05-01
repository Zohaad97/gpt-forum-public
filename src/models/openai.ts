import {type OpenAIChat} from '../types/openai.type';
import {type Message} from '../types/conversation.type';

export const createChat = async (
  newMessage: Message,
  chat: Message[]
): Promise<Partial<OpenAIChat>> => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

  const types = {
    human: 'user',
    gpt: 'assistant',
  };
  const messages = [
    {
      role: 'user',
      content:
        'Hi, as an AI model, always embed code between code tag (<code></code>) in your answers.',
    },
  ];

  messages.concat(
    chat.map(item => {
      return {
        role: types[item.from],
        content: item.value,
      };
    })
  );

  messages.push({
    role: 'user',
    content: newMessage.value,
  });

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages,
  };

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env['OPEN_AI_API_KEY']}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then(res => res.json())
    .then(data => data as OpenAIChat);
};
