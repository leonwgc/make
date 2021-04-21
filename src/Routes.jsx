import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './stores';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './RoutesConfig';
import { Spin } from 'antd';
// import 'dayjs/locale/zh-cn'; // load on demand
// import dayjs from 'dayjs';
import App from './App';
import './App.less';

// dayjs.locale('zh-cn');

const Loading = () => {
  return (
    <div className="my-loading">
      <Spin />
    </div>
  );
};

const Routes = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<Loading />}>
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
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default Routes;
