export type Conversation = {
  avatarUrl: string;
  title: string;
  items: Message[];
  folder: ConversationFolder | null;
};

export type ConversationFolder = {
  icon?: string;
  name: string;
  id: number;
};

export type Message = {
  from: 'human' | 'gpt';
  value: string;
};

export type AllFolerConversations = {
  id: number;
  name: string;
  conversations: Conversation[];
};
