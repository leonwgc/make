import { useState, useEffect } from 'react';
import Sortable from 'sortablejs';

export default function useSort(ref, config) {
  useEffect(() => {
    if (ref.current) {
      let s = Sortable.create(ref.current, config);
      return () => {
        s.destroy();
      };
    }
  }, [config]);
}
