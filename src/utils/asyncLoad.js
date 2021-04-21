/**
 * @Author: lduoduo
 * @Date: 2018-01-07 23:29:50
 * @Last Modified by: zouhuan
 * @Last Modified time: 2020-03-05 17:41:18
 *
 * asynLoad 延迟异步加载 js / css文件
 * 调用方式:
 * 1. import { asynLoad } from 'utils';
 * 2. asynLoad(['url1','url2']).then()
 * 3. asynLoad('url3').then()
 *
 */

/**
 *
 *
 * @export
 *
 * @param {String / Array} url 目标地址 或者地址列表
 * @return Promise
 */
export default function (url) {
  if (!url) return Promise.reject('');

  if (url.constructor === String) {
    return loadResource(url);
  }
  if (url.constructor === Array) {
    const arr = [];
    url.map((item) => {
      arr.push(loadResource(item));
    });
    return Promise.all(arr);
  }
  return Promise.reject('unknown parameter type of asynLoad', url);
}

function loadResource(url) {
  let dom;
  // 先判断是否已经加载过，加载过的不再重新加载
  dom = document.getElementById(url);
  if (dom) return Promise.resolve();

  // console.log('asynLoad start url: ', url);
  // 加载css
  if (/\.css$/.test(url)) {
    dom = document.createElement('link');
    dom.rel = 'stylesheet';
    dom.href = url;
  } else {
    dom = document.createElement('script');
    dom.src = url;
  }
  dom.id = url;
  return new Promise((resolve, reject) => {
    dom.onload = resolve;
    document.body.appendChild(dom);
  });
}
