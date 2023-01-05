import React, { useEffect, useState } from 'react';
import EmptyImage from './EmptyImage';
import './ProductSl.less';

const defaultData = (num, products = []) => {
  let data = [];
  for (let i = 0; i < num; i++) {
    data[i] = products[i]
      ? products[i]
      : {
          name: '这里显示商品名称，最多可展示两行。',
          desc: '这里显示商品描述，最多可展示一行。',
          salePrice: 999,
        };
  }
  return data;
};

export default function ProductSl({
  bgColor,
  textAlign,
  fontWeight,
  showTitle,
  showPrice,
  showOrigin,
  productNum = 4,
  tabGroup = {
    products: [],
  },
  inStage,
}) {
  let plist = defaultData(productNum, tabGroup?.products[0]);

  return (
    <div className={`productSl-list`} style={{ backgroundColor: bgColor }}>
      {plist.map((item, idx) => {
        return (!inStage && item.id) || inStage ? (
          <ProductItem
            key={idx}
            data={item}
            textAlign={textAlign}
            fontWeight={fontWeight}
            showTitle={showTitle}
            showPrice={showPrice}
            showOrigin={showOrigin}
          ></ProductItem>
        ) : null;
      })}
    </div>
  );
}

function ProductItem({ textAlign, fontWeight, showTitle, showPrice, showOrigin, data = {} }) {
  const { id, name, skuH5Url, originPrice, salePrice, imageUrl } = data;
  return (
    <div className={`product ${textAlign}`}>
      {imageUrl ? <img src={imageUrl} /> : <EmptyImage height={96} />}
      <div className="content">
        {showTitle ? <div className={`title ${fontWeight}`}>{name}</div> : null}
        <div className="price">
          {showPrice ? (
            <div className="current">
              <span className="num">{salePrice}</span>
              积分
            </div>
          ) : null}
          {showOrigin && originPrice ? <span className="original">原价{originPrice}</span> : null}
        </div>
      </div>
    </div>
  );
}
