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
