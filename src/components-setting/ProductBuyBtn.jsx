import React from 'react';
import { Radio, Input } from 'antd';
import ColorPicker from '../ColorPicker';
import './ProductBuyBtn.less';

export default function ProductBuyBtn({ selectedComponent, updateStore }) {
  const onChange = (name, value) => {
    selectedComponent.props[name] = value;
    updateStore();
  };
  const isP3 = selectedComponent.props.arrangeType === 'p3';
  return (
    <div className="buy-btn">
      {!isP3 ? (
        <Radio.Group
          value={selectedComponent.props.btnStyle}
          options={[
            { label: '样式一', value: 1 },
            { label: '样式二', value: 2 },
            { label: '样式三', value: 3 },
          ]}
          onChange={(e) => onChange('btnStyle', e.target.value)}
        />
      ) : null}
      {!isP3 ? (
        <Input
          value={selectedComponent.props.btnText}
          style={{
            width: 100,
            marginRight: 8,
          }}
          onChange={(e) => onChange('btnText', e.target.value)}
          disabled={selectedComponent.props.btnStyle === 3}
          maxLength={5}
        />
      ) : null}
      <ColorPicker
        color={selectedComponent.props.btnColor}
        callback={(color) => onChange('btnColor', color)}
        placement={isP3 ? 'top left' : 'top center'}
        text="按钮色"
      />
    </div>
  );
}
