import React from 'react';
import Flex from './Flex';
import Carousel from './Carousel';
import Images from './Images';
import Space from './Space';
import settings from '../components-setting';
import SlideImage from './SlideImage';
import Title from './Title';

import { Button } from 'zarm';
import Input from './Input';
import Form from './Form';
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
  },

  {
    cid: 'Images',
    type: Images,
    name: '图片',
    icon: 'iconpictureline',
    setting: settings.Images,
    order: 100,
  },
  {
    cid: 'Space',
    type: Space,
    name: '间隔模块',
    icon: 'icondivide',
    setting: settings.Space,
    order: 100,
  },
  {
    cid: 'SlideImage',
    type: SlideImage,
    name: '横滑图片',
    icon: 'iconpicture2',
    setting: settings.SlideImage,
    order: 100,
  },
  {
    cid: 'Title',
    type: Title,
    name: '标题模块',
    icon: 'icontitle',
    setting: settings.Title,
    order: 100,
  },
  {
    cid: 'Form',
    type: Form,
    name: '表单',
    icon: 'iconpicturea1',
    setting: settings.Form,
    order: 100,
    // h: 100,
  },
];

export const formComponents = [
  // {
  //   cid: 'Button',
  //   type: Button,
  //   name: '按钮',
  //   icon: 'iconpicturea1',
  //   setting: settings.Button,
  //   order: 100,
  // },
  // {
  //   cid: 'Input',
  //   type: Input,
  //   name: '文本框',
  //   icon: 'iconedit',
  //   setting: settings.Input,
  //   order: 100,
  // },
];

const all = [...components, ...formComponents];

export const getConfigById = (cid) => {
  return all.find((item) => item.cid === cid);
};

export default all;
