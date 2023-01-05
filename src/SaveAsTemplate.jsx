import React from 'react';
import FormRenderer from 'antd-form-render';
import { useAppData } from 'simple-redux-store';
import * as storage from './storage';
import { gid } from './helper';
import { Modal, Form, Input, message } from 'antd';
import { getConfigById } from './components/index';

const tplFormLayout = [
  {
    type: Input,
    label: '模板名称',
    placeholder: '请输入',
    rules: [{ required: true, message: '请填写模板名称' }],
    name: 'name',
  },
];

export default function SaveAsTemplate({ updateStore, comp }) {
  const [form] = Form.useForm();
  const app = useAppData();

  const saveAsTpl = ({ name = '' }) => {
    storage.addTpl({
      tpl: JSON.stringify(comp),
      cid: comp.cid,
      name,
      tplId: gid(),
    });

    app.tplList = storage.getTplList();

    updateStore({ showTplDlg: false });
    form.resetFields();
    message.success('保存成功');
  };

  const cfg = getConfigById(comp.cid);
  const { isConfig = false } = cfg;

  return (
    <>
      <Modal
        title={'保存至我的模版'}
        visible={app.showTplDlg}
        onCancel={() => {
          updateStore({ showTplDlg: false });
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={saveAsTpl} layout="vertical">
          <FormRenderer layoutData={tplFormLayout}></FormRenderer>
        </Form>
      </Modal>

      {!isConfig ? (
        <span className="save-cTpl" onClick={() => updateStore({ showTplDlg: true })}>
          保存至我的模版
        </span>
      ) : null}
    </>
  );
}
