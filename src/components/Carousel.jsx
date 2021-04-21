import React from 'react';
import { Carousel } from 'zarm';
import EmptyImage from './EmptyImage';
import './Carousel.less';

export default function MyCarousel({
  styleType = 'card', // 模块样式
  bgColor,
  images = [],
  hideMargin = false,
}) {
  const height = styleType === 'card' ? 140 : 150;
  const contentRender = () => {
    if (images.length) {
      return images.map((item, i) => {
        return (
          <div key={i}>
            <img
              height={height}
              width="100%"
              draggable={false}
              // onClick={item.link ? () => (location.href = item.link) : null}
              src={item.url}
            />
          </div>
        );
      });
    } else {
      return (
        <div>
          <EmptyImage />
        </div>
      );
    }
  };

  return (
    <div
      style={{
        height,
        backgroundColor: bgColor,
        position: 'relative',
        marginBottom: `${hideMargin ? 0 : 5}px`,
        padding: `${styleType === 'full' ? '0 0' : '0 12px'}`,
      }}
    >
      {images.length > 1 ? (
        <Carousel
          height={height}
          showPagination={images.length > 1}
          loop={images.length > 1}
          autoPlay={images.length > 1}
          swipeable
          className="ctl-carousel-banner"
        >
          {contentRender()}
        </Carousel>
      ) : (
        contentRender()
      )}
    </div>
  );
}
