import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Flex from '~/components/Flex';
import { useParams } from 'react-router-dom';
import { gid } from '~/helper';
import useUpdateStore from './hooks/useUpdateStore';
import './EditorStage.less';

const EditorStage = () => {
  const app = useSelector((state) => state.app);
  // type:home, other
  const { type = '', id = '' } = useParams();
  const updateStore = useUpdateStore();
  let style = {};
  if (app.bgColor) {
    style.backgroundColor = app.bgColor;
  }

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
