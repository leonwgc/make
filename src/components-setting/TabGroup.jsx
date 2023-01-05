import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Radio, Switch, Divider } from 'antd';
import './TabGroup.less';

const themes = [
  { label: '亮色模式', value: 'light' },
  { label: '暗色模式', value: 'dark' },
];
export default function TabGroup({ selectedComponent, updateStore }) {
  const { tabGroup = {} } = selectedComponent?.props;
  const { tabs = [], products = [] } = tabGroup;

  const add = () => {
    let arr = [...tabs, `分组${tabs.length + 1}`];
    selectedComponent.props.tabGroup.tabs = arr;
    selectedComponent.props.productNum = [...selectedComponent.props.productNum, 1];
    updateStore();
  };

  const del = (index) => {
    let _tabs = tabs.slice();
    let _products = products.slice();
    let _productNum = selectedComponent.props.productNum.slice();

    _tabs.splice(index, 1);
    _products.splice(index, 1);
    _productNum.splice(index, 1);

    selectedComponent.props.tabGroup.tabs = _tabs;
    selectedComponent.props.tabGroup.products = _products;
    selectedComponent.props.productNum = _productNum;
    updateStore();
  };

  const onInputChange = (value, index) => {
    let arr = tabs.slice();
    arr.splice(index, 1, value);
    selectedComponent.props.tabGroup.tabs = arr;
    updateStore();
  };

  const getProductNum = (checked, num) => {
    const { productNum, tabGroup = [] } = selectedComponent.props;
    let _productNum = tabGroup.tabs?.map((v) => num);

    _productNum[0] = productNum[0];
    if (!checked) _productNum = _productNum.slice(0, 1);
    return _productNum;
  };

  return (
    <div className="tab-group-container">
      <div className="s1 group-name">
        <span>Tab分组</span>
        <Switch
          checked={tabGroup.exist}
          onChange={(value) => {
            let _productNum = [1];
            const { arrangeType } = selectedComponent.props;
            if (!arrangeType) {
              _productNum = getProductNum(value, 1);
            } else if (arrangeType === 'p2') {
              _productNum = getProductNum(value, 2);
            } else if (arrangeType === 'p3') {
              _productNum = getProductNum(value, 3);
            }
            selectedComponent.props.productNum = _productNum;
            selectedComponent.props.tabGroup.exist = value;
            updateStore();
          }}
          size="small"
        />
      </div>
      {tabGroup.exist ? (
        <div className="group-content">
          <Radio.Group
            value={tabGroup.theme}
            options={themes}
            onChange={(e) => {
              selectedComponent.props.tabGroup.theme = e.target.value;
              updateStore();
            }}
          />
          <a onClick={add}>新增分组</a>
          {tabs.map((value, index) => (
            <div className="tab-item" key={index}>
              <Input
                value={value}
                onChange={(e) => onInputChange(e.target.value, index)}
                maxLength={5}
              />
              <a onClick={() => del(index)} disabled={tabs.length <= 2}>
                删除
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
