import React from 'react';
import { Icon } from 'react-uni-comps';

// src  image src
// link, link url when click image
export default function EmptyImage({ width = '100%', height = 150 }) {
  return (
    <div
      className="img"
      style={{
        height,
        width,
        backgroundPosition: 'center',
        backgroundSize: '48px 48px',
        backgroundRepeat: 'no-repeat',
        // backgroundColor: '#f0f0f0',
        fontSize: 30,
        color: '#004bcc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon type="uc-icon-tupian" />
    </div>
  );
}
