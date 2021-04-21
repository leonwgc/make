import React, { useEffect, uesState, useState } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../stores/actions';

export default function useUpdateStore() {
  const dispatch = useDispatch();

  // partially update redux store
  return (newProps) => {
    update(dispatch)({ ...newProps });
  };
}
