import React, { useRef } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import Upload from '~/common-pc/Upload';
import useSelectedComponent from '../hooks/useSelectedComponent';
import { useUpdateStore } from 'simple-redux-store';
import { Input } from 'antd';
import { gid } from '~/helper';
import { useSort } from 'react-use-lib';
import './MutipleImages.less';

// 动态增删多张图片，并支持排序 , 作为字段使用

export default function MutipleImages({ title }) {
  const selectedComponent = useSelectedComponent();
  const updateStore = useUpdateStore();
  const ref = useRef();

  useSort(ref, {
    handle: 'img',
    store: {
      set: function (ss) {
        let ar = ss.toArray();

        let _images = selectedComponent.props.images.sort(
          (a, b) => ar.indexOf(a.id) - ar.indexOf(b.id)
        );

        selectedComponent.props.images = [..._images];
        updateStore();
      },
    },
  });

  if (!selectedComponent) return null;
  let images = selectedComponent.props.images || []; // imageInfo array

  if (images.length) {
    images = images.map((item) => {
      if (!item.id) {
        item.id = gid();
      }

      return item;
    });
  }

  const fileList = images.map((item, idx) => {
    return { uid: idx, url: item.url };
  });

  return (
    <div className="image-input">
      <div>{title}</div>
      <Upload
        fileList={fileList}
        showUploadList={false}
        accept="image/*"
        onChange={(info) => {
          getBase64(info.file.originFileObj, (url) => {
            images.push({
              url,
              link: '',
            });
            selectedComponent.props.images = [...images];
            updateStore();
          });
        }}
      >
        {(loading) => {
          return (
            <div style={{ fontSize: 20, color: '#909399' }}>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </div>
          );
        }}
      </Upload>

      <div ref={ref} className="image-show-list">
        {images.map((image, idx) => {
          return (
            <div className="image-show" title="拖动图片排序" key={image.id} data-id={image.id}>
              <div className="l">
                <img src={image.url} width={72} height={72} />
              </div>
              <div className="r">
                <div className="text">
                  图片{idx + 1}
                  <span
                    className="delete"
                    onClick={() => {
                      selectedComponent.props.images = images.filter((i) => i.id != image.id);
                      updateStore();
                    }}
                  >
                    删除
                  </span>
                </div>
                <div>
                  <Input
                    placeholder="输入跳转详情链接"
                    value={images[idx].link}
                    onChange={(e) => {
                      images[idx].link = e.target.value;
                      updateStore();
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
