import { SET_TOKEN, LOGOUT } from './constants'

const initialState = {
  token: null,
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {...state, token: action.token, user: action.user}
    }

    case LOGOUT: {
      return initialState
    }

    default: {
      return state
    }
  }
}