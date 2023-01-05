import { message } from 'antd';

const imageCheck = (v) => {
  const { props = {} } = v;
  let valid = true;
  if (!props.images || !props.images.filter((img) => img.url).length) {
    message.error(`请上传图片`);
    valid = false;
  }

  return valid;
};

const productCheck = (v) => {
  const { props = {} } = v;
  const { tabGroup = {}, productNum } = props;
  const { products = [], exist, tabs = [] } = tabGroup;
  let valid = true;
  if (!products.length || !products[0].length) {
    message.error(`请配置商品信息`);
    return false;
  }

  if (Array.isArray(productNum)) {
    productNum.forEach((num, idx) => {
      if (num > products[idx]?.length) {
        message.error(`商品数量不足,请添加商品或调整显示个数`);
        valid = false;
      }
    });
  } else {
    if (productNum > products[0]?.length) {
      message.error(`商品数量不足,请添加商品或调整显示个数`);
      valid = false;
    }
  }

  if (exist && tabs.length > 1) {
    var t = tabs.length;

    for (var i = 0; i < t; i++) {
      if (!products[i] || !products[i].length) {
        message.error(`请配置分组${i + 1}商品信息`);
        return false;
      }
    }
  }
  return valid;
};

const validator = {
  Carousel: (v) => {
    const { props = {} } = v;
    let valid = true;
    if (!props.images || props.images.length < 1 || props.images.length > 10) {
      message.error(`请上传至少1张图片,至多10张图片`);
      valid = false;
    }

    return valid;
  },
  Images: imageCheck,
  SlideImage: (v) => {
    const { props = {} } = v;
    let valid = true;
    if (!props.images) {
      message.error(`请上传图片`);
      valid = false;
    }

    return valid;
  },
  Title: (v) => {
    const { props = {} } = v;
    let valid = true;
    if (!props.text?.trim()) {
      message.error(`标题不能为空`);
      valid = false;
    }

    return valid;
  },
  QuickEntry: (v) => {
    const { props = {} } = v;
    let valid = true;
    if (!props.tags || !props.tags.length) {
      message.error(`请选择内容控制`);
      valid = false;
    }

    return valid;
  },
  Product: productCheck,
  ProductMc: productCheck,
  ProductSl: productCheck,
};

const validate = (data = {}) => {
  const { comps = [] } = data;
  let r = { valid: true, id: '' };
  for (let c of comps) {
    let _v = validator[c.cid];
    if (_v) {
      r.valid &= _v(c);

      if (!r.valid) {
        r.id = c.id;
        return r;
      }
    }
  }

  return r;
};

export default validate;
