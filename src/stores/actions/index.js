import {Update} from '../reducers';

export const update = dispatch => (data = {}) =>
  dispatch({type: Update, payload: data});
