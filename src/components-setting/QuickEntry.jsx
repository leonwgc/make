import React, { useEffect, useState } from 'react';
import { Form, Radio, Divider, Select } from 'antd';
import FormRenderer from 'antd-form-render';
import * as service from '../service';
import { cloneDeep } from 'lodash';
import './QuickEntry.less';

// 自定义设置面板

// 默认值和组件默认值一致
const defaults = {
  arrangeType: 4,
  fontWeight: 'normal',
  tags: [],
};

export default function QuickEntry({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    selectedComponent.props = { ...cloneDeep(defaults), ...selectedComponent.props };
    updateStore();
    form.resetFields();
  }, []);

  useEffect(() => {
    service.getQuickEntryTags().then(({ result = [] }) => {
      setTagList(result.map((item) => ({ label: item, value: item })));
    });
  }, []);

  const formLayout = [
    {
      type: Radio.Group,
      label: '排列方式',
      name: 'arrangeType',
      elProps: {
        options: [
          { label: '一行四个', value: 4 },
          { label: '一行五个', value: 5 },
        ],
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      type: Radio.Group,
      label: '文本样式',
      name: 'fontWeight',
      elProps: {
        options: [
          { label: '标准', value: 'normal' },
          { label: '加粗', value: 'bold' },
        ],
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return <div className="group-name">内容控制</div>;
      },
    },
    {
      type: Select,
      name: 'tags',
      elProps: {
        mode: 'multiple',
        allowClear: false,
        placeholder: '请选择应用',
        options: tagList,
      },
    },
  ];

  const initialValues = { ...defaults, ...selectedComponent.props };

  const onValuesChange = (changedValues) => {
    let keys = Object.keys(changedValues);
    for (let k of keys) {
      selectedComponent.props = { ...selectedComponent.props, [k]: changedValues[k] };
    }

    updateStore();
  };

  return (
    <div className="quick-entry-setting">
      <Form
        form={form}
        onValuesChange={onValuesChange}
        layout="horizontal"
        initialValues={initialValues}
      >
        <div className="item">
          <FormRenderer layoutData={formLayout}></FormRenderer>
        </div>
      </Form>
    </div>
  );
}
