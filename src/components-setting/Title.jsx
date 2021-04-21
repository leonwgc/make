import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Tabs, Form, Input, Checkbox, Radio, Divider, Switch } from 'antd';
import FormRenderer from 'antd-form-render';
import ColorPicker from './ColorPicker';
import './Title.less';

// 自定义设置面板
export default function Title({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();
  const [isUseLink, setIsUseLink] = useState(!!selectedComponent.props.bgImage);

  const formLayout = [
    {
      label: '文本对齐',
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
      label: '文本样式',
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
      label: '标题',
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
      label: '标题大小',
      name: 'fontSize',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '28px', value: 28 },
          { label: '30px', value: 30 },
          { label: '34px', value: 34 },
        ],
        defaultValue: 28,
      },
    },
    {
      render() {
        return (
          <div className="my-switch" style={{ margin: '16px 0' }}>
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
              />
            </span>
          </div>
        );
      },
    },
    {
      render() {
        return isUseLink ? (
          <Form.Item name="link">
            <Input />
          </Form.Item>
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
            label="自定义箭头颜色"
            prop="arrowColor"
            selectedComponent={selectedComponent}
            updateStore={updateStore}
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
            label="自定义文本色"
            prop="color"
            selectedComponent={selectedComponent}
            updateStore={updateStore}
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
        return <ColorPicker selectedComponent={selectedComponent} updateStore={updateStore} />;
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
