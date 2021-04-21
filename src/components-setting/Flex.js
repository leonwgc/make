import { Input, Switch, Select } from 'antd';
import { getOptions } from '../helper';

export const Flex = {
  props: {},
  style: {
    display: {
      label: '容器类型',
      type: Select,
      elProps: {
        defaultValue: 'block',
        options: getOptions(['block', 'flex', 'inline-block', 'inline-flex']),
      },
    },
    justifyContent: {
      label: '水平排列方式',
      tip: '水平排列方式',
      type: Select,
      elProps: {
        options: getOptions([
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ]),
      },
      itemProps: {
        help: '容器类型为flex/inline-flex生效',
      },
    },
    alignItems: {
      label: '垂直排列方式',
      tip: '垂直排列方式',
      type: Select,
      elProps: {
        options: getOptions([
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ]),
      },
      itemProps: {
        help: '容器类型为flex/inline-flex生效',
      },
    },
    flexDirection: {
      label: 'flex方向',
      tip: 'flex方向',
      type: Select,
      elProps: {
        options: getOptions(['row', 'column']),
      },
      itemProps: {
        help: '容器类型为flex/inline-flex生效',
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
      label: '内边距',
      type: Input,
      elProps: {
        placeholder: 'padding',
      },
    },
    width: {
      label: '宽度',
      type: Input,
      elProps: {
        placeholder: '100%',
      },
      itemProps: {
        help: '百分比或px',
      },
    },
    height: {
      label: '高度',
      type: Input,
      itemProps: {
        help: '百分比或px',
      },
    },
    minHeight: {
      label: '最小高度',
      type: Input,
      elProps: {
        defaultValue: '160px',
      },
    },
  },
};

export default Flex;
