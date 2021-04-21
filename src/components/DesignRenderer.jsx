import React from 'react';
import Icon from '../Icon';
import './DesignRenderer.less';

export default function DesignRenderer({ iconName = '', label = '', type, deleteNode = null }) {
  return (
    <div className={`design-renderer ${type}`}>
      <Icon type={iconName} className="dr-icon"></Icon>
      <div className="label">{label}</div>
      {deleteNode}
    </div>
  );
}
