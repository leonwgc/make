import React from 'react';
import Carousel from './Carousel';
import Images from './Images';
import Space from './Space';
import SlideImage from './SlideImage';
import Title from './Title';

import { Button } from 'zarm';
import Input from './Input';

// key is cid , value is Component type
const renderMapping = {
  Carousel,
  Images,
  Space,
  SlideImage,
  Title,
  Button,
  Input,
};

export default renderMapping;
