import React, { Suspense } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider, configureStore } from 'simple-redux-store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './RoutesConfig';
import App from './App';
import './App.less';

const store = configureStore();

const Routes = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Suspense fallback={<Spin />}>
            <Switch>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
              <Route component={App} />
            </Switch>
          </Suspense>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default Routes;
