import { message } from 'antd';

export const showError = (msgOrEx) => {
  const t = typeof msgOrEx;
  let msg = msgOrEx;
  if (t === 'object' && msgOrEx && msgOrEx.message) {
    msg = msgOrEx.message;
  }
  message.error(msg);
};

export const showSuccess = (msg) => {
  message.success(msg);
};
