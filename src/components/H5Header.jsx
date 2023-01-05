import React from 'react';
import './H5Header.less';

export default function H5Header({ bgImage, hasSearchBar = true, isShowMoney = true }) {
  bgImage = bgImage || 'https://static.xxx.com/images/make/header_img.png';
  return (
    <div className="home-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="sig"></div>
      <section className="main">
        {/* <img src={bgImage} alt="" /> */}
        <div className="mian-wrapper">
          <div className="main-content">
            <span>
              {hasSearchBar ? (
                <div className="comp-app-search-ctrl main-search">
                  <div className="search-group">
                    <i className="iconfont iconfont-OAsousuo_20_15px theme-default search-icon"></i>
                    <span className="search-placeholder">搜索</span>
                  </div>
                  <div className="scan"></div>
                </div>
              ) : null}
              {isShowMoney ? (
                <div className="money">
                  <div className="amount">
                    <span className="num">524,055</span>
                    <span>积分</span>
                    <span></span>
                    <i className="iconfont iconfont-kejian_32px theme-default icon"></i>
                  </div>
                </div>
              ) : null}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
