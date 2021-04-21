import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
export const Update = 'Update';

// type DesginComoment = {
//   id: string;
//   type: string;
//   props: {
//     [p: string]: any;
//   };
//   styles: {
//     [p: string]: string;
//   };
//   comps: DesginComoment[];
// };

const initstate = {
  comps: [],
  activeComp: null,
};

const app = (state = initstate, action) => {
  let payload = action.payload;
  switch (action.type) {
    case Update: {
      return { ...state, ...payload };
    }
    default:
      return { ...state };
  }
};

export default (history) => combineReducers({ router: connectRouter(history), app });
