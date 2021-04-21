import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { SketchPicker } from 'react-color';
import './ColorPicker.less';

export default function ColorPicker({
  selectedComponent = {},
  updateStore,
  prop = 'bgColor',
  label = '自定义背景色',
}) {
  let color = selectedComponent.props[prop];
  const [checked, setChecked] = useState(!!color);
  const [visible, setVisible] = useState(false);

  return (
    <div className="color-picker">
      <Checkbox
        checked={checked}
        onChange={(e) => {
          const { checked } = e.target;
          selectedComponent.props[prop] = !checked ? '' : '#f7f7f7';
          updateStore();
          setChecked(checked);
        }}
      >
        {label}
      </Checkbox>
      {checked ? (
        <div className="btn" style={{ background: color }} onClick={() => setVisible(true)}>
          {visible ? (
            <div>
              <SketchPicker
                color={color}
                onChangeComplete={(c) => {
                  selectedComponent.props[prop] = c.hex;
                  updateStore();
                }}
              />
              <div
                className="cover"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                }}
              ></div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
