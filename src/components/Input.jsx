import React from 'react';
import { Input as ZarmInput, Cell } from 'zarm';

export default function Input({ title = '文本框', placeholder = '请输入' }) {
  return (
    <Cell title={title}>
      <ZarmInput clearable type="text" placeholder={placeholder} />
    </Cell>
  );
}
