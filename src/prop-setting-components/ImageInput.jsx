import React, { useEffect, useState } from 'react';
import FormRenderer from 'antd-form-render';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import Upload from '~/common-pc/Upload';
import useSelectedComponent from '../hooks/useSelectedComponent';
import useUpdateStore from '../hooks/useUpdateStore';
import { getHostPrefix } from '~/utils/host';
import { Input, Form } from 'antd';
import './ImageInput.less';

export default function ImageInput({ imageProp }) {
  const comp = useSelectedComponent();
  const updateStore = useUpdateStore();
  const [fileList, setFileList] = useState([]);

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (comp) {
      const _url = comp.props[imageProp];
      setUrl(_url);
      setFileList(_url ? [{ uid: -1, url: _url }] : []);
    }
  }, [comp]);

  if (!comp) return null;

  const layoutData = [
    {
      render() {
        return (
          <Form.Item className="image-input">
            <Upload
              data={{ storeType: 'I', type: '29', creator: 'system' }}
              action={`https://${getHostPrefix()}api.zuifuli.com/api/customer/v2/attach/upload4NoLogin`}
              fileList={fileList}
              showUploadList={false}
              accept="image/*"
              onFileListChange={(fileList) => {
                const value = fileList.length ? fileList[0].url : '';
                comp.props[imageProp] = value;
                setUrl(value);
                setFileList(value ? [{ uid: -1, url: value }] : []);
                updateStore();
              }}
            >
              {(loading, fileList) => {
                return fileList.length > 0 ? (
                  <img src={url} style={{ width: '100%', height: 'auto' }}></img>
                ) : (
                  <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}选择图片</div>
                );
              }}
            </Upload>
            <Input
              placeholder="输入图片地址或上传图片"
              value={url}
              style={{ width: '100%' }}
              onChange={(e) => {
                const { value } = e.target;
                setUrl(value);
                setFileList(value ? [{ uid: -1, url: value }] : []);
                comp.props[imageProp] = value;
                updateStore();
              }}
              allowClear
            ></Input>
          </Form.Item>
        );
      },
    },
  ];

  return <FormRenderer layoutData={layoutData} />;
}
