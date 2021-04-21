/**
 * 通用API请求工具方法
 */
import qs from 'qs';
import JSONbig from 'json-bigint';

function parseResponse(xhr, parseBigInt = false) {
  var result;
  const parser = parseBigInt ? JSONbig({ storeAsString: true }) : JSON;
  try {
    result = parser.parse(xhr.responseText);
  } catch (e) {
    result = xhr.responseText;
  }
  return result;
}

function hasContentType(headers) {
  return Object.keys(headers).some((name) => {
    return name.toLowerCase() === 'content-type';
  });
}

// application/x-www-form-urlencoded / application/json
function setHeaders(xhr, headers) {
  headers = headers || {};
  if (!hasContentType(headers)) {
    headers['Content-Type'] = 'application/json';
  }
  Object.keys(headers).forEach((name) => {
    if (headers[name]) {
      xhr.setRequestHeader(name, headers[name]);
    }
  });
}
function objectToQueryString(data) {
  return isObject(data) ? getQueryString(data) : data;
}

function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

function fetch(url, options) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url);
    xhr.withCredentials = options.withCredentials;
    setHeaders(xhr, options.headers);
    xhr.onload = () => {
      var res = parseResponse(xhr, options.parseBigInt);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(res);
      } else {
        reject({ code: xhr.status });
      }
    };
    xhr.onerror = reject;
    xhr.send(options.data);
  });
}

const fetchFactory = (method, host) => (
  api,
  data = null,
  headers = null,
  withCredentials = true,
  parseBigInt = false
) => {
  let url = `${host}${api}`;
  if (method === 'get') {
    if (data) {
      url += `?${objectToQueryString(data)}`;
      data = null;
    }
  } else {
    if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      data = objectToQueryString(data);
    } else {
      try {
        data = JSON.stringify(data);
      } catch (ex) {}
    }
  }

  return fetch(url, {
    method,
    data,
    headers,
    withCredentials,
    parseBigInt,
  });
};

export default fetchFactory;
