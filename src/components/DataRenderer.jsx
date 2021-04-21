import React from 'react';
import renderMapping from './renderMapping';

// json data renderer

const getEventProps = (item) => {
  const props = Object.keys(item.props || {});
  let eventProps = {};
  const handlers = props.filter((p) => p.startsWith('on'));

  if (handlers.length) {
    for (let p of handlers) {
      if (item.props[p]) {
        try {
          eventProps[p] = new Function('e', item.props[p]);
        } catch (ex) {
          /**/
        }
      }
    }
  }
  return eventProps;
};

const renderComponent = (item) => {
  let { cid, props = {}, style = {}, id } = item;

  const mProps = {
    ...props,
    style,
    key: id,
    ...getEventProps(item),
  };

  let type = renderMapping[cid] || (cid === 'Flex' ? DataRenderer : null);

  if (type === DataRenderer) {
    mProps.data = item;
  }

  if (!type) {
    return null;
  }

  return React.createElement(type, mProps);
};

const DataRenderer = ({ data = {} }) => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (ex) {}
  }

  const { comps = [], cid, style = {} } = data;

  if (!comps.length) {
    return null;
  }

  if (cid === 'Flex') {
    return <div style={style}>{comps.map(renderComponent)}</div>;
  }

  return comps.map(renderComponent);
};

export default DataRenderer;
