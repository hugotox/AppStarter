import {combineReducers, createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import auth from './modules/auth/reducer'
import index from './pages/index/reducer'

const reducers = combineReducers({
  auth,
  index
})

export default (initialState) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
