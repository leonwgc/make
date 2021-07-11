import React, { useRef } from 'react';
import { useSelector } from 'simple-redux-store';
import { CloseOutlined } from '@ant-design/icons';
import { useDragMove } from 'react-use-lib';
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
