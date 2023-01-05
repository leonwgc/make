import React, { useState } from 'react';
import { Form, Input, Radio, Divider, Switch } from 'antd';
import FormRenderer from 'antd-form-render';
import ColorPicker from './ColorPicker';
import './Title.less';

// 自定义设置面板
export default function Title({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();
  const [isUseLink, setIsUseLink] = useState(!!selectedComponent.props.bgImage);

  const formLayout = [
    {
      label: '标题内容',
      name: 'text',
      type: Input.TextArea,
      elProps: {
        maxLength: 10,
        showCount: true,
        autoSize: { minRows: 1, maxRows: 1 },
        defaultValue: '标题',
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      label: '对齐方式',
      name: 'textAlign',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '居左对齐', value: 'left' },
          { label: '居中对齐', value: 'center' },
        ],
        defaultValue: 'left',
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      label: '标题粗细',
      name: 'fontWeight',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '标准', value: 'normal' },
          { label: '加粗', value: 'bold' },
        ],
        defaultValue: 'normal',
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      label: '字体大小',
      name: 'fontSize',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '小', value: 14 },
          { label: '中', value: 15 },
          { label: '大', value: 17 },
        ],
        defaultValue: 14,
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <div className="my-switch" style={{ marginTop: '16px 0' }}>
            <label>跳转详情</label>
            <span>
              <Switch
                checked={isUseLink}
                onChange={(c) => {
                  if (!c) {
                    selectedComponent.props.link = '';
                    form.setFieldsValue({ link: '' });
                    updateStore();
                  }
                  setIsUseLink(c);
                }}
                size="small"
              />
            </span>
          </div>
        );
      },
    },
    {
      render() {
        return isUseLink ? (
          <div
            style={{ padding: '12px 12px 16px', margin: '12px -12px -16px', background: '#F0F0F0' }}
          >
            <Form.Item name="link">
              <Input />
            </Form.Item>
            <ColorPicker
              label="自定义箭头颜色"
              prop="arrowColor"
              selectedComponent={selectedComponent}
              updateStore={updateStore}
              defaultColor="#8C8C8C"
            />
          </div>
        ) : null;
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <ColorPicker
            label="自定义标题颜色"
            prop="color"
            selectedComponent={selectedComponent}
            updateStore={updateStore}
            defaultColor="#000"
          />
        );
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <ColorPicker
            selectedComponent={selectedComponent}
            updateStore={updateStore}
            defaultColor="#fff"
          />
        );
      },
    },
  ];

  const initialValues = { ...selectedComponent.props };

  const onValuesChange = (changedValues) => {
    let keys = Object.keys(changedValues);
    for (let k of keys) {
      selectedComponent.props = { ...selectedComponent.props, [k]: changedValues[k] };
    }

    updateStore();
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      layout="vertical"
      initialValues={initialValues}
    >
      <div className="item title-setting ">
        <FormRenderer layoutData={formLayout}></FormRenderer>
      </div>
    </Form>
  );
}
