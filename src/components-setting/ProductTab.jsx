import React from 'react';
import './ProductTab.less';

export default function MyPageTab({ type, setType, tabs = [] }) {
  return (
    <div className="my-tab">
      {tabs.map((item) => {
        const { key } = item;
        return (
          <div
            key={key}
            className={`name ${type == key ? 'active' : ''}`}
            onClick={() => {
              setType(key);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
