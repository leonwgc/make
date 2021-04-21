import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Space, Form, Input, message, Popconfirm } from 'antd';
import useUpdateStore from './hooks/useUpdateStore';
import FormRenderer from 'antd-form-render';
import DataRenderer from './components/DataRenderer';
import Preview from './Preview';
import './Footer.less';

export default function Footer() {
  const app = useSelector((state) => state.app);
  const [saveForm] = Form.useForm();
  const updateStore = useUpdateStore();

  const onPreview = () => {
    updateStore({ preview: true });
  };

  // const onClear = () => {
  //   updateStore({ comps: [], activeComp: null });
  // };

  const save = (formData) => {
    // todo: save to db
    console.log({
      ...formData,
      comps: app.comps,
    });
    updateStore({ showSaveDlg: false, _f: Math.random() });
    saveForm.resetFields();
    message.success('保存成功');
  };

  // save
  const saveFormLayout = [
    {
      type: Input,
      label: '活动名称',
      placeholder: '请输入',
      name: 'name',
      itemProps: {
        rules: [{ required: true, message: '请填写' }],
      },
    },
    {
      type: Input,
      label: '页面背景色',
      placeholder: '请输入',
      name: 'bgColor',
      itemProps: {
        initialValue: '#fff',
      },
    },
    {
      type: Input.TextArea,
      label: '描述',
      placeholder: '请输入',
      name: 'desc',
    },
  ];

  return (
    <>
      <div className="footer">
        <div className="content">
          <Space>
            <Popconfirm
              title="确定要发布此页面吗？"
              onConfirm={() => {
                save();
                alert('ok');
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary">发布</Button>
            </Popconfirm>
            <Button type="default">保存</Button>
            <Button type="default">存为模版</Button>
            <Button type="default" onClick={onPreview}>
              预览
            </Button>
            {/* <Button type="default" danger onClick={onClear}>
              清空
            </Button> */}
          </Space>
        </div>

        <Modal
          title={'保存活动'}
          visible={app.showSaveDlg}
          onCancel={() => {
            updateStore({ showSaveDlg: false });
          }}
          onOk={() => saveForm.submit()}
        >
          <Form form={saveForm} onFinish={save} layout="vertical">
            <FormRenderer layoutData={saveFormLayout}></FormRenderer>
          </Form>
        </Modal>
      </div>
      <Preview visible={app.preview} onClose={() => updateStore({ preview: false })}>
        <DataRenderer data={app} />
      </Preview>
    </>
  );
}
