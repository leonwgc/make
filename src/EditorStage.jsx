import React, { useState, useEffect } from 'react';
import Flex from '~/components/Flex';
import * as service from './storage';
import { useUpdateStore, useSelector } from 'simple-redux-store';
import './EditorStage.less';

const EditorStage = () => {
  const app = useSelector((state) => state.app);
  const { bgColor } = app;
  const updateStore = useUpdateStore();
  let style = {};
  if (bgColor) {
    style.backgroundColor = bgColor;
  }

  useEffect(() => {
    updateStore(service.getPage());
  }, []);

  return (
    <div className="editor-stage">
      <Flex
        item={app}
        isDesign
        style={{
          height: 667,
          width: 375,
          overflowY: 'scroll',
          backgroundColor: '#fff',
          ...style,
        }}
      />
    </div>
  );
};

export default EditorStage;
