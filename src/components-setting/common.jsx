import React, { useEffect, useState } from 'react';
import { Button, Modal, Tabs, Form, Input, message, Radio, Switch, Divider } from 'antd';

export function getSwitch(label, name, selectedComponent, visible = true, showTip = true) {
  let _label = (
    <div className="switch-label">
      {label}
      {showTip ? (
        <span className="tip">{selectedComponent.props[name] ? '显示' : '隐藏'}</span>
      ) : null}
    </div>
  );

  return (
    visible && {
      label: _label,
      name,
      type: Switch,
      elProps: {
        style: {
          float: 'right',
          marginTop: -10,
        },
        size: 'small',
      },
      itemProps: {
        valuePropName: 'checked',
        colon: false,
      },
    }
  );
}
