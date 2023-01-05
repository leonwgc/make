import React, { useState } from 'react';
import { Switch } from 'antd';
import FormRenderer from 'antd-form-render';
import ImageUpload from '../prop-setting-components/ImageUpload';
import './H5Header.less';

// 自定义设置面板
export default function H5Header({ selectedComponent, updateStore }) {
  const [isUseCustPic, setIsUseCustPic] = useState(!!selectedComponent.props.bgImage);

  const formLayout = [
    {
      render() {
        return (
          <div className="my-switch">
            <label>自定义背景图</label>
            <span>
              <Switch
                checked={isUseCustPic}
                onChange={(c) => {
                  if (!c) {
                    selectedComponent.props.bgImage = '';
                    updateStore();
                  }
                  setIsUseCustPic(c);
                }}
              />
            </span>
          </div>
        );
      },
    },
    {
      render() {
        return isUseCustPic ? <ImageUpload prop="bgImage" /> : null;
      },
    },
  ];

  return (
    <div className="item h5-header-setting">
      <FormRenderer layoutData={formLayout}></FormRenderer>
    </div>
  );
}
