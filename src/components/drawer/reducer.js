import { CLOSE_DRAWER, OPEN_DRAWER } from './constants';

const initialState = {
  drawerOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, drawerOpen: true };
    }

    case CLOSE_DRAWER: {
      return { ...state, drawerOpen: false };
    }

    default: {
      return state;
    }
  }
};
