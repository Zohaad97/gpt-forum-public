import React, {useEffect, useState} from 'react';
import {Spin, Tree} from 'antd';
import type {DataNode, EventDataNode, TreeProps} from 'antd/es/tree';
import {get, put} from '@/services/http';
import {getAllFolders, updateChatFolder} from '@/services/endpoints';
import styles from './tree_menu.module.scss';
import {type Key} from 'antd/es/table/interface';
import {observer} from 'mobx-react';
import {ChatStore} from '@/stores/chat_store';
import {useRouter} from 'next/router';

const {DirectoryTree} = Tree;

export type Folders = {
  id: number;
  name: string;
  conversations: Conversations[];
};

export type Conversations = {
  id: number;
  title: string;
};

type TreeNode = {
  key: string;
  title: string;
  isLeaf?: boolean;
  draggable?: boolean;
  children?: TreeNode[];
};

type SelectEvent = {
  event: string;
  selected: boolean;
  node: EventDataNode<DataNode>;
  selectedNodes: DataNode[];
  nativeEvent: MouseEvent;
};

function modifyResponseAccordingToTree(data: Folders[]) {
  const tree: TreeNode[] = [];
  data.forEach((elem: Folders) => {
    const childs: TreeNode[] = [];
    elem.conversations.forEach(child => {
      childs.push({key: `${child.id}`, title: child.title, isLeaf: true});
    });
    tree.push({
      key: `folder-${elem.id}`,
      title: elem.name,
      children: childs,
      draggable: false,
    });
  });
  return tree;
}

export const TreeMenu: React.FC = observer(() => {
  const router = useRouter();
  const [gData, setGData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(false);

  function convertFolderNameToKey(name: number | string) {
    return Number(name.toString().split('-')[1]);
  }
  useEffect(() => {
    (async () => {
      const response = await get(getAllFolders);
      ChatStore.setChatFolders(response.data);
      const data = modifyResponseAccordingToTree(response.data);
      setGData(data);
    })();
  }, []);

  const onDragEnter: TreeProps['onDragEnter'] = info => {
    //
  };

  const onDrop: TreeProps['onDrop'] = async info => {
    const chatId = Number(info.dragNode.key);
    const folderId = convertFolderNameToKey(info.node.key);
    if (!chatId || !folderId) {
      return;
    }
    setLoading(true);
    await put(updateChatFolder(chatId, folderId), {});
    const response = await get(getAllFolders);
    ChatStore.setChatFolders(response.data);
    const data = modifyResponseAccordingToTree(response.data);
    setGData(data);
    setLoading(false);
  };

  function onSelectItem(selectedKeys: Key[], e: SelectEvent) {
    if (e.node.isLeaf && typeof e.node.title === 'string') {
      const url = `${e.node.title?.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '-')}/${e.node.key}`;
      router.push(`/chat/${url}`);
    }
  }

  const Title = (props: any) => {
    return <>{props.title}</>;
  };

  return (
    <Spin spinning={loading}>
      <DirectoryTree
        rootClassName={styles['tree-background']}
        // draggable={({isLeaf}) => isLeaf === true}
        draggable
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        onSelect={onSelectItem}
        titleRender={nodeData => {
          return <Title title={nodeData.title} />;
        }}
      />
    </Spin>
  );
});
