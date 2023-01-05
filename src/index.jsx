import React from 'react';
import ReactDOM from 'react-dom';
import 'zarm/dist/zarm.min.css';
import Routes from './Routes';
import { Icon } from 'react-uni-comps';

Icon.loadFromIconfontCN('//at.alicdn.com/t/c/font_2398464_xxpb9pb5xis.js');

ReactDOM.render(<Routes />, document.getElementById('root'));
