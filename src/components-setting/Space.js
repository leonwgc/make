import { Radio } from 'antd';

const Space = {
  props: {
    height: {
      label: '间隔高度',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '小', value: 10 },
          { label: '中', value: 20 },
          { label: '大', value: 30 },
        ],
        defaultValue: 10,
      },
    },
  },
};
export default Space;
