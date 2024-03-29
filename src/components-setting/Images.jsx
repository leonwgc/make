import React, { useEffect } from 'react';
import { Form, Input, Radio, Checkbox, Divider } from 'antd';
import Upload from '~/common/Upload';
import FormRenderer from 'antd-form-render';
import ColorPicker from './ColorPicker';
import './Images.less';
import { getBase64 } from '~/helper';
import { BallSpin, Icon } from 'react-uni-comps';

const map = {
  image1: {
    name: '一行一个',
    number: 1,
  },
  image2: {
    name: '一行二个',
    number: 2,
  },
  image3: {
    name: '左一右二',
    number: 3,
  },
  image31: {
    name: '左二右一',
    number: 3,
  },
  image4: {
    name: '一行四个',
    number: 4,
  },
};

// 自定义设置面板
export default function Images({ selectedComponent, updateStore }) {
  const [form] = Form.useForm();
  let images = selectedComponent.props.images || []; // imageInfo array

  useEffect(() => {
    form.resetFields();
  }, [form, selectedComponent]);

  const getArrangeTypeName = () => {
    const arrangeType = selectedComponent.props.arrangeType || 'image1';
    return map[arrangeType].name;
  };

  const formLayout = [
    {
      label: '模块样式',
      type: Radio.Group,
      name: 'styleType',
      elProps: {
        options: [
          { label: '卡片', value: 'card' },
          { label: '通栏', value: 'full' },
        ],
        defaultValue: 'card',
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      label: (
        <span>
          排列样式
          <span style={{ fontSize: 14, color: '#18191a', fontWeight: 'bold', marginLeft: 8 }}>
            {getArrangeTypeName()}
          </span>
        </span>
      ),
      type: Radio.Group,
      name: 'arrangeType',
      itemProps: {
        layout: 'vertical',
        labelCol: { span: 24 },
      },
      elProps: {
        optionType: 'button',
        onChange: (e) => {
          selectedComponent.props.images = images.slice(0, map[e.target.value].number);
          updateStore();
        },
        options: [
          {
            label: <Icon type="iconpicturea1" />,
            value: 'image1',
          },
          { label: <Icon type="iconpicturea2" />, value: 'image2' },
          { label: <Icon type="iconpicturea3" />, value: 'image3' },
          { label: <Icon type="iconpicturea4" />, value: 'image31' },
          { label: <Icon type="iconpicturea5" />, value: 'image4' },
        ],
        defaultValue: 'image1',
      },
    },
    {
      render() {
        return <div className="upload-title">上传图片</div>;
      },
    },
    {
      render() {
        const arrangeType = form.getFieldValue('arrangeType') || 'image1';
        const number = map[arrangeType].number || 1;

        let label1 = '';
        let label2 = '';
        let label3 = '';
        let label4 = '';
        let tip1 = '';
        let tip2 = '';
        let tip3 = '';
        let tip4 = '';

        switch (arrangeType) {
          case 'image1': {
            label1 = '图片';
            tip1 = '(宽1125像素)';
            break;
          }
          case 'image2': {
            label1 = '图片1';
            label2 = '图片2';
            tip1 = '(宽562像素)';
            tip2 = '(宽562像素)';
            break;
          }
          case 'image3': {
            label1 = '左图';
            label2 = '右上图';
            label3 = '右下图';
            tip1 = '(宽562像素)';
            tip2 = '(宽562像素，高为左图一半)';
            tip3 = '(宽562像素，高为左图一半)';
            break;
          }
          case 'image31': {
            label1 = '右图';
            label2 = '左上图';
            label3 = '左下图';
            tip1 = '(宽562像素)';
            tip2 = '(宽562像素，高为右图一半)';
            tip3 = '宽562像素，高为右图一半)';
            break;
          }
          case 'image4': {
            label1 = '图片1';
            label2 = '图片2';
            label3 = '图片3';
            label4 = '图片4';
            tip1 = '(宽282像素)';
            tip2 = '(宽282像素)';
            tip3 = '(宽282像素)';
            tip4 = '(宽282像素)';
            break;
          }
        }

        return (
          <div>
            <MyUpload
              label={label1}
              tip={tip1}
              index={0}
              selectedComponent={selectedComponent}
              updateStore={updateStore}
            />
            {number > 1 ? (
              <MyUpload
                label={label2}
                tip={tip2}
                index={1}
                selectedComponent={selectedComponent}
                updateStore={updateStore}
              />
            ) : null}
            {number > 2 ? (
              <MyUpload
                label={label3}
                tip={tip3}
                index={2}
                selectedComponent={selectedComponent}
                updateStore={updateStore}
              />
            ) : null}
            {number > 3 ? (
              <MyUpload
                label={label4}
                tip={tip4}
                index={3}
                selectedComponent={selectedComponent}
                updateStore={updateStore}
              />
            ) : null}
          </div>
        );
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <ColorPicker
            selectedComponent={selectedComponent}
            updateStore={updateStore}
            placement="bottom"
            defaultColor="#fff"
          />
        );
      },
    },
    {
      render() {
        return <Divider style={{ margin: '16px 0' }} />;
      },
    },
    {
      render() {
        return (
          <Form.Item name="hideMargin" valuePropName="checked" initialValue={false}>
            <Checkbox>隐藏该模块下方的间隙</Checkbox>
          </Form.Item>
        );
      },
    },
  ];

  const onValuesChange = (changedValues) => {
    let keys = Object.keys(changedValues);
    for (let k of keys) {
      selectedComponent.props = { ...selectedComponent.props, [k]: changedValues[k] };
    }

    updateStore();
  };

  const initialValues = { ...selectedComponent.props };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
      layout="horizontal"
      className="image-setting"
    >
      <div className="item">
        <FormRenderer layoutData={formLayout}></FormRenderer>
      </div>
    </Form>
  );
}

function MyUpload({ label, tip = '', index, updateStore, selectedComponent }) {
  const { images = [] } = selectedComponent.props;
  let data = images[index] || {};
  const { url, link } = data;
  let _fl = [];

  if (url) {
    _fl = [{ uid: -1, url }];
  }

  return (
    <div className="image-upload">
      <div className="l">
        <Upload
          fileList={_fl}
          showUploadList={true}
          accept="image/*"
          onChange={(info) => {
            if (info.file.originFileObj) {
              getBase64(info.file.originFileObj, (url) => {
                images[index] = { ...images[index], url: url };
                selectedComponent.props.images = [...images];
                updateStore();
              });
            } else {
              images[index] = undefined;
              selectedComponent.props.images = [...images];
              updateStore();
            }
          }}
        >
          {(loading, fileList) => {
            return fileList.length == 1 ? null : (
              <div style={{ fontSize: 20, color: '#909399' }}>
                {loading ? <BallSpin /> : <Icon type="uc-icon-jia2" />}
              </div>
            );
          }}
        </Upload>
      </div>
      <div className="r">
        <div className="text">
          {label} <span className="tip">{tip}</span>
        </div>
        <div>
          <Input
            placeholder="输入跳转详情链接"
            value={link}
            onChange={(e) => {
              images[index] = { ...images[index], link: e.target.value };
              selectedComponent.props.images = [...images];
              updateStore();
            }}
          />
        </div>
      </div>
    </div>
  );
}
