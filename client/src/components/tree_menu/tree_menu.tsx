import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { DataNode, EventDataNode, TreeProps } from 'antd/es/tree';
import { get, put } from '@/services/http';
import { getAllFolders, updateChatFolder } from '@/services/endpoints';
import styles from "./tree_menu.module.scss"
import { Key } from 'antd/es/table/interface';
import { observer } from 'mobx-react';
import { ChatStore } from '@/stores/chat_store';

const { DirectoryTree } = Tree;

type Folders = {
    id: number,
    name: string,
    conversations: Conversations[]
}

type Conversations = {
    id: number,
    title: string,
}

type Tree = {
    key: string,
    title: string,
    isLeaf?: boolean
    children?: Tree[]
}

type SelectEvent = {
    event: string,
    selected: boolean,
    node: EventDataNode<DataNode>
    selectedNodes: DataNode[],
    nativeEvent: MouseEvent
}

function modifyResponseAccordingToTree(data: Folders[]) {
    let tree: Tree[] = [];
    data.forEach((elem: Folders) => {
        let childs: Tree[] = []
        elem.conversations.forEach((child) => {
            childs.push({ key: `${child.id}`, title: child.title, isLeaf: true })
        })
        tree.push({ key: `folder-${elem.id}`, title: elem.name, children: childs })
    })
    return tree
}

export const TreeMenu: React.FC = observer(() => {
    const [gData, setGData] = useState<Tree[]>([]);

    function convertFolderNameToKey (name: number | string) {
        return Number(name.toString().split("-")[1])
    }
    useEffect(() => {
        (async () => {
            const response = await get(getAllFolders);
            const data = modifyResponseAccordingToTree(response.data)
            setGData(data)

        })()
    }, [])


    const onDragEnter: TreeProps['onDragEnter'] = (info) => {

    };

    const onDrop: TreeProps['onDrop'] = async (info) => {
        console.log(info);
        const chatId = Number(info.dragNode.key);
        const folderId = convertFolderNameToKey(info.node.key)
        const response = await put(updateChatFolder(chatId, folderId),{})        
    };

    function onSelectItem(selectedKeys: Key[], e: SelectEvent) {
        console.log(Number(e.node.key));
        
        if (!e.node.children) {
            ChatStore.updateActiveChatId(Number(e.node.key));
        }
    }
    return (
        <DirectoryTree
            rootClassName={styles['tree-background']}
            draggable
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
            onSelect={onSelectItem}
        />
    );
});