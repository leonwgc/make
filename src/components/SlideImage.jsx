import React from 'react';
import { ScrollBox, Space } from 'react-uni-comps';
import EmptyImage from './EmptyImage';
import './SlideImage.less';

export default function SlideImage({ images = [], hideMargin = false, bgColor }) {
  const renderImages = () => {
    if (images.length) {
      return images.map((item, idx) => {
        return <img src={item.url} key={idx} className="img" style={{ width: 100 }} />;
      });
    } else {
      return [1, 2, 3, 4, 5, 6, 7].map((item, idx) => {
        return <EmptyImage width={100} height={100} />;
      });
    }
  };

  return (
    // <div
    //   className={`zfl-slide-image`}
    //   style={{ paddingBottom: `${hideMargin ? 0 : 5}px`, backgroundColor: bgColor }}
    // >
    //   {renderImages()}
    // </div>
    <ScrollBox
      style={{ height: 100, paddingBottom: `${hideMargin ? 0 : 5}px`, backgroundColor: bgColor }}
    >
      {<Space size={9}>{renderImages()}</Space>}
    </ScrollBox>
  );
}
