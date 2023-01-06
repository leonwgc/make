import React, { useState } from 'react';
import { Radio } from 'antd';
import ComponentSelectList from './ComponentSelectList';
import { components, productComponents, otherComponents } from './components/index';
import TplSelectList from './TplSelectList';
import { Icon, clsx } from 'react-uni-comps';
import './ComponentPanel.less';
import { useAppData } from 'simple-redux-store';
import { ErrorBoundary } from 'react-uni-comps';

const ComponentPanel = () => {
  const app = useAppData();

  const [type, setType] = useState('0');
  const [activeTypes, setActiveTypes] = useState([0, 1, 2]); // 默认展开的type

  // 模块
  const renderComponents = (data = []) => {
    return data.map((item, idx) => {
      return (
        <div key={idx} className="type-data">
          <div
            onClick={() => {
              let index = activeTypes.indexOf(idx);
              if (index > -1) {
                activeTypes.splice(index, 1);
                setActiveTypes([...activeTypes]);
              } else {
                setActiveTypes([...activeTypes, idx]);
              }
            }}
            className={clsx('type-title', { active: activeTypes.includes(idx) })}
          >
            {item.title}
          </div>
          <div className={clsx('type-list', { hide: !activeTypes.includes(idx) })}>
            <ComponentSelectList components={item.components} />
          </div>
        </div>
      );
    });
  };

  const data = [
    {
      title: (
        <span>
          <Icon type={'iconarrow_down_outlined_regular'} className="icon"></Icon> 图文模块
        </span>
      ),
      components,
    },
    {
      title: (
        <span>
          <Icon type={'iconarrow_down_outlined_regular'} className="icon"></Icon> 商品模块
        </span>
      ),
      components: productComponents,
    },
    // {
    //   title: (
    //     <span>
    //       <Icon type={'iconarrow_down_outlined_regular'} className="icon"></Icon> 文化模块
    //     </span>
    //   ),
    //   components: whComponents,
    // },
    {
      title: (
        <span>
          <Icon type={'iconarrow_down_outlined_regular'} className="icon"></Icon> 定制模块
        </span>
      ),
      components: otherComponents,
    },
  ];

  return (
    <div className="component-panel">
      <div className="type-select">
        <Radio.Group
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <Radio.Button value="0" style={{ width: 86, textAlign: 'center' }}>
            组件
          </Radio.Button>
          <Radio.Button value="1">我的组件</Radio.Button>
        </Radio.Group>
      </div>

      <ErrorBoundary>
        <div className="select-list">
          {type == '0' ? renderComponents(data) : <TplSelectList />}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ComponentPanel;
