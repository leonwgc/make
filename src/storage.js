import { getData, setData, removeData } from 'simple-browser-store';
const key = '__make__tpl';

const isEmptyObj = (obj) => Object.keys(obj).length === 0;

export const getTplList = () => {
  const data = getData('localStorage', key);
  if (isEmptyObj(data)) {
    return [];
  }

  return data.list;
};

const setTplList = (list) => {
  setData('localStorage', key, { list });
};

export const addTpl = (tplData) => {
  const list = getTplList();
  list.push(tplData);
  setTplList(list);
};

export const removeAll = () => {
  removeData('localStorage', key);
};

export const removeTpl = (tplId) => {
  let list = getTplList();
  list = list.filter((item) => item.tplId !== tplId);
  setTplList(list);
};

const pageKey = '__page__';

export const setPage = (app) => {
  const { name, comps = [], bgColor = '' } = app;
  setData('localStorage', pageKey, { name, bgColor, comps });
};

export const getPage = () => {
  return getData('localStorage', pageKey);
};
