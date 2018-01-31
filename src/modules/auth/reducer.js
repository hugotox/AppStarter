import {SET_TOKEN, LOGOUT} from './constants'

const initialState = {
  token: null,
  username: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {...state, token: action.token, username: action.username}
    }

    case LOGOUT: {
      return initialState
    }

    default: {
      return state
    }
  }
}