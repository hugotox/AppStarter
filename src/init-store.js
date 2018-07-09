import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import auth from 'components/auth/reducer';
import index from 'pages/index/reducer';
import dynamic from 'pages/dynamic/reducer';
import drawer from 'components/drawer/reducer';

const reducers = combineReducers({
  auth,
  index,
  dynamic,
  drawer
});

export default initialState =>
  createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
