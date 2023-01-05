import React from 'react';
import FormRenderer from 'antd-form-render';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import Upload from '~/common/Upload';
import useSelectedComponent from '../hooks/useSelectedComponent';

import { getHostPrefix } from '~/utils/host';
import { Input, Form } from 'antd';
import { useUpdateStore } from 'simple-redux-store';

export default function ImageUpload({ prop = 'image' }) {
  const selectedComponent = useSelectedComponent();
  const updateStore = useUpdateStore();

  if (!selectedComponent) return null;
  let fileList = [];
  let bgImage = selectedComponent.props[prop] || '';
  if (bgImage) {
    fileList = [{ uid: -1, url: bgImage }];
  }

  const layoutData = [
    {
      render() {
        return (
          <>
            <Form.Item className="image-input">
              <div style={{ fontSize: 12, color: '#909399', margin: '4px 0 8px' }}>
                宽度750像素，高度180像素
              </div>
              <Upload
                data={{ storeType: 'I', type: '29', creator: 'system' }}
                action={`https://${getHostPrefix()}api.zuifuli.com/api/customer/v2/attach/upload4NoLogin`}
                fileList={fileList}
                showUploadList={true}
                accept="image/*"
                onFileListChange={(fileList) => {
                  const value = fileList.length ? fileList[0].url : '';
                  selectedComponent.props[prop] = value;
                  updateStore();
                }}
              >
                {(loading, fileList) => {
                  return fileList.length > 0 ? null : (
                    <div style={{ fontSize: 24, color: '#909399' }}>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    </div>
                  );
                }}
              </Upload>
            </Form.Item>
          </>
        );
      },
    },
  ];

  return <FormRenderer layoutData={layoutData} />;
}
