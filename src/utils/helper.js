import * as qs from 'qs';

// object to form-urlencoded string
export function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

// location.search to object
export function getURLParams() {
  return qs.parse(location.search.slice(1));
}

/**
 * api接口返回接口处理，包括登录跳转， 一切ok 执行then, 不ok , code!==0 ，执行catch逻辑
 *
 * @param {*} res
 * @return {*}
 */
export const responseHandler = (res) => {
  const loginRedirectUrl = `//${getHostPrefix()}api.zuifuli.com/api/duncan/s/r/common`;
  const logoUrl = 'https://static.zuifuli.com/images/v-logo.png';

  return new Promise((resolve, reject) => {
    let code = Number(res.code);
    if (code === 110004 || code === 130003) {
      if (__dev__) {
        window.location.hash = `/login?logoUrl=${logoUrl}&redirectUrl=${encodeURIComponent(
          window.location.href
        )}`;
        return;
      }

      window.location.href = `//${loginRedirectUrl}?logoUrl=${logoUrl}&redirectUrl=${encodeURIComponent(
        window.location.href
      )}`;
      return;
    }
    if (code) return reject(res);
    resolve(res);
  });
};
