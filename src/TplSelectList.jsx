import React, { useEffect, useRef } from 'react';
import { Popconfirm } from 'antd';
import { getConfigById } from './components/index';
import DesignRenderer from './components/TplComp';
import { Icon } from 'react-uni-comps';
import * as storage from './storage';
import useSort from '~/hooks/useSort';
import './TplSelectList.less';
import { showSuccess } from './msg';
import { useUpdateStore, useAppData } from 'simple-redux-store';

export default function TplSelectList() {
  const app = useAppData();
  const updateStore = useUpdateStore();
  const ref = useRef(null);

  const { tplList = [] } = app;

  useEffect(() => {
    app.tplList = storage.getTplList();
    updateStore();
  }, []);

  useSort(ref, {
    sort: false,
    group: {
      name: 'cmp',
      pull: 'clone',
    },
  });

  return (
    <ul ref={ref} className="tpl-select-list">
      {tplList.map((item, idx) => {
        let c = getConfigById(item.cid) || {};

        return (
          <li key={idx} data-cid={item.cid} data-tpl={item.tpl} className="cmp panel-cmp">
            <DesignRenderer
              iconName={c.icon}
              label={
                <div className="text" title={item.name}>
                  <div>{item.name}</div>
                </div>
              }
              type="tpl"
              deleteNode={
                <Popconfirm
                  title="确定删除此组件？"
                  onConfirm={() => {
                    storage.removeTpl(item.tplId);
                    app.tplList = storage.getTplList();
                    updateStore();
                    showSuccess('删除成功');
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <Icon type={'icondelete'} className="anticon-delete"></Icon>
                </Popconfirm>
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
