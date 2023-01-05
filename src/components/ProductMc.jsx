import React, { useEffect, useState } from 'react';
import EmptyImage from './EmptyImage';
import Icon from '../Icon';
import { Tabs } from 'zarm';
import './ProductMc.less';

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
  arrangeType,
  bgColor,
  fontWeight,
  showTitle,
  showPrice,
  showOrigin,
  showBtn,
  btnStyle,
  btnColor,
  btnText,
  tabGroup = {},
  productNum = [1],
  inStage,
}) {
  const isP3 = arrangeType === 'p3';
  const { exist = false, theme = 'light', tabs = [], products = [] } = tabGroup;
  const [index, setIndex] = useState(0);
  let plist = defaultData(productNum[index], products[index]);

  useEffect(() => {
    if (!exist) {
      setIndex(0);
    }
  }, [exist]);

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
    <div className={`productMc-list`} style={{ backgroundColor: bgColor }}>
      {renderTabs()}
      <div className={`${arrangeType}`}>
        {plist.map((item, idx) => {
          return (!inStage && item.id) || inStage ? (
            <ProductItem
              key={idx}
              data={item}
              isP3={isP3}
              fontWeight={fontWeight}
              showTitle={showTitle}
              showPrice={showPrice}
              showOrigin={showOrigin}
              btnStyle={btnStyle}
              btnColor={btnColor}
              btnText={btnText}
              showBtn={showBtn}
            ></ProductItem>
          ) : null;
        })}
      </div>
    </div>
  );
}

function ProductItem({
  isP3,
  fontWeight,
  showTitle,
  showPrice,
  showOrigin,
  showBtn,
  btnStyle,
  btnColor,
  btnText,
  data = {},
}) {
  const { id, name, skuH5Url, originPrice, salePrice, imageUrl } = data;
  return (
    <div className="product">
      {imageUrl ? <img src={imageUrl} /> : <EmptyImage height={isP3 ? 113 : 171} />}
      <div className="content">
        {showTitle ? <div className={`title ${fontWeight}`}>{name}</div> : null}
        <div className="buy">
          <div className="price">
            {showPrice ? (
              <div className="current">
                <span className="num">{salePrice}</span>
                积分
              </div>
            ) : null}
            {showOrigin && originPrice ? <span className="original">原价{originPrice}</span> : null}
          </div>
          {showBtn ? (
            isP3 ? (
              <div className="btn3" style={{ background: btnColor }}>
                <Icon type="iconshopping_trolley_filled_regular" style={{ color: '#fff' }} />
              </div>
            ) : (
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
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
