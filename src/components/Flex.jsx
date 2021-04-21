import React, { useEffect, useRef } from 'react';
import { gid, getSettingDefaultValues } from '~/helper';
import { message } from 'antd';
import Sortable from 'sortablejs';
import { useSelector } from 'react-redux';
import Renderer from '../Renderer';
import { getConfigById } from './index';
import useUpdateStore from '../hooks/useUpdateStore';

const Flex = ({ item = {}, isDesign = false, style = {} }) => {
  const ref = useRef(null);
  let data = item.comps || [];
  let newAddedComponent = null;
  const app = useSelector((state) => state.app);
  const updateStore = useUpdateStore();

  const updateData = (data) => {
    item.comps = data;
    updateStore({ activeComp: null });
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
            if (newAddedComponent) {
              const { index, dom, cid, tpl } = newAddedComponent;
              dom.remove();

              const cfg = getConfigById(cid);
              if (!cfg) {
                console.error(`${cid} is not valid component`);
                return;
              }
              const order = cfg.order;
              const { props = {}, style = {} } = cfg.setting;
              const defaultProps = getSettingDefaultValues(props);
              const defaultStyles = getSettingDefaultValues(style);

              const hasTpl = typeof tpl === 'string' && tpl.length >= 2;

              // const ext = {};

              // stage as tpl
              // if (hasTpl) {
              //   try {
              //     const _tpl = JSON.parse(tpl);
              //     const { comps = [] } = _tpl;

              //     if (comps.length) {
              //       ext.comps = comps;
              //     }
              //   } catch (ex) {}
              // }
              let cmp;

              const id = [cid, '-', gid()].join('');

              // comp as tpl
              if (hasTpl) {
                try {
                  const _tpl = JSON.parse(tpl);
                  const { comp = {} } = _tpl;
                  cmp = comp;
                  cmp.id = id;
                  cmp.order = order;
                } catch (ex) {}
              } else {
                cmp = {
                  cid: cid,
                  order,
                  id,
                  props: { ...defaultProps },
                  style: { ...defaultStyles },
                  // ...ext,
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
            updateData(data);
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
      const shell = e.target.parentElement;

      if (shell.classList.contains('design-cmp')) {
        updateStore({ activeComp: shell.dataset.id });
      } else {
        if (e.target === ref.current) {
          updateStore({ activeComp: null });
        }
      }
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  const onRemove = (e) => {
    let shell = e.target.parentElement;
    while (!shell.classList.contains('design-cmp')) {
      shell = shell.parentElement;
    }

    if (shell) {
      const id = shell.dataset.id;
      data = data.filter((c) => c.id !== id);
      updateData(data);
    }
  };

  return (
    <div style={{ ...style }} ref={ref} data-type="container">
      <Renderer isDesign={isDesign} onRemove={isDesign ? onRemove : null} item={item} />
    </div>
  );
};

export default Flex;
