import React from 'react';
import { Cascader, Input, Space } from 'antd';

export default function Home() {

  return (
    <>
      <div>GPT Forum</div>
      <Input placeholder="Basic usage" />
      <Space direction="vertical">
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Input defaultValue="mysite" />
        <Input defaultValue="mysite" />
        <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
        <Input
          addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
          defaultValue="mysite"
        />
      </Space>
    </>
  );
}
