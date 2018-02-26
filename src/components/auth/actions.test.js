import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router from 'next/router';

import * as actions from './actions';
import { API_BASE_URL } from '../../config/base-url';
import { LOGOUT, SET_USER } from './constants';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
};


describe('Auth actions test', () => {
  afterEach(() => {
    mock.reset();
  });

  it('login: should call the login API with the payload and dispatch SET_TOKEN action', () => {
    mock.onPost(`${API_BASE_URL}/obtain-token`)
      .reply(200, {
        token: 'the-token',
        user: 'I am the user'
      });

    const store = mockStore({});
    const expectedActions = [{
      type: SET_USER,
      token: 'the-token',
      user: 'I am the user',
    }];

    const payload = {
      username: 'user',
      password: 'pass'
    };

    return store.dispatch(actions.login(payload, '/'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('logout: should dispatch the LOGOUT action', () => {
    const store = mockStore({});
    const expectedActions = [{
      type: LOGOUT
    }];
    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('verifyToken: should call the verify token API', () => {
    mock.onPost(`${API_BASE_URL}/verify-token`)
      .reply(200);
    const store = mockStore({});
    store.dispatch(actions.verifyToken('123token'))
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });
});
