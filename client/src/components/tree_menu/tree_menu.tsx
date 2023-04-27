import React, { useEffect, useState } from 'react';
import { Space, Tree } from 'antd';
import type { DataNode, EventDataNode, TreeProps } from 'antd/es/tree';
import { get, put } from '@/services/http';
import { getAllFolders, updateChatFolder } from '@/services/endpoints';
import styles from "./tree_menu.module.scss"
import { Key } from 'antd/es/table/interface';
import { observer } from 'mobx-react';
import { ChatStore } from '@/stores/chat_store';

const { DirectoryTree } = Tree;

export type Folders = {
    id: number,
    name: string,
    conversations: Conversations[]
}

export type Conversations = {
    id: number,
    title: string,
}

type TreeNode = {
    key: string,
    title: string,
    isLeaf?: boolean
    draggable?:boolean;
    children?: TreeNode[]
}

type SelectEvent = {
    event: string,
    selected: boolean,
    node: EventDataNode<DataNode>
    selectedNodes: DataNode[],
    nativeEvent: MouseEvent
}

function modifyResponseAccordingToTree(data: Folders[]) {
    let tree: TreeNode[] = [];
    data.forEach((elem: Folders) => {
        let childs: TreeNode[] = []
        elem.conversations.forEach((child) => {
            childs.push({ key: `${child.id}`, title: child.title, isLeaf: true })
        })
        tree.push({ key: `folder-${elem.id}`, title: elem.name, children: childs,draggable:false })
    })
    return tree
}

export const TreeMenu: React.FC = observer(() => {
    const [gData, setGData] = useState<TreeNode[]>([]);

    function convertFolderNameToKey (name: number | string) {
        return Number(name.toString().split("-")[1])
    }
    useEffect(() => {
        (async () => {
            const response = await get(getAllFolders);
            ChatStore.setChatFolders(response.data);
        })()
    }, [])

    useEffect(() => {
        if(ChatStore.chatFolders){
            const data = modifyResponseAccordingToTree(ChatStore.chatFolders)
            setGData(data)
        }
    },[ChatStore.chatFolders])

    const onDragEnter: TreeProps['onDragEnter'] = (info) => {

    };

    const onDrop: TreeProps['onDrop'] = async (info) => {
        console.log(info);
        const chatId = Number(info.dragNode.key);
        const folderId = convertFolderNameToKey(info.node.key)
        await put(updateChatFolder(chatId, folderId),{})
        const response = await get(getAllFolders);
        ChatStore.setChatFolders(response.data);     
    };

    function onSelectItem(selectedKeys: Key[], e: SelectEvent) {      
        if (!e.node.children) {
            ChatStore.updateActiveChatId(Number(e.node.key));
        }
    }
    const Title = (props:any) => {
        console.log("render");
        return <h5>{props.title}</h5>;
      };
    return (
        <DirectoryTree
            rootClassName={styles['tree-background']}
            draggable={({isLeaf}) => isLeaf === true}
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
            onSelect={onSelectItem}
            titleRender={(nodeData) => {
                return <Title title={nodeData.title} />;
              }}
            // titleRender={(node) => {
            //     if(node.isLeaf){
            //         return (<Space>
            //             <span>{node.title}</span>
            //         </Space>)
            //     }
                
            //     return (<>{node.title?.toString()}</>)
            //     // console.log({node:node.title})
            //     }}
        />
    );
});