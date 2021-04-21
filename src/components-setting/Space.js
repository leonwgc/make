import { Radio } from 'antd';

const Space = {
  props: {
    height: {
      label: '间隔高度',
      type: Radio.Group,
      elProps: {
        options: [
          { label: '10px', value: 10 },
          { label: '20px', value: 20 },
          { label: '30px', value: 30 },
        ],
        defaultValue: 10,
      },
    },
  },
};
export default Space;
