import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router from 'next/router';

import * as actions from './actions';
import { LOGOUT, SET_USER } from './constants';

const API_BASE_URL = `${process.env.API_BASE_URL}`;
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

  it('login: should call the login API with the payload and dispatch SET_USER action', () => {
    mock.onPost(`${API_BASE_URL}/login`)
      .reply(200, {
        user: 'I am the user'
      });

    const store = mockStore({});
    const expectedActions = [{
      type: SET_USER,
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

  it('login: should call the whoami API and dispatch SET_USER action', () => {
    mock.onGet(`${API_BASE_URL}/whoami`)
      .reply(200, {
        user: 'I am the user'
      });

    const store = mockStore({});
    const expectedActions = [{
      type: SET_USER,
      user: 'I am the user',
    }];

    const payload = {
      username: 'user',
      password: 'pass'
    };

    return store.dispatch(actions.whoAmI(payload, '/'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('logout: should dispatch the LOGOUT action', () => {
    mock.onGet(`${API_BASE_URL}/logout`)
      .reply(200);

    const store = mockStore({});
    const expectedActions = [{
      type: LOGOUT
    }];
    store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
