import React from 'react';
import { Icon } from 'react-uni-comps';
import './TplComp.less';

export default function TplComp({ iconName = '', label = '', type, deleteNode = null }) {
  return (
    <div className={`tpl-comp ${type}`}>
      <Icon type={iconName}></Icon>
      <div className="label">{label}</div>
      {deleteNode}
    </div>
  );
}
