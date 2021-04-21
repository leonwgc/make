import React, { useEffect, useState } from 'react';
import FormRenderer from 'antd-form-render';
import { useSelector } from 'react-redux';
import * as storage from './storage';
import { gid } from './helper';
import { Modal, Form, Input, message } from 'antd';
import { getConfigById } from './components/index';

export default function SaveAsTemplate({ updateStore, comp }) {
  const [tplForm] = Form.useForm();
  const app = useSelector((state) => state.app);

  const tplFormLayout = [
    {
      type: Input,
      label: '模板名称',
      placeholder: '请输入',
      rules: [{ required: true, message: '请填写模板名称' }],
      name: 'name',
    },
  ];
  const saveAsTpl = (formData) => {
    storage.addTpl({
      comp,
      cid: comp.cid,
      ...formData,
      tid: gid(),
    });
    updateStore({ showTplDlg: false, _f: Math.random() });
    tplForm.resetFields();
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
        onOk={() => tplForm.submit()}
      >
        <Form form={tplForm} onFinish={saveAsTpl} layout="vertical">
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
