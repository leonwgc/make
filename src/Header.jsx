import React, { useState, useEffect } from 'react';
import { Button, Modal, Space, Form, Input, message } from 'antd';
import FormRenderer from 'antd-form-render';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import useUpdateStore from './hooks/useUpdateStore';
import { showError, showSuccess } from './msg';
import ColorPicker from './ColorPicker';
import * as service from './storage';
import './Header.less';

export default function Header() {
  const app = useSelector((state) => state.app);
  const { type = '', id = '' } = useParams();
  const updateStore = useUpdateStore();
  const [saveForm] = Form.useForm();

  const saveFormLayout = [
    {
      type: Input,
      label: '页面标题',
      placeholder: '请输入',
      name: 'name',
      itemProps: {
        rules: [{ required: true, message: '请填写' }],
        initialValue: app.name,
      },
    },
  ];

  const renameSave = ({ name }) => {
    app.name = name;
    service.setPage(app);
    updateStore({ showRenameDlg: false });
    showSuccess('保存成功');
  };

  const bgColorSave = (color) => {
    app.bgColor = color;
    service.setPage(app);
    updateStore();
    message.success('保存成功');
  };

  return (
    <div className="make-header">
      <Modal
        title={'重命名'}
        visible={app.showRenameDlg}
        onCancel={() => {
          updateStore({ showRenameDlg: false });
        }}
        onOk={() => saveForm.submit()}
        maskClosable={false}
      >
        <Form form={saveForm} onFinish={renameSave} layout="horizontal">
          <FormRenderer layoutData={saveFormLayout}></FormRenderer>
        </Form>
      </Modal>
      <div className="left-part">可视化编辑器</div>
      <div className="center-part">
        <span className="title gray">当前页面：</span>
        <span className="title">{app.name}</span>
      </div>
      <div className="right-part">
        <Space size={12}>
          <Button icon={<EditOutlined />} onClick={() => updateStore({ showRenameDlg: true })}>
            重命名
          </Button>
          <ColorPicker color={app.bgColor} callback={bgColorSave} />
        </Space>
      </div>
    </div>
  );
}
