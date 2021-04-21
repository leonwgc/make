import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from 'antd';
import './ColorPicker.less';

export default function ColorPicker({ text = '背景色', color, callback, placement = 'right' }) {
  const [visible, setVisible] = useState(false);

  return (
    <Button className="color-picker-btn" onClick={() => setVisible(true)}>
      <i style={{ background: color }}></i>
      {text}
      {visible ? (
        <div className={`placement ${placement}`}>
          <SketchPicker color={color} onChangeComplete={(c) => callback(c.hex)} />
          <div
            className="cover"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          ></div>
        </div>
      ) : null}
    </Button>
  );
}
