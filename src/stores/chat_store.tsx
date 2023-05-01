import type {Folders} from '@/components/tree_menu/tree_menu';
import {action, makeObservable, observable} from 'mobx';

export class ChatStoreImp {
  activeChatId = 0;
  chatFolders: Folders[] = [];

  constructor() {
    makeObservable(this, {
      activeChatId: observable,
      updateActiveChatId: action,
      chatFolders: observable,
      setChatFolders: action,
    });
  }

  updateActiveChatId(id: number) {
    this.activeChatId = id;
  }

  setChatFolders(folders: Folders[]) {
    this.chatFolders = folders;
  }
}

export const ChatStore = new ChatStoreImp();
