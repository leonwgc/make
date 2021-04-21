import React from 'react';

export default function Image({ src = '', style = {} }) {
  const _style = { ...style };
  if (src) {
    _style.backgroundImage = `url(${src})`;
  }
  return (
    <div
      style={{
        backgroundRepeat: 'no-repeat',
        ..._style,
      }}
    ></div>
  );
}
