import React, { useEffect } from 'react';
import Flex from '~/components/Flex';
import * as service from './storage';
import { useUpdateStore, useAppData } from 'simple-redux-store';
import './EditorStage.less';

const EditorStage = () => {
  const app = useAppData();
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
          minHeight: 724,
          width: 379,
          ...style,
        }}
      />
    </div>
  );
};

export default EditorStage;
