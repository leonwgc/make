import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Input, message, Radio, Pagination, Empty, Collapse, Popover } from 'antd';
import FormRenderer from 'antd-form-render';
import { getHostPrefix } from '~/utils/host';
import { showError } from '../msg';
import { filterDupProducts } from '../helper';
import * as service from '../service';
import ProductList from './ProductList';
import { Icon } from 'react-uni-comps';
import './ProductManage.less';

const { Panel } = Collapse;

const splitRegx = /[，,\n]/;
const pageSize = 8;

export default function ProductManage({ selectedComponent, updateStore }) {
  const { tabGroup = {}, id, cid } = selectedComponent.props;
  const { exist = false } = tabGroup; // 二维数组
  const [skuForm] = Form.useForm();
  const [activityForm] = Form.useForm();
  const [index, setIndex] = useState(0);
  const [malls, setMalls] = useState([]);
  const [skuModalVisible, setSkuModalVisible] = useState(false);
  const [ruleModalVisible, setRuleModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const rulePullRef = useRef();
  const [rules, setRules] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedRule, setSelectedRule] = useState('');
  const [loading, setLoading] = useState(false);
  const [mVisible, setMVisible] = useState({});

  const isProduct = selectedComponent.cid === 'Product'; // 单列商品支持活动编码导入

  useEffect(() => {
    service.getMalls().then(({ result }) => {
      setMalls(result.map((item) => ({ label: item.name, value: item.code })));
    });
  }, []);

  useEffect(() => {
    service
      .getRules({
        pageSize,
        currentPage: page,
        param: {
          order: 'desc',
          type: '挑选商品',
        },
      })
      .then(({ result }) => {
        setTotal(result.totalItem);
        setRules(result.resultList || []);
      });
  }, [page]);

  const onSubmitSku = ({ mallType, skuid }) => {
    const skuIds = skuid.split(splitRegx).map((item) => item.trim());

    const data = [];

    for (let skuId of skuIds) {
      data.push({
        mallType,
        skuId,
      });
    }

    setLoading(true);
    service
      .getProductsBySku({ pageSize: 200, mallSkus: data, busChannel: 'JI_CAI' })
      .then(({ result = {} }) => {
        const { resultList = [] } = result;
        const skuNum = data.length;
        const importNum = resultList.length;
        if (!importNum) {
          message.warning('无匹配商品');
        } else if (data.length === importNum) {
          message.success(`已导入${importNum}个商品`);
        } else {
          message.warning(`已导入${importNum}个商品，${skuNum - importNum}个商品不匹配`);
        }
        const list = resultList.map((item) => ({
          id: item.id,
          name: item.name,
          skuH5Url: item.skuH5Url,
          originPrice: item.originPrice,
          salePrice: item.salePrice,
          imageUrl: item.imageUrl,
          mallType: item.mallType,
        }));
        selectedComponent.props.tabGroup.products = selectedComponent.props.tabGroup.products || [];
        const preProducts = tabGroup.products[index] || [];
        const uniqueProducts = filterDupProducts(preProducts.concat(list));
        selectedComponent.props.tabGroup.products[index] = uniqueProducts;
        updateStore();
        setSkuModalVisible(false);
        setLoading(false);
      })
      .catch((ex) => {
        showError(ex);
        setLoading(false);
      });
  };

  const skuModalLayout = [
    {
      render() {
        return <div className="product-modal-title">请输入SKU，导入商品</div>;
      },
    },
    {
      type: Radio.Group,
      label: '',
      name: 'mallType',
      elProps: {
        options: malls,
      },
      itemProps: {
        rules: [{ required: true, message: '请选择' }],
      },
    },
    {
      type: Input.TextArea,
      allowClear: true,
      label: '',
      placeholder: '请输入，多个sku逗号或换行符隔开',
      name: 'skuid',
      elProps: {
        autoSize: { minRows: 10, maxRows: 23 },
      },
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
  ];

  const activityModalLayout = [
    {
      render() {
        return <div className="product-modal-title">请输入活动编号，导入商品</div>;
      },
    },
    {
      type: Input,
      label: '活动编号',
      name: 'activityCode',
      placeholder: '请输入活动编号',
      itemProps: {
        rules: [{ required: true, message: '请输入活动编号' }],
      },
    },
  ];

  const onSubmitActivity = ({ activityCode }) => {
    setLoading(true);
    service
      .getProductsByCode(activityCode)
      .then(({ result = [] }) => {
        const len = result.length;
        if (!len) {
          message.warning('无匹配商品');
        } else {
          message.success(`已导入${len}个商品`);
          const list = result.map((item) => ({
            id: item.skuId,
            name: item.name,
            skuH5Url: ` https://${getHostPrefix()}h5.zuifuli.com/store/couponExchange/${activityCode}/${
              item.skuId
            }`,
            imageUrl: item.imageUrl,
            mallType: item.mall,
            type: 'coupon',
          }));
          selectedComponent.props.tabGroup.products =
            selectedComponent.props.tabGroup.products || [];
          selectedComponent.props.tabGroup.products[index] = (
            tabGroup.products[index] || []
          ).concat(list);
          selectedComponent.props.tabGroup.products[index] = filterDupProducts(
            selectedComponent.props.tabGroup.products[index]
          );
          updateStore();
          setActivityModalVisible(false);
        }
        setLoading(false);
      })
      .catch((ex) => {
        showError(ex);
        setLoading(false);
      });
  };

  const clearProducts = (idx) => {
    selectedComponent.props.tabGroup.products[idx] = [];
    updateStore();
    message.success('商品已删除');
  };

  const renderOne = () => {
    const productNum = selectedComponent.props.tabGroup?.products[0]?.length || 0;
    return (
      <div className="products-wrap">
        <div className="one">
          <div
            className="btn"
            onClick={() => {
              skuForm.resetFields();
              setSkuModalVisible(true);
            }}
          >
            <Icon type="iconSKU" className="icon" />
            输入SKU
          </div>
          <div className="btn" onClick={() => setRuleModalVisible(true)}>
            <Icon type="iconshangpinku" className="icon" />
            选择商品库
          </div>
          {isProduct && (
            <div className="btn" onClick={() => setActivityModalVisible(true)}>
              <Icon type="iconyuechi" className="icon" />
              活动编码
            </div>
          )}
        </div>
        {productNum > 0 ? (
          <>
            <div className="counter">
              <div className="left">已导入{productNum}个商品</div>
              <a onClick={() => clearProducts(0)}>清空商品</a>
            </div>
            <ProductList
              updateStore={updateStore}
              selectedComponent={selectedComponent}
              productsIndex={0}
            ></ProductList>
          </>
        ) : null}
      </div>
    );
  };

  const renderMore = () => {
    const { tabs = [], products = [] } = tabGroup;
    return (
      <Collapse
        defaultActiveKey={['0']}
        ghost
        expandIcon={({ isActive }) => (
          <Icon
            type={isActive ? 'iconarrow_down_filled_regular' : 'iconarrow_right_filled_regular'}
            style={{ color: '#8c8c8c' }}
          />
        )}
      >
        {tabs?.map((tab, idx) => (
          <Panel
            header={
              <div className="more">
                {`${tab}（${products[idx]?.length || 0}）`}
                <Popover
                  overlayClassName="product-manage-popover"
                  overlayStyle={{ width: 150 }}
                  placement="bottomRight"
                  visible={!!mVisible[idx]}
                  onVisibleChange={(v) => setMVisible({ [idx]: v })}
                  content={
                    <div onClick={(e) => e.stopPropagation()}>
                      <div className="title">导入商品</div>
                      <div
                        className="content-item"
                        onClick={() => {
                          setSkuModalVisible(true);
                          skuForm.resetFields();
                          setMVisible(false);
                        }}
                      >
                        <span>输入SKU</span>
                        <Icon type="iconSKU" className="icon" />
                      </div>
                      <div
                        className="content-item"
                        onClick={() => {
                          setRuleModalVisible(true);
                          setMVisible(false);
                        }}
                      >
                        <span>选择商品库</span>
                        <Icon type="iconshangpinku" className="icon" />
                      </div>
                      {isProduct && (
                        <div
                          className="content-item"
                          onClick={() => {
                            setActivityModalVisible(true);
                            activityForm.resetFields();
                            setMVisible(false);
                          }}
                        >
                          <span>活动编码</span>
                          <Icon type="iconyuechi" className="icon" />
                        </div>
                      )}

                      <div className="line"></div>
                      <div className="clear" onClick={() => clearProducts(idx)}>
                        清空本组商品
                      </div>
                    </div>
                  }
                  trigger="click"
                  onClick={(e) => {
                    setIndex(idx);
                    e.stopPropagation();
                  }}
                >
                  <Icon type="iconmore_filled_regular2" className="dot-icon" />
                </Popover>
              </div>
            }
            key={idx}
          >
            {products[idx]?.length > 0 ? (
              <ProductList
                updateStore={updateStore}
                selectedComponent={selectedComponent}
                productsIndex={idx}
              />
            ) : (
              <p className="empty-tips">点击右侧“ icon ”添加商品</p>
            )}
          </Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <div className="product-manage-setting">
      {!exist ? renderOne() : renderMore()}
      {/* SKU导入 */}
      <Modal
        maskClosable={false}
        width={560}
        title=""
        visible={skuModalVisible}
        confirmLoading={loading}
        okText={loading ? '导入中' : '确定'}
        onCancel={() => {
          setSkuModalVisible(false);
        }}
        onOk={() => skuForm.submit()}
        bodyStyle={{
          paddingBottom: 0,
        }}
      >
        <Form form={skuForm} onFinish={onSubmitSku} layout="horizontal">
          <FormRenderer layoutData={skuModalLayout}></FormRenderer>
        </Form>
      </Modal>
      {/* 商品库导入 */}
      <Modal
        width={560}
        maskClosable={false}
        title=""
        visible={ruleModalVisible}
        confirmLoading={loading}
        okText={loading ? '导入中' : '确定'}
        onCancel={() => {
          setRuleModalVisible(false);
        }}
        onOk={() => {
          if (selectedRule) {
            setLoading(true);
            service
              .getProductsByRule(selectedRule)
              .then(({ result }) => {
                if (!result.resultList?.length) {
                  message.warning('无匹配商品');
                } else {
                  let list = result.resultList.map((item) => ({
                    id: item.id,
                    name: item.name,
                    skuH5Url: item.skuH5Url,
                    originPrice: item.originPrice,
                    salePrice: item.salePrice,
                    imageUrl: item.imageUrl,
                    mallType: item.mallType,
                  }));
                  selectedComponent.props.tabGroup.products =
                    selectedComponent.props.tabGroup.products || [];

                  const preProducts = tabGroup.products[index] || [];
                  const uniqueProducts = filterDupProducts(preProducts.concat(list));
                  selectedComponent.props.tabGroup.products[index] = uniqueProducts;
                  message.success(`已导入${uniqueProducts.length - preProducts.length}个商品`);
                }
                updateStore();
                setRuleModalVisible(false);
                setLoading(false);
              })
              .catch((ex) => {
                showError(ex);
                setLoading(false);
              });
          } else {
            showError('请选择');
          }
        }}
      >
        <div style={{ height: 460, position: 'relative' }}>
          <div className="product-modal-title">请选择商品库，导入商品</div>
          <div className="rule-list" ref={rulePullRef}>
            {total > 0 ? (
              rules.map((item) => (
                <div
                  className={`rule-item ${item.nid === selectedRule ? 'active' : ''}`}
                  key={item.nid}
                  onClick={() => setSelectedRule(item.nid)}
                >
                  {item.name} {item.nid}
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 100 }} />
            )}
          </div>
          {total > 0 ? (
            <div className="pagination" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Pagination current={page} onChange={setPage} pageSize={pageSize} total={total} />
            </div>
          ) : null}
        </div>
      </Modal>
      {/* 活动编码导入 */}
      <Modal
        maskClosable={false}
        width={560}
        title=""
        visible={activityModalVisible}
        confirmLoading={loading}
        okText={loading ? '导入中' : '确定'}
        onCancel={() => {
          setActivityModalVisible(false);
        }}
        onOk={() => activityForm.submit()}
        centered
      >
        <Form form={activityForm} onFinish={onSubmitActivity} layout="horizontal">
          <FormRenderer layoutData={activityModalLayout}></FormRenderer>
        </Form>
      </Modal>
    </div>
  );
}
