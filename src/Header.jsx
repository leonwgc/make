import React from 'react';
import { Modal, Form } from 'antd';
import FormRenderer from 'antd-form-render';
import { useUpdateStore, useSelector } from 'simple-redux-store';
import { showSuccess } from './msg';
import ColorPicker from './ColorPicker';
import * as storage from './storage';
import './Header.less';
import { Icon, Button, Input, Space } from 'react-uni-comps';

export default function Header() {
  const app = useSelector((state) => state.app);
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
    storage.setPage(app);
    updateStore({ showRenameDlg: false });
    showSuccess('保存成功');
  };

  const bgColorSave = (color) => {
    app.bgColor = color;
    storage.setPage(app);
    updateStore();
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
          <Button
            icon={<Icon type="uc-icon-edit" />}
            onClick={() => updateStore({ showRenameDlg: true })}
          >
            重命名
          </Button>
          <ColorPicker color={app.bgColor} callback={bgColorSave} />
        </Space>
      </div>
    </div>
  );
}
