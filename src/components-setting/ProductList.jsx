import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, message, Space } from 'antd';
import FormRenderer from 'antd-form-render';
import { getHostPrefix } from '~/utils/host';
import Upload from '~/common/Upload';
import useSort from '~/hooks/useSort';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import './ProductList.less';

const layout = (index) => [
  {
    render() {
      return <h3 style={{ marginBottom: 25 }}>商品{index + 1}</h3>;
    },
  },
  {
    type: MyUpload,
    label: '商品图',
    name: 'imageUrl',
    rules: [
      {
        required: true,
        message: '请上传商品图片',
      },
    ],
  },
  {
    type: Input,
    label: '商品名称',
    placeholder: '请输',
    name: 'name',
    elProps: {},
    itemProps: {
      rules: [{ required: true, message: '请输入' }],
    },
  },
  {
    type: Input,
    label: '描述',
    name: 'desc',
    elProps: {},
    itemProps: {},
  },
  {
    type: Input,
    label: '详情链接',
    name: 'skuH5Url',
    elProps: {},
    itemProps: {
      rules: [{ required: true, message: '请输入' }],
    },
  },
  {
    type: Input,
    label: '售价',
    name: 'salePrice',
    elProps: {
      disabled: true,
      addonAfter: '积分',
    },
    itemProps: {},
  },
  {
    type: Input,
    label: '原价',
    name: 'originPrice',
    elProps: {
      addonAfter: '积分',
      disabled: true,
    },
  },
];

export default function ProductList({ selectedComponent, updateStore, productsIndex = 0 }) {
  const { tabGroup = {} } = selectedComponent.props;
  const { products = [] } = tabGroup; // 二维数组
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState({});
  const ref = useRef();

  useSort(ref, {
    store: {
      set: function (ss) {
        let ar = ss.toArray();
        let _products = products.slice();
        _products[productsIndex].sort(
          (a, b) => ar.indexOf(a.id?.toString()) - ar.indexOf(b.id?.toString())
        );
        selectedComponent.props.tabGroup.products = [..._products];
        updateStore();
      },
    },
    onSort: function (/**Event*/ evt) {
      // same properties as onEnd
      var a = evt;
    },
  });

  const onSave = (formData) => {
    selectedComponent.props.tabGroup.products[productsIndex][current.index] = {
      ...current,
      ...formData,
    };
    updateStore();
    setVisible(false);
  };

  const edit = (data) => {
    setCurrent(data);
    setVisible(true);
    form.resetFields();
    form.setFieldsValue(data);
  };

  const productList = products[productsIndex] || [];
  return productList.length ? (
    <div ref={ref} className="s-product-list">
      {productList.map((p, idx) => (
        <ProductItem
          key={p.id}
          data={p}
          index={idx}
          productsIndex={productsIndex}
          selectedComponent={selectedComponent}
          updateStore={updateStore}
          edit={edit}
        />
      ))}
      <Modal
        width={640}
        visible={visible}
        maskClosable={false}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => form.submit()}
        className="product-list-edit-modal"
      >
        <Form
          form={form}
          onFinish={onSave}
          layout="horizontal"
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
        >
          <FormRenderer layoutData={layout(current.index)}></FormRenderer>
        </Form>
      </Modal>
    </div>
  ) : null;
}

function ProductItem({ data, index, productsIndex, selectedComponent, updateStore, edit }) {
  return (
    <div className="s-product-item" data-id={+data.id}>
      <div className="top">
        <div className="index">商品{index + 1}</div>
        <div>
          <Space>
            <a
              onClick={() =>
                edit({
                  index,
                  ...data,
                })
              }
            >
              编辑
            </a>
            {/* <Popconfirm
              title={<div style={{ width: 100 }}>确定要删除吗？</div>}
              onConfirm={() => {
                selectedComponent.props.tabGroup.products[productsIndex].splice(index, 1);
                updateStore();
              }}
              placement="topRight"
            > */}
            <a
              onClick={() => {
                selectedComponent.props.tabGroup.products[productsIndex].splice(index, 1);
                updateStore();
                message.success('商品已删除');
              }}
            >
              删除
            </a>
            {/* </Popconfirm> */}
          </Space>
        </div>
      </div>
      <div className="detail">
        <div className="pic">
          <img src={data.imageUrl} />
        </div>
        <div className="info">
          <div className="name" title={data.name}>
            {data.name}
          </div>
          <div className="desc">{data.desc}</div>
          <div className="price">
            {data.salePrice && <span>{data.salePrice}积分</span>}
            {data.originPrice && <span>原价:{data.originPrice}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyUpload({ value, onChange }) {
  const [url, setUrl] = useState(value);

  useEffect(() => {
    if (value) setUrl(value);
  }, [value]);

  let fileList = [];
  if (url) {
    fileList = [{ uid: -1, url }];
  }
  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  return (
    <Upload
      data={{ storeType: 'I', type: '29', creator: 'system' }}
      action={`https://${getHostPrefix()}api.zuifuli.com/api/customer/v2/attach/upload4NoLogin`}
      fileList={fileList}
      showUploadList={true}
      accept="image/*"
      onFileListChange={(fileList) => {
        const _url = fileList.length ? fileList[fileList.length - 1].url : '';

        setUrl(_url);
        triggerChange(_url);
      }}
    >
      {(loading, fileList) => {
        return fileList.length == 1 ? null : (
          <div style={{ fontSize: 20, color: '#909399' }}>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
          </div>
        );
      }}
    </Upload>
  );
}
