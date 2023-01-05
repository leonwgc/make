import React from 'react';
import Carousel from './Carousel';
import Images from './Images';
import Product from './Product';
import ProductMc from './ProductMc';
import ProductSl from './ProductSl';
import H5Header from './H5Header';
import Space from './Space';
import SlideImage from './SlideImage';
import Title from './Title';
import QuickEntry from './QuickEntry';

// key is cid , value is Component type
const renderMapping = {
  Carousel,
  Images,
  Product,
  ProductMc,
  ProductSl,
  H5Header,
  Space,
  SlideImage,
  Title,
  QuickEntry,
};

export default renderMapping;
