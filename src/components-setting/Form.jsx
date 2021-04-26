import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Tabs, Form, Input, Checkbox, Radio, Divider, Select } from 'antd';
import FormRenderer from 'antd-form-render';
import { MinusCircleFilled, EditFilled, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';

const typeMapping = {
  Input,
  Checkbox,
  Select,
};

// 自定义设置面板
export default function MyForm({ selectedComponent, updateStore }) {
  const app = useSelector((state) => state.app);
  const [form] = Form.useForm();

  const { showFormFieldAdd = false } = app;

  const [t, setT] = useState('Input');

  const list = selectedComponent.props.list || [];

  const layout = [
    {
      type: Input,
      label: 'name',
      placeholder: '请输入',
      name: 'name',
      itemProps: {
        rules: [{ required: true, message: '请填写' }],
      },
    },
    {
      type: Input,
      label: 'label',
      placeholder: '请输入',
      name: 'label',
      itemProps: {
        rules: [{ required: true, message: '请填写' }],
      },
    },
    {
      type: Select,
      label: 'type',
      placeholder: '请选择',
      name: 'type',
      itemProps: {
        rules: [{ required: true, message: '请填写' }],
        initialValue: 'Input',
      },
      elProps: {
        options: [
          { label: '输入框', value: 'Input' },
          { label: '多项选择', value: 'Checkbox' },
          { label: '下拉框', value: 'Select' },
        ],
        onChange: (v) => setT(v),
      },
    },
    {
      getJSON() {
        return t === 'Select' || t === 'Checkbox'
          ? {
              type: Select,
              label: 'labels',
              name: 'labels',
              itemProps: {
                rules: [{ required: true, message: '请填写' }],
                initialValue: '选项1',
              },
              elProps: {
                mode: 'tags',
              },
            }
          : null;
      },
    },
    {
      getJSON() {
        return t === 'Select' || t === 'Checkbox'
          ? {
              type: Select,
              label: 'values',
              name: 'values',
              itemProps: {
                rules: [{ required: true, message: '请填写' }],
                initialValue: '选项1的值',
              },
              elProps: {
                mode: 'tags',
              },
            }
          : null;
      },
    },
    {
      getJSON() {
        return t === 'Input'
          ? {
              type: Select,
              label: 'inputType',
              name: 'inputType',
              itemProps: {
                rules: [{ required: true, message: '请填写' }],
                initialValue: 'text',
              },
              elProps: {
                options: [
                  { label: 'text', value: 'text' },
                  { label: 'number', value: 'number' },
                  { label: 'idcard', value: 'idcard' },
                  { label: 'price', value: 'price' },
                  { label: 'password', value: 'password' },
                  { label: 'search', value: 'search' },
                ],
              },
            }
          : null;
      },
    },
  ];

  const flayout = list.map((item) => {
    const { labels = [], values = [], name, type, label } = item;
    let props = {};
    if (labels.length) {
      props.options = labels.map((_i, idx) => {
        return { label: _i, value: values[idx] || _i };
      });
    }
    return {
      render() {
        return (
          <Form.Item name={name} label={label} key={name}>
            {React.createElement(typeMapping[type], props)}

            <Form.Item noStyle>
              <MinusCircleFilled
                onClick={() => {
                  selectedComponent.props.list = list.filter((i) => i.name !== item.name);
                  updateStore();
                }}
              />
            </Form.Item>
          </Form.Item>
        );
      },
    };
  });

  return (
    <>
      <FormRenderer layoutData={flayout}></FormRenderer>
      <Button
        style={{ width: '100%' }}
        onClick={() => updateStore({ showFormFieldAdd: true })}
        block
        icon={<PlusOutlined />}
      >
        添加
      </Button>
      <Modal
        title="添加字段"
        visible={showFormFieldAdd}
        onCancel={() => {
          updateStore({ showFormFieldAdd: false });
          form.resetFields();
          setT('Input');
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={(v) => {
            list.push(v);
            selectedComponent.props.list = [...list];
            updateStore({ showFormFieldAdd: false });
            form.resetFields();
            setT('Input');
          }}
        >
          <FormRenderer layoutData={layout}></FormRenderer>
        </Form>
      </Modal>
    </>
  );
}
