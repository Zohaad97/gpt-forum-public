export type Conversation = {
  avatarUrl: string;
  title: string;
  items: Message[];
  folder: ConversationFolder;
};

export type ConversationFolder = {
  icon?: string;
  name: string;
  id: number;
};

type Message = {
  from: "human" | "gpt";
  value: string;
};
