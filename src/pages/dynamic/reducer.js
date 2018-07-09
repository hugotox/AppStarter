import * as constants from './constants';

const initialState = {
  data: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_DATA_DONE: {
      return { ...state, data: action.data.data };
    }
    default:
      return state;
  }
}
