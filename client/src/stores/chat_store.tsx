import { action, makeObservable, observable } from "mobx";

export class ChatStoreImp {
    activeChatId = 0;

    constructor() {
        makeObservable(this, {
            activeChatId: observable,
            updateActiveChatId: action
        })
    }

    updateActiveChatId(id: number) {
        this.activeChatId = id;
    }
}

export const ChatStore = new ChatStoreImp();