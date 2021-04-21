import React from 'react';
import Header from './Header';
import ComponentPanel from './ComponentPanel';
import Stage from './EditorStage';
import PropSetting from './SettingPanel';
import Footer from './Footer';

import './App.less';

export default function App({ history }) {
  return (
    <div className="page-app">
      <Header />
      <div className="section">
        <ComponentPanel />
        <Stage />
        <PropSetting />
      </div>
      <Footer />
    </div>
  );
}
