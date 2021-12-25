import React from 'react';
import { Table, ConfigProvider, Modal, Button, Space } from 'antd';
import MyModal from './Modal';
import './App.css';
import zhCN from 'antd/lib/locale/zh_CN';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
function App() {
  const [modal, contextHolder] = Modal.useModal();
  return (
    <ConfigProvider locale={zhCN}>
      {/* <MyModal /> */}
      <div style={{ height: 200 }}></div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 400 }} />,
    </ConfigProvider>
  );
}

export default App;
