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
 * 获取api host域名前缀
 *
 * @return {*}
 */
export const getApiPrefix = () => {
  const hostname = location.hostname;

  const host = hostname.indexOf('domain.com') == -1 ? '' : `//${getHostPrefix()}api.domain.com`;

  return host;
};
