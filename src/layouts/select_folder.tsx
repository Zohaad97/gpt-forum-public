/* eslint-disable no-inline-styles/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Input, type InputRef, Modal, Select, Space, Spin} from 'antd';
import {getAllFolders, createFolder, publishChat} from '@/services/endpoints';
import {get, post} from '@/services/http';
import {PlusOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';

type Props = {
  chatId: number;
  userId: string;
};
export const SelectFolder: React.FC<Props> = ({chatId, userId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState<{id: number; name: string}[]>([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [addNewFolderLoading, setAddNewFolderLoading] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const inputRef = useRef<InputRef | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async function () {
      setFoldersLoading(true);
      const response = await get(getAllFolders);
      setFolders(response.data);
      setFoldersLoading(false);
    })();
  }, [userId]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setSubmitLoading(true);
    const result = await post(publishChat(chatId), {folderId: selectedFolderId});
    setIsModalOpen(false);
    setSubmitLoading(false);
    const url = `${result.data.title?.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '-')}/${
      result.data.id
    }`;
    router.push(`/chat/${url}`);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    showModal();
  }, []);

  const onChange = (value: number) => {
    setSelectedFolderId(value);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(event.target.value);
  };
  const addItem = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    if (newFolderName === '') return;
    setAddNewFolderLoading(true);
    const result = await post(createFolder, {name: newFolderName});
    setFolders([...folders, {name: result.data.name, id: result.data.id}]);
    setNewFolderName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    setAddNewFolderLoading(false);
  };
  return (
    <Modal
      confirmLoading={submitLoading}
      title={'Select Folder'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {foldersLoading ? (
        <Spin tip="Loading..." />
      ) : (
        <Select
          style={{
            width: 300,
          }}
          onChange={onChange}
          placeholder="Choose"
          dropdownRender={menu => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0',
                }}
              />
              <Space
                style={{
                  padding: '0 8px 4px',
                }}
              >
                <Input
                  disabled={addNewFolderLoading}
                  placeholder="Folder name..."
                  ref={inputRef}
                  value={newFolderName}
                  onChange={onNameChange}
                />
                <Button
                  loading={addNewFolderLoading}
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                >
                  Add folder
                </Button>
              </Space>
            </>
          )}
          options={folders.map(item => ({
            label: item.name,
            value: item.id,
          }))}
        />
      )}
    </Modal>
  );
};
