import React from 'react';
import { Layout } from 'antd';
import { SideBar } from '@/components/sidebar';
import { MainContent } from '@/components/main_content';
import { ResponsiveGrid } from '@/components/responsive_grid';
import { ChatUI } from '@/components/chat_ui';
import { Conversation } from '@/types/conversation.type';

export const UserView: React.FC<{ chat: Conversation }> = ({ chat }) => {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout className="site-layout">
          <MainContent>
            <ResponsiveGrid
              cols={[
                {
                  size: { sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
                  component: <ChatUI chat={chat} />,
                },
              ]}
            />
          </MainContent>
        </Layout>
      </Layout>
    </div>
  );
};
