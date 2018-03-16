import * as constants from './constants'

const initialState = {
  message: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_DATA_DONE: {
      return { ...state, message: action.data.message }
    }
    default:
      return state
  }
}
