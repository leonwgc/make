import React from 'react';
import Upload from '~/common/Upload';
import useSelectedComponent from '../hooks/useSelectedComponent';
import { getBase64 } from '~/helper';
import { useUpdateStore } from 'simple-redux-store';
import { SortableList, Input, Icon, BallSpin } from 'react-uni-comps';
import './MutipleImages.less';

// 动态增删多张图片，并支持排序 , 作为字段使用

export default function MutipleImages({ title }) {
  const selectedComponent = useSelectedComponent();
  const updateStore = useUpdateStore();

  if (!selectedComponent) return null;
  let images = selectedComponent.props.images || []; // imageInfo array

  return (
    <div className="image-input">
      <div>{title}</div>

      <Upload
        accept="image/*"
        onChange={(info) => {
          if (info.file.originFileObj) {
            getBase64(info.file.originFileObj, (url) => {
              images.push({ url, link: '' });
              selectedComponent.props.images = [...images];
              updateStore();
            });
          }
        }}
      >
        {(loading, fileList) => {
          return fileList.length == 1 ? null : (
            <div style={{ fontSize: 20, color: '#909399' }}>
              {loading ? <BallSpin /> : <Icon type="uc-icon-jia2" />}
            </div>
          );
        }}
      </Upload>

      <SortableList
        className="image-show-list"
        dataList={images}
        dataRender={(image) => {
          return (
            <div className="image-show" title="拖动图片排序" key={image._key}>
              <div className="l" style={{ backgroundImage: `url(${image.url})` }}></div>
              <div className="r">
                <div className="text">
                  图片
                  <span
                    className="delete"
                    onClick={() => {
                      selectedComponent.props.images = images.filter((i) => i._key != image._key);
                      updateStore();
                    }}
                  >
                    删除
                  </span>
                </div>
                <div>
                  <Input
                    placeholder="输入跳转详情链接"
                    value={image.link}
                    onChange={(value) => {
                      image.link = value;
                      updateStore();
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }}
        onSort={(images) => {
          selectedComponent.props.images = [...images];
          updateStore();
        }}
      ></SortableList>
    </div>
  );
}
