import React, { useRef } from 'react';
import { useSelector } from 'simple-redux-store';
import { CloseOutlined } from '@ant-design/icons';
import './Preview.less';
import { Drag } from 'react-uni-comps';

export default function Preview({ children, visible, onClose }) {
  const previewRef = useRef();
  const app = useSelector((state) => state.app);

  const { bgColor } = app;

  let style = {};
  if (bgColor) {
    style.backgroundColor = bgColor;
  }

  return (
    <Drag ref={previewRef}>
      <div className={`preview ${!visible ? 'hide' : ''}`}>
        <CloseOutlined className="close" onClick={onClose} />
        <div className="screen" style={style}>
          {children}
        </div>
      </div>
    </Drag>
  );
}
