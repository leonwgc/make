import { Input, Switch, Select } from 'antd';
import { getOptions } from '../helper';

const MySelect = {
  props: {
    name: {
      label: 'name',
      tip: '输入框的 name',
      type: Input,
      elProps: {
        defaultValue: () => 'id' + Date.now(),
      },
    },
    label: {
      label: 'label',
      tip: '输入框的 label',
      type: Input,
      elProps: {
        defaultValue: '输入',
      },
    },
    allowClear: {
      label: '支持清除',
      tip: '支持清除',
      type: Switch,
      itemProps: {
        valuePropName: 'checked',
      },
      elProps: {
        defaultValue: true,
      },
    },
    mode: {
      label: 'mode',
      tip: 'multiple | tags',
      type: Select,
      elProps: {
        options: getOptions(['multiple', 'tags']),
        allowClear: true,
      },
    },
    optionLabels: {
      label: '选项',
      tip: '选项和选项值一一对应',
      type: Select,
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: getOptions(['选项1', '选项2']),
        defaultValue: ['选项1', '选项2'],
      },
    },
    optionValues: {
      label: '选项值',
      tip: '选项和选项值一一对应',
      type: Select,
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: getOptions(['选项1的值', '选项2的值']),
        defaultValue: ['选项1的值', '选项2的值'],
      },
    },
  },
  style: {
    cssText: {
      label: 'cssText',
      type: Input.TextArea,
      elProps: {},
      itemProps: {
        tooltip: 'css样式,设置这个了就不用设置下面其他属性',
      },
    },
    margin: {
      label: '外边局',
      type: Input,
      elProps: {
        placeholder: 'margin',
      },
    },
    padding: {
      label: '内边距padding',
      type: Input,
      elProps: {
        placeholder: 'padding',
      },
    },
    width: {
      label: '宽度',
      type: Input,
    },
    height: {
      label: '高度',
      type: Input,
    },
    fontSize: {
      label: '字体大小',
      type: Input,
    },
    color: {
      label: '字体颜色',
      type: Input,
      elProps: {
        type: 'color',
      },
    },
  },
};
export default MySelect;
