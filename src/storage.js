const key = '__make__tpl';

export const getList = () => {
  const str = localStorage.getItem(key);
  let list = [];
  if (str) {
    list = JSON.parse(str);
  }
  return list;
};

const setList = (list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

export const addTpl = (tplData) => {
  const list = getList();
  list.push(tplData);
  setList(list);
};

export const removeAll = () => {
  localStorage.removeItem(key);
};

export const remove = (tid) => {
  let list = getList();
  list = list.filter((item) => item.tid !== tid);
  setList(list);
};

export const setPage = (app) => {
  const { name, comps = [], bgColor = '' } = app;
  localStorage.setItem('page', JSON.stringify({ name, bgColor, comps }));
};

export const getPage = () => {
  let str = localStorage.getItem('page');

  try {
    if (str) return JSON.parse(str);
  } catch (ex) {
    return {};
  }
};
