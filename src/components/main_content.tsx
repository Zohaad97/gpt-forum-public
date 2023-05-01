import React from 'react';
import {Layout, theme} from 'antd';

const {Content} = Layout;

type MainContentProps = {
  children: JSX.Element;
};
export const MainContent: React.FC<MainContentProps> = ({children}) => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  return (
    <Content>
      {/* eslint-disable-next-line no-inline-styles/no-inline-styles */}
      <div style={{minHeight: 360, background: colorBgContainer}}>{children}</div>
    </Content>
  );
};
