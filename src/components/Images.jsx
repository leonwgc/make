import React, { useEffect, useRef } from 'react';
import EmptyImage from './EmptyImage';
import './Images.less';

export default function Images({
  images = [], // 图片数组: 数组对象 {url:string,link:string|undefined}
  arrangeType = 'image1', //排列方式[string]: image1: 1张图, image2:2张图 , image3:左大，右两小 ,image31:右大，左两小, image4:4张图
  styleType = 'card', // 模块样式[string]:  card:卡片 full:通栏
  hideMargin = false, // 隐藏该模块下方的白色间隙[boolean]: true:隐藏, false:不隐藏
  bgColor, // 背景色[string|undefined]
}) {
  let n = Number(arrangeType.slice(5, 6));
  let hasEmptyImage = n - images.length;
  const ref = useRef();

  useEffect(() => {
    const imgEls = ref.current.children;
    if (n === 3 && imgEls.length) {
      const resizeH = () => {
        let halfH = (imgEls[0].height - 9) / 2;
        if (styleType === 'full') halfH = imgEls[0].height / 2;
        if (imgEls[1]) imgEls[1].style.height = halfH + 'px';
        if (imgEls[2]) imgEls[2].style.height = halfH + 'px';
      };
      resizeH();
      [...imgEls].forEach((img) => {
        img.onload = resizeH;
      });
    }
  }, [n, images, styleType]);

  return (
    <div
      className={`zfl-image ${styleType} ${arrangeType}`}
      style={{ paddingBottom: `${hideMargin ? 0 : 5}px`, backgroundColor: bgColor }}
      ref={ref}
    >
      {images.map((item, idx) => {
        return item?.url ? (
          <img
            // 部署环境需要加上onClick
            // onClick={() => {
            //   if (item.link1) {
            //     location.href = item.link;
            //   }
            // }}
            src={item.url}
            key={idx}
            style={{ visibility: item.url ? '' : 'hidden' }}
          />
        ) : (
          <img src="//static.zuifuli.com/images/make/empty-pic.png" />
        );
      })}
      {hasEmptyImage && !images.length ? <EmptyImage /> : null}
    </div>
  );
}
