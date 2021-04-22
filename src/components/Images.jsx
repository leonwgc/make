import React from 'react';
import EmptyImage from './EmptyImage';
import './Images.less';

// url  image src
// link, link url when click image
export default function Images({
  images = [],
  arrangeType = 'image1', //排列方式
  styleType = 'card', // 模块样式
  hideMargin = false,
  bgColor,
}) {
  let n = Number(arrangeType.slice(5, 6));

  let hasEmptyImage = n - images.length;

  return (
    <div
      className={`zfl-image ${styleType} ${arrangeType}`}
      style={{ marginBottom: `${hideMargin ? 0 : 5}px`, backgroundColor: bgColor }}
    >
      {images.map((item, idx) => {
        return item ? (
          <img
            // onClick={() => {
            //   if (item.link) {
            //     location.href = item.link;
            //   }
            // }}
            src={item.url}
            key={idx}
          />
        ) : (
          <div key={idx}>
            <EmptyImage key={idx} />
          </div>
        );
      })}
      {hasEmptyImage && !images.length ? <EmptyImage /> : null}
    </div>
  );
}
