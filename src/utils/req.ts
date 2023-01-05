import fetch from 'xhr-fetch-lib';
import { getApiPrefix } from './host';
import { responseHandler } from '~/utils/helper';
import { Toast } from 'react-uni-comps';

/**
 * ajax请求方法，处理了最福利api code逻辑,JSON.big ID问题, 默认toast显示错误
 *
 * @export
 * @param {*} method 请求方法
 * @param {*} url 请求url
 * @param {*} data 请求数据,对于get请求， data用object默认会转为 key=value&key1=value1的格式
 * @param {*} [headers={}] 请求头
 * @param {*} [toastError=true] 显示接口错误信息
 * @return {*}
 */
export default function req(method, url, data, headers = {}, toastError = true) {
  return fetch({ method, url, data, headers })
    .then(responseHandler)
    .catch((ex) => {
      if (toastError) {
        Toast.show(JSON.stringify(ex));
      }
      throw ex;
    });
}
/**
 * get
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @param {boolean} [isEhrApi=false]
 * @param {boolean} [toastError=true]
 * @return {*}
 */
export const get = (url, data?, headers?, isEhrApi = false, toastError = true) => {
  return req('get', `${getApiPrefix(isEhrApi)}${url}`, data, headers, toastError);
};

/**
 * post 请求
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @param {boolean} [isEhrApi=false]
 * @param {boolean} [toastError=true]
 * @return {*}
 */
export const post = (url, data?, headers?, isEhrApi = false, toastError = true) => {
  return req('post', `${getApiPrefix(isEhrApi)}${url}`, data, headers, toastError);
};

/**
 * put 请求
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @param {boolean} [isEhrApi=false]
 * @param {boolean} [toastError=true]
 * @return {*}
 */
export const put = (url, data?, headers?, isEhrApi = false, toastError = true) => {
  return req('put', `${getApiPrefix(isEhrApi)}${url}`, data, headers, toastError);
};

/**
 * delete 请求
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @param {boolean} [isEhrApi=false]
 * @param {boolean} [toastError=true]
 * @return {*}
 */
export const del = (url, data?, headers?, isEhrApi = false, toastError = true) => {
  return req('delete', `${getApiPrefix(isEhrApi)}${url}`, data, headers, toastError);
};
