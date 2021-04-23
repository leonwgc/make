import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Tabs, Form, Input, Checkbox, Radio, Divider, Select } from 'antd';
import FormRenderer from 'antd-form-render';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

const shape = {
  name: '',
  type: '',
  label: '',
};

const typeOptions = [
  { label: 'Input', value: 'Input' },
  { label: 'Select', value: 'Select' },
];

// 自定义设置面板
export default function MyForm({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();

  const { list, remove, getKey, push } = useDynamicList(
    selectedComponent.props?.formList || [{ ...shape }]
  );

  const Row = (index, item) => (
    <div style={{ display: 'flex' }} key={getKey(index)}>
      <div>
        <Form.Item
          rules={[{ required: true, message: 'required' }]}
          name={['label', getKey(index)]}
          initialValue={item.label}
        >
          <Input placeholder="label" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'required' }]}
          name={['name', getKey(index)]}
          initialValue={item.name}
        >
          <Input placeholder="name" name={['name', getKey(index)]} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'required' }]}
          name={['type', getKey(index)]}
          initialValue={item.type}
        >
          <Select placeholder="type" name={['type', getKey(index)]} options={typeOptions} />
        </Form.Item>
      </div>
      <div style={{ marginTop: 4 }}>
        {list.length > 1 && (
          <MinusCircleOutlined
            style={{ marginLeft: 8 }}
            onClick={() => {
              remove(index);
            }}
          />
        )}
        <PlusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            push({ ...shape });
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Form form={form}>{list.map((ele, index) => Row(index, ele))}</Form>
      <Button
        style={{ marginTop: 8 }}
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((val) => {
              const keys = Object.keys(val);
              var len = val[keys[0]].length;
              var ar = [];
              for (var i = 0; i < len; i++) {
                ar.push({
                  name: val['name'][i],
                  label: val['label'][i],
                  type: val['type'][i],
                });
              }

              selectedComponent.props.formList = ar;
              updateStore();
            })
            .catch(() => {})
        }
      >
        Submit
      </Button>
    </>
  );
}
