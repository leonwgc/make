import React from 'react';
import './SlideImage.less';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';

const defaults = [{ url: cat }, { url: dog }, { url: cat }, { url: dog }];

export default function SlideImage({ images = [...defaults], hideMargin = false, bgColor }) {
  return (
    <div
      className={`zfl-slide-image`}
      style={{ marginBottom: `${hideMargin ? 0 : 5}px`, backgroundColor: bgColor }}
    >
      {images.map((item, idx) => {
        return (
          <div
            // onClick={() => {
            //   if (item.link) {
            //     location.href = item.link;
            //   }
            // }}
            className="img"
            key={idx}
            style={{ backgroundImage: `url(${item.url})` }}
          ></div>
        );
      })}
    </div>
  );
}
