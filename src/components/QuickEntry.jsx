import React, { useEffect, useState } from 'react';
import { Carousel } from 'zarm';
import * as service from '../service';
import './QuickEntry.less';

export default function QuickEntry({ arrangeType = 4, fontWeight = 'normal', tags = [] }) {
  const [apps, setApps] = useState([]);

  // useEffect(() => {
  //   let a = [];
  //   for (let v of tags) {
  //     const arr = Array.from(new Array(4), (val, i) => v + i);
  //     a = a.concat(arr);
  //   }
  //   setApps(a);
  // }, [tags]);

  useEffect(() => {
    if (tags.length) {
      service.getAppsByTags(tags.join(',')).then(({ result = {} }) => {
        const { functionVOs = [] } = result;
        setApps(
          functionVOs.map((item) => ({
            funTitle: item.funTitle,
            funLogo: item.funLogo,
            funUrl: item.funUrl,
          }))
        );
      });
    } else {
      // default hardcode data
      setApps(
        JSON.parse(
          '[{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/8827caceaf4e36c18176494cd263b711.png","funUrl":"https://www.baidu.com"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20171130/menu_icon_fuyuanwai@3x.png","funUrl":"https://t-h5.zuifuli.com/fyw/introduce"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/3dcd553e027ecb94dc51cff8ddc9397c.png","funUrl":"https://wx.tuhu.cn/vue/NaActivity/pages/home/index?id=CE39B089&venderId=thirdpart_zzfl_18"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/00c81cf4582d57d55812a69cd2703d02.png","funUrl":"icare://other/phoneprepaid"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/49b3eb8a4ef80cd8efff3e615671a154.png","funUrl":"https://t-open.zuifuli.com/v1/app/launch?appCode=adminService&channelCode=hangzhou&redirect=/tele/hysdh.html#/index"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20171130/bla@3x.png","funUrl":"https://t-api.zuifuli.com/api/open/v1/bla/new/launch?redirectUrl=https://t.youshr.com/activity.html"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190821/baa3d6ec5d22f4242dedb6e27e8f1942.png","funUrl":"icare://message/list?code=GROUP_CODE_CARD"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/afac1cb1c73c46ab2bb64a18013aee6a.png","funUrl":"https://t-h5.zuifuli.com/menupub/recharge"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/408c3f8aafe7fa39354d865df6841dff.png","funUrl":"https://t-mall.zuifuli.com/m/jd"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/e3aa9ed7238141eaebe957a7be698b51.png","funUrl":"icare://zoom/meeting/action/show/home"},{"funTitle":"示例","funLogo":"https://image.zuifuli.com/17/20190826/4d7ec08d188c9ab0e7db725472e3064b.png","funUrl":"https://t-mall.zuifuli.com/m/zy"}]'
        )
      );
    }
  }, [tags]);

  const renderItem = (arr) => {
    return (
      <div className="quick-entry">
        {arr.map((item, idx) => (
          <div
            className={`entry-item ${fontWeight}`}
            style={{ width: `${100 / arrangeType}%`, marginTop: idx < arrangeType ? 0 : 20 }}
            key={idx}
          >
            <img src={item.funLogo} alt={item.funTitle} />
            {item.funTitle}
          </div>
        ))}
      </div>
    );
  };

  const renderList = () => {
    let itemsPerPage = arrangeType * 2;
    let list = [];

    let _all = apps.slice();
    do {
      if (_all.length > itemsPerPage) {
        let l = _all.slice(0, itemsPerPage);
        list.push(l);
        _all.splice(0, l.length);
      } else {
        list.push(_all);
        _all = [];
      }
    } while (_all.length);

    if (!list.length) {
      return null;
    }

    return list.map((ar, idx) => <div key={idx}>{renderItem(ar)}</div>);
  };

  const itemsPerPage = arrangeType * 2;

  return (
    <Carousel
      height={160}
      swipeable
      className="ctl-carousel"
      showPagination={apps.length > itemsPerPage}
    >
      {renderList()}
    </Carousel>
  );
}
