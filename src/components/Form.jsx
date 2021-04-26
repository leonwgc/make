import React, { useState } from 'react';
import { Input, Select, Checkbox } from 'zarm';
import FormRender from 'zarm-form-render';

const typeMapping = {
  Input,
  Select,
  Checkbox: Checkbox.Group,
};

export default function Form({ list = [] }) {
  const [data, setData] = useState({});
  const flayout = list.map((item) => {
    const { labels = [], values = [], name, type, label, inputType } = item;
    let props = {};
    if (labels.length) {
      props.items = labels.map((_i, idx) => {
        return { label: _i, value: values[idx] || _i };
      });
    }
    let elProps = {};
    if (type === 'Input') {
      elProps.type = inputType || 'text';
    }

    return {
      name,
      label,
      type: typeMapping[type],
      ...props,
      elProps,
    };
  });
  return <FormRender layoutData={[flayout]} data={data} setData={setData} />;
}
