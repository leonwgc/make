export function gid() {
  let stamp = +new Date();
  return (((1 + Math.random()) * stamp) | 0).toString(16);
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
