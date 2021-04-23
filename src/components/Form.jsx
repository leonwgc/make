import React, { useState } from 'react';
import { Input, Select } from 'zarm';
import FormRender from 'zarm-form-render';

const typeMapping = {
  Input,
  Select,
};

// {type,label,name}
export default function Form({ formList = [] }) {
  const [data, setData] = useState({});
  const layoutData = formList.map((item, idx) => ({
    ...item,
    type: typeMapping[item.type],
  }));

  return <FormRender layoutData={[layoutData]} data={data} setData={setData} />;
}
