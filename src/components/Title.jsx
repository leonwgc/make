import React from 'react';
import './Title.less';
import Icon from '../Icon';

export default function Title({
  text = '标题',
  bgColor,
  color = '',
  fontSize = 14,
  arrowColor,
  textAlign = 'left',
  fontWeight = '',
  link = '',
}) {
  return (
    <div
      className={`zfl-title`}
      style={{ backgroundColor: bgColor, color, fontWeight, textAlign, fontSize }}
    >
      <span className="text">{text}</span>
      {link ? (
        <span className="arrow" style={{ color: arrowColor || '#8c8c8c' }}>
          <Icon type={'icondown'} />
        </span>
      ) : null}
    </div>
  );
}
