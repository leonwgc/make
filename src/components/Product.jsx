import React from 'react';
import EmptyImage from './EmptyImage';
import Icon from '../Icon';
import './Product.less';

export default function Product({
  pic,
  title = 'title',
  desc = 'desc',
  layoutMode = 'big',
  textAlign,
  fontWeight,
  showTitle,
  showDesc,
  showPrice,
  showOrigin,
  showBtn,
  btnStyle,
  btnText,
  bgColor,
}) {
  return (
    <div
      className={`product-container ${layoutMode} ${textAlign}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="img">{pic ? <img src={pic} /> : <EmptyImage />}</div>
      <div className="content">
        <div>
          {showTitle ? <div className={`title ${fontWeight}`}>{title}</div> : null}
          {showDesc ? <div className="desc">{desc}</div> : null}
        </div>
        <div className="buy">
          {showPrice ? (
            <div className="price">
              <span className="current">
                <span className="num">999</span>
                积分
              </span>
              {showOrigin ? <span className="original">原价1299</span> : null}
            </div>
          ) : (
            <div></div>
          )}
          {showBtn ? (
            <div className={`btn${btnStyle}`}>
              {btnStyle !== 3 ? btnText : <Icon type="iconpicturea1" />}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
