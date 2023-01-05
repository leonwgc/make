import React, { useEffect, useState } from 'react';
import { Form, Radio, Divider } from 'antd';
import FormRenderer from 'antd-form-render';
import ColorPicker from './ColorPicker';
import { getSwitch } from './common';
import ProductTab from './ProductTab';
import ProductManage from './ProductManage';
import TabGroup from './TabGroup';
import ProductNum from './ProductNum';
import ProductBuyBtn from './ProductBuyBtn';
import { cloneDeep } from 'lodash';
import { Icon } from 'react-uni-comps';
import './ProductMc.less';

// 自定义设置面板

// 默认值和组件默认值一致
const defaults = {
  arrangeType: 'p2',
  fontWeight: 'normal',
  showTitle: true,
  showPrice: true,
  showOrigin: false,
  showBtn: true,
  btnStyle: 1,
  btnText: '抢',
  btnColor: '#FF5D0D',
  tabGroup: {
    exist: false,
    theme: 'light',
    tabs: ['分组1', '分组2'],
    products: [],
  },
  productNum: [2], //商品显示个数配置,
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
      label: '排列样式',
      type: Radio.Group,
      name: 'arrangeType',
      elProps: {
        optionType: 'button',
        onChange: (e) => {
          const { value } = e.target;
          let _productNum = selectedComponent.props.productNum.slice();
          let defaultNum = value === 'p2' ? 2 : 3;
          _productNum = _productNum.map((value) => defaultNum);

          selectedComponent.props.productNum = _productNum;
          selectedComponent.props.arrageType = value;
          updateStore();
        },
        options: [
          {
            label: <Icon type="iconcommodity2a1" />,
            value: 'p2',
          },
          { label: <Icon type="iconcommodity2a2" />, value: 'p3' },
        ],
        defaultValue: 'p2',
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
        return <TabGroup selectedComponent={selectedComponent} updateStore={updateStore} />;
      },
    },
    {
      render() {
        return <ProductNum selectedComponent={selectedComponent} updateStore={updateStore} />;
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
    getSwitch('按钮', 'showBtn', selectedComponent),
    {
      render() {
        return <ProductBuyBtn selectedComponent={selectedComponent} updateStore={updateStore} />;
      },
    },
    {
      render() {
        return (
          <div style={{ paddingTop: 16 }}>
            <ColorPicker selectedComponent={selectedComponent} updateStore={updateStore} />
          </div>
        );
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
