import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Tabs, Form, Input, message } from 'antd';
import FormRenderer from 'antd-form-render';
import useSelectedComponent from './hooks/useSelectedComponent';
import useUpdateStore from './hooks/useUpdateStore';
import { getConfigById } from './components/index';
import './SettingPanel.less';

function SettingPanel() {
  const [form] = Form.useForm();
  const comp = useSelectedComponent();
  const updateStore = useUpdateStore();

  useEffect(() => {
    if (comp) {
      form.resetFields();
    }
  }, [comp, form]);

  if (!comp) {
    return <div className="prop-setting hide"></div>;
  }

  const initValues = { ...comp.props, ...comp.style };
  const { cid } = comp;
  const cfg = getConfigById(cid);
  let { props = {}, style = {} } = cfg.setting;
  const propFields = Object.keys(props);
  const styleFields = Object.keys(style);

  const onValuesChange = (changedValues) => {
    let ckeys = Object.keys(changedValues);
    let v;
    for (let k of ckeys) {
      v = changedValues[k];
      if (propFields.includes(k)) {
        comp.props = { ...comp.props, [k]: v };
      } else {
        comp.style = { ...comp.style, [k]: v };
      }
    }

    updateStore();
  };

  const propsLayoutData = [];
  const styleLayoutData = [];

  propFields.map((key) => {
    propsLayoutData.push({
      name: key,
      ...props[key],
    });
  });

  styleFields.map((key) => {
    styleLayoutData.push({
      name: key,
      ...style[key],
    });
  });

  const renderPanel = () => {
    const type = cfg.setting;
    if (typeof type === 'function') {
      return (
        <div className="item">
          {React.createElement(type, {
            key: comp.id,
            selectedComponent: comp,
            updateStore,
          })}
        </div>
      );
    } else {
      return (
        <Form
          form={form}
          onValuesChange={onValuesChange}
          layout="vertical"
          initialValues={initValues}
        >
          <div className="item">
            <FormRenderer layoutData={propsLayoutData}></FormRenderer>
            <FormRenderer layoutData={styleLayoutData}></FormRenderer>
          </div>
        </Form>
      );
    }
  };

  return (
    <div className="prop-setting">
      <div className="title">{cfg.name}</div>
      <div className="setting">{renderPanel()}</div>
    </div>
  );
}

export default SettingPanel;
