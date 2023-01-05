import React, { useEffect, useState } from 'react';
import { Form, Radio, Divider, InputNumber } from 'antd';
import FormRenderer from 'antd-form-render';
import ColorPicker from './ColorPicker';
import { getSwitch } from './common';
import ProductTab from './ProductTab';
import ProductManage from './ProductManage';
import { cloneDeep } from 'lodash';
import './ProductMc.less';

// 自定义设置面板

// 默认值和组件默认值一致
const defaults = {
  textAlign: 'left',
  fontWeight: 'normal',
  showTitle: true,
  showPrice: true,
  showOrigin: false,
  tabGroup: {
    exist: false,
    products: [],
  },
  productNum: 4, //商品显示个数配置,
};

export default function ProductMc({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();

  useEffect(() => {
    selectedComponent.props = { ...cloneDeep(defaults), ...selectedComponent.props };
    updateStore();
    form.resetFields();
  }, []);

  const formLayout = [
    {
      type: InputNumber,
      label: '显示商品个数',
      name: 'productNum',
      elProps: {
        style: {
          float: 'right',
        },
        min: 4,
        max: 8,
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      type: Radio.Group,
      label: '文本对齐',
      name: 'textAlign',
      elProps: {
        options: [
          { label: '左对齐', value: 'left' },
          {
            label: '居中对齐',
            value: 'center',
            disabled: selectedComponent.props.layoutMode === 'small',
          },
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
          { label: '常规', value: 'normal' },
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
    getSwitch('商品名称', 'showTitle', selectedComponent),
    getSwitch('价格', 'showPrice', selectedComponent),
    getSwitch('原价', 'showOrigin', selectedComponent),
    {
      render() {
        return <Divider style={{ margin: ' 0 0 16px' }} />;
      },
    },
    {
      render() {
        return <ColorPicker selectedComponent={selectedComponent} updateStore={updateStore} />;
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
  const typeList = [
    { key: '0', name: '模块设置' },
    { key: '1', name: '商品管理' },
  ];

  const [type, setType] = useState('0');

  return (
    <div className="product-setting">
      <Form
        form={form}
        onValuesChange={onValuesChange}
        layout="horizontal"
        initialValues={initialValues}
      >
        <ProductTab type={type} setType={setType} tabs={typeList} />
        <div className="render-wraper">
          {type === '0' ? (
            <FormRenderer layoutData={formLayout}></FormRenderer>
          ) : (
            <ProductManage selectedComponent={selectedComponent} updateStore={updateStore} />
          )}
        </div>
      </Form>
    </div>
  );
}
