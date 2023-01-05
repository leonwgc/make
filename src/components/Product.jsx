import React, { useState, useEffect } from 'react';
import EmptyImage from './EmptyImage';
import { Icon } from 'react-uni-comps';
import { Tabs } from 'zarm';
import './Product.less';

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

export default function Product({
  layoutMode = 'big',
  textAlign,
  bgColor,
  fontWeight,
  showTitle,
  showDesc,
  showPrice,
  showOrigin,
  showBtn,
  btnStyle,
  btnColor,
  btnText,
  tabGroup = {},
  productNum = [1],
}) {
  const { exist = false, theme = 'light', tabs = [], products = [] } = tabGroup;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!exist) {
      setIndex(0);
    }
  }, [exist]);

  let plist = defaultData(productNum[index], products[index]);

  const renderTabs = () => {
    if (!exist) {
      return null;
    }

    return (
      <div className={`tab-list ${theme}`}>
        <Tabs scrollable value={index} onChange={setIndex} lineWidth={50}>
          {tabs.map((item, idx) => (
            <Tabs.Panel title={item} key={idx} />
          ))}
        </Tabs>
      </div>
    );
  };

  return (
    <div className={`product-list `} style={{ backgroundColor: bgColor }}>
      {renderTabs()}
      <div className="list">
        {plist.map((item, idx) => {
          return (
            <ProductItem
              key={idx}
              data={item}
              textAlign={textAlign}
              layoutMode={layoutMode}
              fontWeight={fontWeight}
              showTitle={showTitle}
              showDesc={showDesc}
              showPrice={showPrice}
              showOrigin={showOrigin}
              btnStyle={btnStyle}
              btnColor={btnColor}
              btnText={btnText}
              showBtn={showBtn}
            ></ProductItem>
          );
        })}
      </div>
    </div>
  );
}

function ProductItem({
  textAlign,
  fontWeight,
  showTitle,
  showDesc,
  showPrice,
  showOrigin,
  showBtn,
  btnStyle,
  btnColor,
  btnText,
  layoutMode,
  data = {},
}) {
  const { id, name, skuH5Url, originPrice, salePrice, imageUrl, desc = '' } = data;
  return (
    <div className={`product ${layoutMode} ${textAlign}`}>
      {imageUrl ? (
        <img src={imageUrl} />
      ) : (
        <EmptyImage
          height={layoutMode === 'big' ? 351 : 130}
          width={layoutMode === 'big' ? 351 : 130}
        />
      )}
      <div className="content">
        <div className="text">
          {showTitle ? <div className={`title ${fontWeight}`}>{name}</div> : null}
          {showDesc ? <div className="desc">{desc}</div> : null}
        </div>
        <div className="buy">
          {layoutMode !== 'simple' && (
            <div className="price">
              {showPrice ? (
                <span className="current">
                  <span className="num">{salePrice}</span>
                  积分
                </span>
              ) : null}
              {showOrigin && originPrice ? (
                <span className="original">原价{originPrice}</span>
              ) : null}
            </div>
          )}
          {showBtn ? (
            <div
              className={`btn${btnStyle}`}
              style={
                btnStyle === 2
                  ? { color: btnColor, borderColor: btnColor }
                  : { background: btnColor }
              }
            >
              {btnStyle !== 3 ? (
                btnText
              ) : (
                <Icon type="iconshopping_trolley_filled_regular" style={{ color: '#fff' }} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
