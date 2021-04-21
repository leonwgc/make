import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Tabs, Form, Input, message } from 'antd';
import FormRenderer from 'antd-form-render';
import useSelectedComponent from './hooks/useSelectedComponent';
import useUpdateStore from './hooks/useUpdateStore';
import { getConfigById } from './components/index';
import SaveAsTemplate from './SaveAsTemplate';
import './SettingPanel.less';

const { TabPane } = Tabs;

function SettingPanel() {
  const [form] = Form.useForm();
  const comp = useSelectedComponent();
  const app = useSelector((state) => state.app);
  const updateStore = useUpdateStore();
  const [tab, setTab] = useState('0');
  const [hasProps, setHasProps] = useState(false);
  const [hasStyle, setHasStyle] = useState(false);

  let cfg = {};

  useEffect(() => {
    if (comp) {
      form.resetFields();
      const { cid } = comp;
      cfg = getConfigById(cid);
      let { style = {}, props = {} } = cfg.setting;
      const hasStyle = Object.keys(style).length;
      const hasProps = Object.keys(props).length;
      setHasProps(hasProps);
      setHasStyle(hasStyle);
      const tab = hasProps ? '0' : hasStyle ? '1' : '0';
      setTab(tab);
    }
  }, [comp]);

  if (!comp) {
    return <div className="prop-setting hide"></div>;
  }

  const initValues = { ...comp.props, ...comp.style };
  const { cid } = comp;
  cfg = getConfigById(cid);
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
      <div className="title">
        {cfg.name}
        {/* <SaveAsTemplate updateStore={updateStore} comp={comp} /> */}
      </div>
      <div className="setting">{renderPanel()}</div>
    </div>
  );
}

export default SettingPanel;
