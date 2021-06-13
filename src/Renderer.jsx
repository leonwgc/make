import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'simple-redux-store';
import { getConfigById } from './components/index';
import Icon from './Icon';
import './Renderer.less';

const Renderer = ({ item = {}, isDesign = false, onRemove }) => {
  const app = useSelector((state) => state.app);
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
        className={classnames({
          'design-cmp': true,
          'config-cmp': isConfig,
          'active': comp.id === app.activeComp,
        })}
        style={{ height: config.h || 'auto' }}
        data-id={comp.id}
        key={comp.id}
      >
        {renderItem(comp)}
        {/* <div
          className={classnames({
            mask: true,
            flex: comp.cid == 'Flex',
          })}
        ></div> */}
        {!isConfig ? (
          <div className="del">
            <Icon type="icondelete" onClick={onRemove}></Icon>
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
