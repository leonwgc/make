import React from 'react';
import cat from './images/cat.jpg';

export default function EmptyImage({ width = '100%', height = 150 }) {
  return <img src={cat} width={width} height={height} />;
}
