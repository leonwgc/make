import { nanoid } from 'react-uni-comps';

export function gid() {
  return nanoid(12);
}

export const getActiveComponentById = (id, comps = []) => {
  if (!id) return null;

  let comp = comps.find((c) => c.id === id);

  if (!comp) {
    let flexList = comps.filter((c) => c.cid === 'Flex');
    let current;
    for (var i = 0; i < flexList.length; i++) {
      current = flexList[i];
      if (current.id === id) {
        comp = current;
        break;
      } else {
        comp = current.comps.find((c) => c.id === id);
        if (comp) {
          break;
        }
        let subFlexList = current.comps.filter((c) => c.cid === 'Flex');
        flexList = flexList.concat(subFlexList);
      }
    }
  }
  return comp;
};

export const getSettingDefaultValues = (setting) => {
  let keys = Object.keys(setting);
  let rt = {};
  let v = '';
  for (let f of keys) {
    const { elProps = {} } = setting[f];
    const { defaultValue } = elProps;
    if (typeof defaultValue === 'function') {
      v = defaultValue();
    } else {
      v = defaultValue;
    }
    rt[f] = v;
  }
  return rt;
};

export const getOptions = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((v) => ({
      label: v,
      value: v,
    }));
  }
  return [];
};

export const convertJSONToObject = (json = '', defaultOnFail = {}) => {
  if (json) {
    try {
      let obj = JSON.parse(json);
      return obj;
    } catch (ex) {
      return defaultOnFail;
    }
  } else {
    return defaultOnFail;
  }
};

// 1已发布  2，已发布 (有草稿未发布 previewDetail 和detail不一样) 3 未发布
export const getPageStatus = (detail) => {
  const { status, diff } = detail;

  if (status === 'ONLINE') {
    return diff ? 2 : 1;
  }
  return 3;
};

export const isOffline = (item) => {
  return item.status === 'OFFLINE' || item.status === 'DRAFT';
};

export const getClosestComp = (el, className = 'design-cmp') => {
  let _c = el;
  while (_c && !_c.classList.contains(className)) {
    _c = _c.parentElement;
  }

  if (_c) {
    return _c.dataset.id;
  }
};

export const filterDupProducts = (products = []) => {
  let r = [];
  for (let p of products) {
    if (!r.some((_ri) => _ri.id === p.id)) {
      r.push(p);
    }
  }
  return r;
};
