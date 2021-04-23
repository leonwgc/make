import React from 'react';
import { Input, Cell } from 'zarm';

export default function MyInput({ title = '文本框', placeholder = '请输入' }) {
  return (
    <Cell title={title}>
      <Input clearable type="text" placeholder={placeholder} />
    </Cell>
  );
}
