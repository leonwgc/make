import React from 'react';

const defaultPic = '//static.zuifuli.com/images/make/empty-pic.png';

// src  image src
// link, link url when click image
export default function EmptyImage({ width = '100%', height = 150 }) {
  return (
    <div
      style={{
        backgroundImage: `url(${defaultPic})`,
        height,
        width,
        backgroundPosition: 'center',
        backgroundSize: '48px 48px',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
}
