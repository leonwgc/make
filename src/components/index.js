import React from 'react';
// import Flex from './Flex';
import Carousel from './Carousel';
import Images from './Images';
import Product from './Product';
import ProductMc from './ProductMc';
import ProductSl from './ProductSl';
import Space from './Space';
import settings from '../components-setting';
import SlideImage from './SlideImage';
import Title from './Title';
import QuickEntry from './QuickEntry';

// 暂时没有用到容器组件的需求，隐藏
// export const flex = {
//   cid: 'Flex',
//   type: Flex,
//   name: '容器',
//   icon: 'iconrecordlined_Regular',
//   setting: settings.Flex,
// };

// 图文模块
export const components = [
  {
    cid: 'Carousel',
    type: Carousel,
    name: '轮播Banner',
    icon: 'iconbanner',
    setting: settings.Carousel,
    order: 100,
    // h: 150,
  },

  {
    cid: 'Images',
    type: Images,
    name: '图片',
    icon: 'iconpictureline',
    setting: settings.Images,
    order: 100,
    // h: 150,
  },
  {
    cid: 'Space',
    type: Space,
    name: '间隔模块',
    icon: 'icondivide',
    setting: settings.Space,
    order: 100,
    // h: 30,
  },
  {
    cid: 'SlideImage',
    type: SlideImage,
    name: '横滑图片',
    icon: 'iconpicture2',
    setting: settings.SlideImage,
    order: 100,
    // h: 175,
  },
  {
    cid: 'Title',
    type: Title,
    name: '标题模块',
    icon: 'icontitle',
    setting: settings.Title,
    order: 100,
    // h: 50,
  },
];

// 商品模块
export const productComponents = [
  {
    cid: 'Product',
    type: Product,
    name: '单列商品',
    icon: 'iconcommodity1',
    setting: settings.Product,
    order: 100,
  },
  {
    cid: 'ProductMc',
    type: ProductMc,
    name: '多列商品',
    icon: 'iconcommodity2',
    setting: settings.ProductMc,
    order: 100,
  },
  {
    cid: 'ProductSl',
    type: ProductSl,
    name: '横滑商品',
    icon: 'iconcommodity3',
    setting: settings.ProductSl,
    order: 100,
  },
];

// 定制模块
export const otherComponents = [
  // {
  //   cid: 'H5Header',
  //   type: H5Header,
  //   name: '公司信息',
  //   icon: 'iconrecordlined_Regular',
  //   isConfig: true, // 只作为配置使用，比如页头，金刚区，不配置也会有
  //   setting: settings.H5Header,
  //   order: 0,
  // },
  {
    cid: 'QuickEntry',
    type: QuickEntry,
    name: '快速入口',
    icon: 'iconquick',
    setting: settings.QuickEntry,
    order: 100,
    h: 160,
  },
];

const all = [...components, ...productComponents, ...otherComponents];

export const getConfigById = (cid) => {
  return all.find((item) => item.cid === cid);
};

export default all;
