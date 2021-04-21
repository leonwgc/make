import React from 'react';
import './SlideImage.less';

export default function SlideImage({ images = [], hideMargin = true, bgColor }) {
  return (
    <div
      className={`zfl-slide-image`}
      style={{ marginBottom: `${hideMargin ? 0 : 9}px`, backgroundColor: bgColor }}
    >
      {images.map((item, idx) => {
        return (
          <img
            // 部署环境需要加上onClick
            // onClick={() => {
            //   if (item.link1) {
            //     location.href = item.link;
            //   }
            // }}
            src={item.url}
            key={idx}
          />
        );
      })}
      <div className="space"></div>
    </div>
  );
}
