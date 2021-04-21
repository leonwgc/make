import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Tabs, Form, Input, Checkbox, Radio, Divider } from 'antd';
import FormRenderer from 'antd-form-render';
import MutipleImages from '../prop-setting-components/MutipleImages';
import ColorPicker from './ColorPicker';
import './Carousel.less';

// 自定义设置面板
export default function SlideImage({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();

  const formLayout = [
    {
      render() {
        return (
          <MutipleImages
            title={
              <div className="image-upload-title">
                <span className="t">上传图片</span>
                <span className="d">(宽192像素)</span>
              </div>
            }
          />
        ); // 动态添加多张图片
      },
    },
    {
      render() {
        return <ColorPicker selectedComponent={selectedComponent} updateStore={updateStore} />;
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <Form.Item name="hideMargin" valuePropName="checked">
            <Checkbox>隐藏该模块下方的白色间隙</Checkbox>
          </Form.Item>
        );
      },
    },
  ];

  const onValuesChange = (changedValues) => {
    let keys = Object.keys(changedValues);
    for (let k of keys) {
      selectedComponent.props = { ...selectedComponent.props, [k]: changedValues[k] };
    }

    updateStore();
  };

  return (
    <Form form={form} onValuesChange={onValuesChange} layout="horizontal">
      <div className="item carousel-setting ">
        <FormRenderer layoutData={formLayout}></FormRenderer>
      </div>
    </Form>
  );
}
