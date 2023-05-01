import React, {useEffect, useState} from 'react';
import {type Conversation} from '@/types/conversation.type';
import {Modal} from 'antd';

export const SelectFolder: React.FC<{chat: Conversation | null; userId: number | null}> = ({
  chat,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    showModal();
  }, []);
  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
