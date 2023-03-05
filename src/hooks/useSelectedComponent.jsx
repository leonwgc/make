import React, { useEffect, useState } from 'react';
import { useAppData } from 'simple-redux-store';
import { getActiveComponentById } from '../helper';

export default function useSelectedComponent() {
  const app = useAppData();
  const [comp, setComp] = useState(null);

  useEffect(() => {
    if (app.activeComp) {
      try {
        setComp(getActiveComponentById(app.activeComp, app.comps));
      } catch (ex) {
        setComp(null);
      }
    } else {
      setComp(null);
    }
  }, [app.activeComp]);

  return comp;
}
