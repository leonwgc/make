
#### 特征
1. 支持拖拽编辑排序
2. 支持利用antd-form-render利用js对象配置属性面板， 也支持自定义组件定制属性面板
3. 模拟手机预览

#### 技术栈
1. 打包基于packx, 基于webpack5封装 [https://www.npmjs.com/package/packx](https://www.npmjs.com/package/packx)
2. 技术栈：react全家桶 react/redux/hooks
3. 拖拽/排序依赖 [http://www.sortablejs.com/](http://www.sortablejs.com/)
4. pc端组件基于antd v4 [https://ant.design/index-cn](https://ant.design/index-cn)
5. 移动端预览基于zarm [https://zarm.gitee.io/#/](https://zarm.gitee.io/#/)
6. hooks组件依赖whooks [https://www.npmjs.com/package/whooks](https://www.npmjs.com/package/whooks) 
7. redux全局存储依赖 simple-redux-store [https://www.npmjs.com/package/simple-redux-store](https://www.npmjs.com/package/simple-redux-store)



#### 运行
- yarn 安装依赖
- yarn start 即可跑起来，编辑数据存储在localstorage 无需依赖接口等

#### 运行效果截屏

![full.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5818bc53dd14d60b1a1afae6723f045~tplv-k3u1fbpfcp-watermark.image)