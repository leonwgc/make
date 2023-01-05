import React, { useEffect, useRef, useCallback } from 'react';
import { gid, getSettingDefaultValues, convertJSONToObject, getClosestComp } from '../helper';
import { message } from 'antd';
import Sortable from 'sortablejs';
import Renderer from '../Renderer';
import { getConfigById } from './index';
import { useUpdateStore, useAppData } from 'simple-redux-store';

const Flex = ({ item = {}, isDesign = false, style = {} }) => {
  const ref = useRef(null);
  let data = item.comps || [];
  let newAddedComponent = null;
  const app = useAppData();
  const updateStore = useUpdateStore();

  const updateData = (data, activeComp = null) => {
    item.comps = data;
    updateStore({ activeComp });
  };

  useEffect(() => {
    if (isDesign) {
      let s1 = Sortable.create(ref.current, {
        filter: '.config-cmp',
        group: {
          name: gid(),
          put: ['cmp'],
        },
        onAdd(e) {
          let cid = e.item.dataset.cid;
          let tpl = e.item.dataset.tpl || '';
          e.item.style.display = 'none';

          const config = getConfigById(cid);
          if (config.isConfig) {
            // 配置组件最多只能放一个
            if (app.comps.find((c) => c.cid === cid)) {
              message.error('最多只能放一个' + config.name);
              return;
            }
          }

          newAddedComponent = {
            cid,
            index: e.newIndex,
            dom: e.item,
            tpl,
          };
        },
        store: {
          set: function (s) {
            let id = null;
            if (newAddedComponent) {
              const { index, dom, cid, tpl } = newAddedComponent;
              dom.remove();

              const cfg = getConfigById(cid);
              if (!cfg) {
                console.error(`${cid} is not valid component`);
                return;
              }
              const order = cfg.order;
              const { props = {}, style = {} } = cfg.setting || {};
              const defaultProps = getSettingDefaultValues(props);
              const defaultStyles = getSettingDefaultValues(style);

              const hasTpl = typeof tpl === 'string' && tpl.length >= 2;

              let cmp;
              id = [cid, '-', gid()].join('');

              // comp as tpl
              if (hasTpl) {
                cmp = convertJSONToObject(tpl);
                cmp.id = id;
              } else {
                cmp = {
                  cid: cid,
                  order,
                  id,
                  props: { ...defaultProps },
                  style: { ...defaultStyles },
                };
              }

              if (index == 0) {
                data.unshift(cmp);
              } else if (index === data.length) {
                data.push(cmp);
              } else {
                data.splice(index, 0, cmp);
              }
              newAddedComponent = null;
            } else {
              let ar = s.toArray();
              data.sort((a, b) => {
                if (a.order != b.order) {
                  return a.order - b.order;
                } else {
                  return ar.indexOf(a.id) - ar.indexOf(b.id);
                }
              });

              s.sort(data.map((d) => d.id));
            }
            updateData(data, id);
          },
        },
      });
      return () => {
        s1.destroy();
      };
    }
  }, [data, updateData, isDesign]);

  useEffect(() => {
    const onClick = (e) => {
      e.stopPropagation();
      if (e.target !== ref.current) {
        let id = getClosestComp(e.target);
        if (id) {
          updateStore({ activeComp: id });
        }
      } else {
        updateStore({ activeComp: null });
      }
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
      updateStore({ activeComp: null });
    };
  }, []);

  const onRemove = (id) => {
    data = data.filter((c) => c.id !== id);
    updateData(data);
  };

  return (
    <div style={{ ...style }} ref={ref} data-type="container">
      <Renderer isDesign={isDesign} onRemove={isDesign ? onRemove : null} item={item} />
    </div>
  );
};

export default Flex;
