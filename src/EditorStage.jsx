import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Flex from '~/components/Flex';
import { useParams } from 'react-router-dom';
import { gid } from '~/helper';
import * as service from './storage';
import useUpdateStore from './hooks/useUpdateStore';
import './EditorStage.less';

const EditorStage = () => {
  const app = useSelector((state) => state.app);
  // type:home, other
  const { type = '', id = '' } = useParams();
  const { extra = {} } = app;
  const updateStore = useUpdateStore();
  let style = {};
  if (extra.bgColor) {
    style.backgroundColor = extra.bgColor;
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
