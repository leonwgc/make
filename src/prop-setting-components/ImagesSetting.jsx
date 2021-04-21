import React, { useEffect, useState } from 'react';
import FormRenderer from 'antd-form-render';
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import Upload from '~/common-pc/Upload';
import useSelectedComponent from '../hooks/useSelectedComponent';
import useUpdateStore from '../hooks/useUpdateStore';
import { getHostPrefix } from '~/utils/host';

export default function ImagesSetting({ imagesProp }) {
  const comp = useSelectedComponent();
  const updateStore = useUpdateStore();

  if (!comp) return null;

  const layoutData = [
    {
      render() {
        return (
          <Upload
            data={{ storeType: 'I', type: '29', creator: 'system' }}
            action={`https://${getHostPrefix()}api.zuifuli.com/api/customer/v2/attach/upload4NoLogin`}
            fileList={comp.props[imagesProp] || []}
            accept="image/*"
            onFileListChange={(fileList) => {
              comp.props[imagesProp] = fileList || [];
              updateStore();
            }}
          >
            {(loading, fileList) => {
              return (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>图片</div>
                </div>
              );
            }}
          </Upload>
        );
      },
    },
  ];

  return <FormRenderer layoutData={layoutData} />;
}
