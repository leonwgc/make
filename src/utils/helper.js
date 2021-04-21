import * as qs from 'qs';

// object to form-urlencoded string
export function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

// location.search to object
export function getURLParams() {
  return qs.parse(location.search.slice(1));
}

export function getClientInfo() {
  if (typeof window === 'undefined') {
    return 'node';
  }
  var UA = window.navigator.userAgent.toLowerCase();
  if (window.__wxjs_environment === 'miniprogram') {
    return 'miniprogram';
  }
  if (UA.match(/MicroMessenger/i)) {
    return 'wechat';
  }
  return 'browser';
}

// get client info ,return  {isAndroid, isiOS}
export function getClientType() {
  let ua = navigator.userAgent;
  let isAndroid = /android/i.test(ua);
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  return { isAndroid, isiOS };
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

// safely get props of an object.
/* tslint:disable */
export function getProp(obj, path, defaultValue) {
  if (isObject(obj) && path) {
    let t;
    try {
      const getter = new Function('a', `return a.${path}`);
      t = getter(obj);
    } catch (ex) {
      t = defaultValue;
    }
    return t !== undefined ? t : defaultValue !== undefined ? defaultValue : t;
  }
}
