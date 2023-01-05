import React, { useEffect, useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';
import { getConfigById } from './components/index';
import DesignRenderer from './components/DesignRenderer';
import Icon from './Icon';
import { gid, convertJSONToObject } from './helper';
import * as service from './service';
import useSort from '~/hooks/useSort';
import './TplSelectList.less';
import { showError, showSuccess } from './msg';
import { useUpdateStore, useAppData } from 'simple-redux-store';

export default function TplSelectList() {
  const app = useAppData();
  const updateStore = useUpdateStore();
  const ref = useRef(null);

  const fetchList = () => {
    service.getMyTplList().then(({ result = [] }) => {
      app.tplList = result;
      updateStore();
    });
  };

  const { tplList = [] } = app;

  useEffect(() => {
    fetchList();
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
      {tplList
        .sort((a, b) => +dayjs(b.gmtModified) - +dayjs(a.gmtModified))
        .map((item, idx) => {
          const detail = convertJSONToObject(item.detail, null);
          if (!detail) {
            return null;
          }
          let c = getConfigById(detail.cid) || {};

          return (
            <li key={idx} data-cid={detail.cid} data-tpl={item.detail} className="cmp panel-cmp">
              <DesignRenderer
                iconName={c.icon}
                label={
                  <div className="text" title={item.name}>
                    <div>{item.name}</div>
                    <div>{dayjs(item.gmtModified).format('YYYY.MM.DD')} 保存</div>
                  </div>
                }
                type="tpl"
                deleteNode={
                  <Popconfirm
                    title="确定删除此组件？"
                    onConfirm={() => {
                      service
                        .deleteMyTpl(item.id)
                        .then(() => {
                          fetchList();
                          showSuccess('删除成功');
                        })
                        .catch(showError);
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
