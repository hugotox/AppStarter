import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import auth from './components/auth/reducer'
import index from './pages/index/reducer'
import dynamic from './pages/dynamic/reducer'

const reducers = combineReducers({
  auth,
  index,
  dynamic
})

export default (initialState) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
