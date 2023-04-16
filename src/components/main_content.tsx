import React from "react";
import { Layout, theme } from 'antd';

const { Content } = Layout;

type MainContentProps = {
    children: JSX.Element
}
export const MainContent: React.FC<MainContentProps> = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
        </div>
    </Content>
}