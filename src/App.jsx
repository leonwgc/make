import React from 'react';
import Header from './Header';
import ComponentPanel from './ComponentPanel';
import Stage from './EditorStage';
import PropSetting from './SettingPanel';
import Footer from './Footer';
import usePageTitle from './hooks/usePageTitle';
import './App.less';

export default function App() {
  usePageTitle('运营自定义装修平台');
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
