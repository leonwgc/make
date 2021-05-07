import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import useDragMove from './hooks/useDragMove';
import './Preview.less';

export default function Preview({ children, visible, onClose }) {
  const previewRef = useRef();
  const app = useSelector((state) => state.app);
  useDragMove(previewRef);

  const { bgColor } = app;

  let style = {};
  if (bgColor) {
    style.backgroundColor = bgColor;
  }

  return (
    <div className={`preview ${!visible ? 'hide' : ''}`} ref={previewRef}>
      <CloseOutlined className="close" onClick={onClose} />
      <div className="screen" style={style}>
        {children}
      </div>
    </div>
  );
}
