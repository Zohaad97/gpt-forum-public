import React, { useState } from 'react';
import { Layout } from 'antd';

import { TreeMenu } from './tree_menu/tree_menu';
const { Sider } = Layout;

export const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider width={300} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <TreeMenu />
    </Sider>
  );
};
