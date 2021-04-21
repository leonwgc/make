import React, { useEffect, uesState, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveComponentById } from '../helper';

export default function useSelectedComponent() {
  const app = useSelector((state) => state.app);
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
