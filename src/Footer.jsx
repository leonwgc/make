import React from 'react';
import { Button, Modal, Space, Form, Input, message, Popconfirm } from 'antd';
import { useUpdateStore, useSelector } from 'simple-redux-store';
import DataRenderer from './components/DataRenderer';
import * as service from './storage';
import Preview from './Preview';
import './Footer.less';

export default function Footer() {
  const app = useSelector((state) => state.app);
  const [saveForm] = Form.useForm();
  const updateStore = useUpdateStore();

  const onPreview = () => {
    updateStore({ preview: true });
  };

  const onClear = () => {
    updateStore({ comps: [], activeComp: null });
  };

  const save = () => {
    updateStore({ showSaveDlg: false });
    service.setPage({ bgColor: app.bgColor, comps: app.comps });
    message.success('保存成功');
  };

  return (
    <>
      <div className="footer">
        <div className="content">
          <Space>
            <Popconfirm
              title="确定要发布此页面吗？"
              onConfirm={() => {
                save();
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary">发布</Button>
            </Popconfirm>
            <Button type="default" onClick={save}>
              保存
            </Button>

            <Button type="default" onClick={onPreview}>
              预览
            </Button>
            <Button type="default" danger onClick={onClear}>
              清空
            </Button>
          </Space>
        </div>
      </div>
      <Preview visible={app.preview} onClose={() => updateStore({ preview: false })}>
        <DataRenderer data={app} />
      </Preview>
    </>
  );
}
