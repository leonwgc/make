import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Radio, Switch, Divider, InputNumber } from 'antd';
import './ProductNum.less';

export default function ProdectNum({ selectedComponent, updateStore }) {
  const { productNum = [1] } = selectedComponent.props;

  const onChange = (value, idx) => {
    const arr = [...productNum];
    arr[idx] = value;
    selectedComponent.props.productNum = arr;
    updateStore();
  };
  return (
    <div className="product-num-container">
      <div className="group-name">
        <span>显示商品个数</span>
        {!selectedComponent.props.tabGroup?.exist ? (
          <InputNumber
            value={productNum[0]}
            onChange={(value) => onChange(value, 0)}
            min={1}
            max={999}
          />
        ) : (
          selectedComponent.props.tabGroup?.tabs?.map((value, idx) => (
            <div className="num-item" key={idx}>
              {value}
              <InputNumber
                value={productNum[idx] || 1}
                onChange={(value) => onChange(value, idx)}
                min={1}
                max={999}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
