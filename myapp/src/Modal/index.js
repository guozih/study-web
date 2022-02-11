import React from 'react';
import { Table, ConfigProvider, Modal, Button, Space } from 'antd';
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
function App(props) {
  const [visible, setVisible] = React.useState(false);
  const onOk = () => {
    if (props.onChange) {
      setVisible(false)
    }
  }
  const onClose = () => {
    setVisible(false);
  }
  return (
    <div>
      <Button type="primary" size='small' onClick={() => { setVisible(true) }}>选择共享商品</Button>
      <Modal forceRender title="选择共享商品" visible={visible} onOk={onOk} onCancel={onClose} width={'90%'}>
        <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} sticky />,
      </Modal>
    </div>

  );
}

export default App;
