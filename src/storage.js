import { getData, setData, removeData } from 'simple-browser-store';
const key = '__make__tpl';

export const getList = () => {
  return getData('localStorage', key) || [];
};

const setList = (list) => {
  setData('localStorage', key, list);
};

export const addTpl = (tplData) => {
  const list = getList();
  list.push(tplData);
  setList(list);
};

export const removeAll = () => {
  removeData('localStorage', key);
};

export const remove = (tid) => {
  let list = getList();
  list = list.filter((item) => item.tid !== tid);
  setList(list);
};

const pageKey = '__page__';

export const setPage = (app) => {
  const { name, comps = [], bgColor = '' } = app;
  setData('localStorage', pageKey, { name, bgColor, comps });
};

export const getPage = () => {
  return getData('localStorage', pageKey);
};
