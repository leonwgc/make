const envHostPrefixMap = {
  prd: '',
  test: 't-',
  pre: 'u-',
};

export function getHostPrefix() {
  return envHostPrefixMap[getEnv()];
}

export function getEnv() {
  if (typeof document === 'undefined') {
    return 'node';
  }
  let env = 'prd';
  const hostname = location.hostname;
  if (/^(t-|localhost|test)/.test(hostname)) {
    env = 'test';
  } else if (/^(u-|uat)/.test(hostname)) {
    env = 'pre';
  }

  return env;
}
/**
 * 获取api host域名前缀, e.g. //api.zuifuli.com
 *
 * @param {boolean} [isEhr=false]  是否为ehr api
 * @return {*}
 */
export const getApiPrefix = (isEhr = false) => {
  const hostname = location.hostname;

  const host =
    hostname.indexOf('zuifuli.com') == -1
      ? ''
      : `//${getHostPrefix()}${isEhr ? 'ehr' : 'api'}.zuifuli.com`;

  return host;
};
