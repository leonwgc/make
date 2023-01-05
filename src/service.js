import { get, post, put, del } from '~/utils/req';
import { responseHandler } from '~/utils/helper';

// 页面status
// 状态 D-草稿 U-上架 D-下架
// 页面类型
// layoutType HOME 首页 ，OTHER 其他

const requestCheck = (res) => {
  return new Promise((resolve, reject) => {
    if (!res) {
      reject({ message: '服务未返回', code: 1 });
    } else {
      resolve(res);
    }
  }).then(responseHandler);
};

// 控件管理 start
export const createMyTpl = (data = {}) => {
  return post(`/api/plank/v1/decor/component/create`, data).then(requestCheck);
};
export const getMyTplList = (data = {}) => {
  return post(`/api/plank/v1/decor/component/list`, data, null, true, true).then(requestCheck);
};
export const deleteMyTpl = (id) => {
  return del(`/api/plank/v1/decor/component/delete/${id}`).then(requestCheck);
};
//  控件管理 end

// 类别标签管理 start

export const createTag = (data = {}) => {
  return post(`/api/plank/v1/decor/category/manager/create`, data).then(requestCheck);
};

export const updateTag = (data = {}) => {
  return post(`/api/plank/v1/decor/category/manager/modify`, data).then(requestCheck);
};

export const getTagList = (data = {}) => {
  return post(`/api/plank/v1/decor/category/manager/list`, data, null, true, true).then(
    requestCheck
  );
};

export const deleteTag = (id) => {
  return put(`/api/plank/v1/decor/category/manager/delete/${id}`).then(requestCheck);
};
// 类别标签管理  end

// 模板管理 start

export const createTemplate = (data = {}) => {
  return post(`/api/plank/v1/decor/template/manager/create`, data).then(requestCheck);
};

export const getTemplateList = (data = {}) => {
  return post(`/api/plank/v1/decor/template/manager/page/turning`, data, null, true, true).then(
    requestCheck
  );
};

export const deleteTemplate = (id) => {
  return del(`/api/plank/v1/decor/template/manager/delete/${id}`).then(requestCheck);
};

export const updateTemplate = (data = {}) => {
  return post(`/api/plank/v1/decor/template/manager/modify`, data).then(requestCheck);
};

export const onlineTemplate = (id) => {
  return put(`/api/plank/v1/decor/template/manager/online/${id}`).then(requestCheck);
};

// 模板管理  end

// 页面管理 start   类型 H-首页 R-推荐 C-卡券 A-活动 O-其他

export const createPage = (data = {}) => {
  return post(`/api/plank/v1/decor/layout/manager/create`, data, null, true, true).then(
    requestCheck
  );
};

export const getPageList = (data = {}) => {
  return post(`/api/plank/v1/decor/layout/manager/org/page/turning`, data, null, true, true).then(
    requestCheck
  );
};

export const updatePage = (data = {}) => {
  return post(`/api/plank/v1/decor/layout/manager/modify`, data).then(requestCheck);
};

// 获取页面详情， isPreview=true 获取previewDetail =false, 获取detail
export const getPageById = (id, isPreview = true) => {
  return get(`/api/plank/v1/decor/layout/${isPreview ? 'previewDetail' : 'detail'}/${id}`).then(
    requestCheck
  );
};

export const deletePage = (id) => {
  return del(`/api/plank/v1/decor/layout/manager/delete/${id}`);
};

// 发布上线
export const online = (id) => {
  return put(`/api/plank/v1/decor/layout/manager/online/${id}`);
};

// 下线
export const offline = (id) => {
  return put(`/api/plank/v1/decor/layout/manager/offline/${id}`);
};

export const setHome = (id) => {
  return put(`/api/plank/v1/decor/layout/manager/setHome/${id}`);
};

export const bind = (data) => {
  // {layoutCode,orgCustId}
  return post(`/api/plank/v1/decor/layout/manager/binding`, data);
};
// 页面管理  end

// 权限 数据
export const getCustInfo = () => {
  return get(`/api/agent/v1/customer/queryCustByCustId4OneSys`);
};

export const getOrgListForBinding = () => {
  return get(`/api/customer/v2/org/queryOrgForTree`);
};
//

//商品相关 start

export const getMalls = () => {
  return get(`/api/mall/v1/malls`).then(requestCheck);
};

export const getRules = (data) => {
  return post(`/api/mall/v1/mallSystemConfig/do/page/turning`, data);
};

export const getProductsByRule = (code) => {
  return get(`/api/mall/v1/cms/sku/ALL`, {
    hasStock: true,
    code,
    type: '挑选商品',
    busChannel: 'JI_CAI',
  });
};

export const getProductsBySku = (data) => {
  return post(`/api/mall/v1/search/sku/allChannel`, data).then(requestCheck);
};

export const getProductsByCode = (code) =>
  get(`/api/promotion/v1/coupon/admin/activity/${code}/sku`).then(requestCheck);
//商品相关 end

// misc start
export const getQuickEntryTags = () => {
  return get(`/api/sec/v2/auth/tag/list`).then(requestCheck);
};

export const getAppsByTags = (tag) => {
  return get(`/api/sec/v2/auth/tag/function/info`, { tag });
};
// misc end
