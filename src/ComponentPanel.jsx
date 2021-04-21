import React, { useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Radio } from 'antd';
import ComponentSelectList from './ComponentSelectList';
import { components, formComponents } from './components/index';
import TplSelectList from './TplSelectList';
import ErrorBoundary from './ErrorBoundary';
import Icon from './Icon';
import classnames from 'classnames';
import './ComponentPanel.less';

const ComponentPanel = () => {
  const app = useSelector((state) => state.app);

  const [type, setType] = useState('0');
  const [activeTypes, setActiveTypes] = useState([0]); // 默认展开的type

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
            className={classnames('type-title', { active: activeTypes.includes(idx) })}
          >
            {item.title}
          </div>
          <div className={classnames('type-list', { hide: !activeTypes.includes(idx) })}>
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
          <Icon type={'icondown'} className="icon"></Icon> 图文模块
        </span>
      ),
      components,
    },
    // {
    //   title: (
    //     <span>
    //       <Icon type={'icondown'} className="icon"></Icon> 商品模块
    //     </span>
    //   ),
    //   components: productComponents,
    // },
    // {
    //   title: (
    //     <span>
    //       <Icon type={'icondown'} className="icon"></Icon> 定制模块
    //     </span>
    //   ),
    //   components: otherComponents,
    // },
    {
      title: (
        <span>
          <Icon type={'icondown'} className="icon"></Icon> zarm表单模块
        </span>
      ),
      components: formComponents,
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
          <Radio.Button value="0">模块</Radio.Button>
          <Radio.Button value="1">我的模版</Radio.Button>
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
