import React from 'react';
import { useAppData } from 'simple-redux-store';
import { getConfigById } from './components/index';
import './Renderer.less';
import { Icon, clsx } from 'react-uni-comps';

const Renderer = ({ item = {}, isDesign = false, onRemove }) => {
  const app = useAppData();
  const { comps = [] } = item;

  if (!comps.length) {
    return null;
  }

  const renderItem = (item) => {
    let { type } = item;
    if (!type) {
      type = getConfigById(item.cid).type;
    }

    // flex also act as tpl wrapper
    const _isDesign = item.tpl ? false : isDesign;

    return React.createElement(type, {
      ...item.props,
      style: item.style,
      isDesign: _isDesign,
      item,
    });
  };

  const renderComp = (comp) => {
    const config = getConfigById(comp.cid) || {};
    const { isConfig = false } = config;

    return isDesign ? (
      <div
        className={clsx({
          'design-cmp': true,
          'config-cmp': isConfig,
          'active': comp.id === app.activeComp,
        })}
        style={{ height: config.h || 'auto' }}
        data-id={comp.id}
        key={comp.id}
      >
        {renderItem(comp)}

        {!isConfig ? (
          <div className="del">
            <Icon type="icondelete" onClick={() => onRemove(comp.id)}></Icon>
          </div>
        ) : null}
      </div>
    ) : (
      renderItem(comp)
    );
  };

  return comps.map(renderComp);
};

export default Renderer;
