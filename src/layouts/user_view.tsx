import React from 'react';
import {Layout} from 'antd';
import {SideBar} from '@/components/sidebar';
import {MainContent} from '@/components/main_content';
import {ResponsiveGrid} from '@/components/responsive_grid';

export const UserView: React.FC = () => {
  return (
    <div>
      <Layout style={{minHeight: '100vh'}}>
        <SideBar />
        <Layout className="site-layout">
          <MainContent>
            <ResponsiveGrid
              cols={[
                {
                  size: {sm: 24, md: 24, lg: 24, xl: 24, xxl: 24},
                  component: <div>GPT List is here</div>,
                },
              ]}
            />
          </MainContent>
        </Layout>
      </Layout>
    </div>
  );
};
