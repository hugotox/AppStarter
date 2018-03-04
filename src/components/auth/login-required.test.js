import React, { Component } from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router from 'next/router';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios/index';
import LoginRequired from './login-required';
import { SET_USER } from './constants';
import { API_BASE_URL } from '../../utils/base-url';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
};

class DummyComp extends Component {
  render() {
    return (
      <div className="container">Hey, I&apos;m a dummy component</div>
    );
  }
}

describe('LoginRequired test', () => {
  afterEach(() => {
    mock.reset();
  });

  it('Can wrap a react component', () => {
    const DummyWrapped = LoginRequired()(DummyComp);
    const wrapper = mount(<DummyWrapped />);
    expect(wrapper.find('div.container').length).toBe(1);
  });

  it('Defines a `getInitialProps` static function', () => {
    const DummyWrapped = LoginRequired()(DummyComp);
    expect(typeof DummyWrapped.getInitialProps).toBe('function');
  });

  it('Defines a `userHasPermission` static function (no permission required)', () => {
    const DummyWrapped = LoginRequired()(DummyComp);
    expect(typeof DummyWrapped.userHasPermission).toBe('function');
    let hasPerm = DummyWrapped.userHasPermission({
      user: {
        groups: []
      }
    });
    expect(hasPerm).toBe(true);
  });

  it('Defines a `userHasPermission` static function (permission failed)', () => {
    const DummyWrapped = LoginRequired([1])(DummyComp);
    expect(typeof DummyWrapped.userHasPermission).toBe('function');
    let hasPerm = DummyWrapped.userHasPermission({
      groups: [2]
    });
    expect(hasPerm).toBe(false);
  });

  it('Defines a `userHasPermission` static function (permission success)', () => {
    const DummyWrapped = LoginRequired([1])(DummyComp);
    expect(typeof DummyWrapped.userHasPermission).toBe('function');
    let hasPerm = DummyWrapped.userHasPermission({
      groups: [1]
    });
    expect(hasPerm).toBe(true);
  });

  it('should define a `redirectToLogin` static function', () => {
    const DummyWrapped = LoginRequired()(DummyComp);
    expect(typeof DummyWrapped.redirectToLogin).toBe('function');

    // server side
    const context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      }
    };
    DummyWrapped.redirectToLogin(context);
    expect(context.res.writeHead).toHaveBeenCalledWith(302, { Location: '/login?next=' });
    expect(context.res.end).toHaveBeenCalled();

    // client side
    context.isServer = false;
    DummyWrapped.redirectToLogin(context);
    expect(Router.router.push).toHaveBeenCalledWith('/login?next=');
  });

  it('should define a `redirectTo404` static function', () => {
    const DummyWrapped = LoginRequired()(DummyComp);
    expect(typeof DummyWrapped.redirectTo404).toBe('function');

    // server side
    const context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      }
    };
    DummyWrapped.redirectTo404(context);
    expect(context.res.writeHead).toHaveBeenCalledWith(302, { Location: '/notfound' });
    expect(context.res.end).toHaveBeenCalled();

    // client side
    context.isServer = false;
    DummyWrapped.redirectTo404(context);
    expect(Router.router.push).toHaveBeenCalledWith('/notfound');
  });

  it('should define a getInitialProps static function: require permissions', () => {
    const store = mockStore({
      auth: {
        token: null
      }
    });
    const context = {
      isServer: true,
      req: {
        cookies: {
          'x-access-token': 'the-token'
        }
      },
      store
    };
    const expectedActions = [{
      type: SET_USER,
      user: {
        groups: ['STAFF']
      }
    }];
    mock.onPost(`${API_BASE_URL}/verify-token`)
      .reply(200, {
        user: {
          groups: ['STAFF']
        }
      });

    const DummyWrapped = LoginRequired(['STAFF'])(DummyComp);
    expect(typeof DummyWrapped.getInitialProps).toBe('function');

    DummyWrapped.getInitialProps(context)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
