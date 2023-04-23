import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, InputRef, Layout, Tag } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { TreeMenu } from './tree_menu/tree_menu';
import { post } from '@/services/http';
import { createFolder } from '@/services/endpoints';
const { Sider } = Layout;

export const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const inputRef = useRef<InputRef | null>(null);
  const showInput = () => {
    setInputVisible(true);
  };
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const handleInputConfirm = async () => {
    if (folderName ) {
     // Api call and Add into state
     const {data} = await post(createFolder,{name:folderName});
    }
    setInputVisible(false);
    setFolderName('');
  };
  return (
    <Sider width={300} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <TreeMenu />
      <div style={{alignItems:'center',justifyContent:'center',flex:1,display:'flex',marginTop:20}}>
      {/* <Button color='white' ghost style={{alignItems:'center',display:'flex'}}  icon={<PlusOutlined />} type="dashed">New</Button> */}

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={folderName}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={{
          borderStyle: 'dashed',
          color:'white',
          alignItems:'center',
          display:'flex'
        }}>
          <PlusOutlined /> New
        </Tag>
      )}
      </div>
    </Sider>
  );
};
