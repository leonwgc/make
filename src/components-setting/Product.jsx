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
import { Icon } from 'react-uni-comps';
import { cloneDeep } from 'lodash';
import './Product.less';

const layoutModeEnum = [
  {
    label: <Icon type="iconshangpin-yihangyige-datu" />,
    value: 'big',
    title: '大图模式',
  },
  {
    label: <Icon type="iconshangpin-yihangyige-mingxi" />,
    value: 'small',
    title: '明细列表',
  },
  {
    label: <Icon type="iconshangpin-yihangyige-jijian" />,
    value: 'simple',
    title: '极简列表',
  },
];

// 自定义设置面板

// 默认值和组件默认值一致
const defaults = {
  layoutMode: 'big',
  textAlign: 'left',
  fontWeight: 'normal',
  showTitle: true,
  showDesc: false,
  showPrice: true,
  showOrigin: false,
  showBtn: true,
  btnStyle: 1,
  btnText: '立即购买',
  btnColor: '#FF5D0D',
  tabGroup: {
    exist: false,
    theme: 'light',
    tabs: ['分组1', '分组2'],
    products: [],
  },
  productNum: [1], //商品显示个数配置
};

export default function Product({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();
  const isSimple = selectedComponent.props.layoutMode === 'simple';

  useEffect(() => {
    selectedComponent.props = { ...cloneDeep(defaults), ...selectedComponent.props };
    updateStore();
    form.resetFields();
  }, []);

  const formLayout = [
    {
      render() {
        const title = layoutModeEnum.find(
          (item) => item.value === selectedComponent.props?.layoutMode
        )?.title;
        return (
          <Form.Item
            label={
              <div className="layoutMode">
                排列样式<span>{title}</span>
              </div>
            }
            name="layoutMode"
          >
            <Radio.Group
              options={layoutModeEnum}
              optionType="button"
              onChange={(e) => {
                if (e.target.value === 'simple') {
                  form.setFieldsValue({ showDesc: true });
                  selectedComponent.props.showDesc = true;
                  updateStore();
                }
              }}
            />
          </Form.Item>
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
          selectedComponent.props.layoutMode === 'big' && (
            <>
              <Form.Item label="对齐方式" name="textAlign">
                <Radio.Group
                  options={[
                    { label: '居左', value: 'left' },
                    {
                      label: '居中',
                      value: 'center',
                    },
                  ]}
                />
              </Form.Item>
              <Divider style={{ margin: '16px 0' }} />
            </>
          )
        );
      },
    },
    {
      type: Radio.Group,
      name: 'fontWeight',
      label: '标题粗细',
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
    getSwitch('商品描述', 'showDesc', selectedComponent),
    getSwitch('价格', 'showPrice', selectedComponent, !isSimple),
    getSwitch('原价', 'showOrigin', selectedComponent, !isSimple),
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
