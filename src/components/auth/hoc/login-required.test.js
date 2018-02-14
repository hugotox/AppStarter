import React, { Component } from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Router from 'next/router'
import MockAdapter from 'axios-mock-adapter'
import LoginRequired from './login-required'
import { SET_TOKEN } from '../constants'
import axios from 'axios/index'
import { API_BASE_URL } from '../../../config/base-url'

const mock = new MockAdapter(axios)
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
}

class DummyComp extends Component {
  render() {
    return (
      <div className="container">Hey, I'm a dummy component</div>
    )
  }
}

describe('LoginRequired test', function () {
  afterEach(() => {
    mock.reset()
  })

  it('Can wrap a react component', () => {
    const DummyWrapped = LoginRequired(DummyComp)
    const wrapper = mount(<DummyWrapped/>)
    expect(wrapper.find('div.container').length).toBe(1)
  })

  it('Defines a `getInitialProps` static function', () => {
    const DummyWrapped = LoginRequired(DummyComp)
    expect(typeof DummyWrapped.getInitialProps).toBe('function')

  })

  it('Defines a `verificationOk` static function to dispatch SET_TOKEN action', () => {
    const DummyWrapped = LoginRequired(DummyComp)
    const store = mockStore({})
    const expectedActions = [{
      type: SET_TOKEN,
      token: 'the-token',
      user: 'I am the user',
    }]

    expect(typeof DummyWrapped.verificationOk).toBe('function')
    DummyWrapped.verificationOk(store, {data: {user: 'I am the user'}}, 'the-token')
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should define a `redirectToLogin` static function', function () {
    const DummyWrapped = LoginRequired(DummyComp)
    expect(typeof DummyWrapped.redirectToLogin).toBe('function')

    // server side
    let context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      }
    }
    DummyWrapped.redirectToLogin(context)
    expect(context.res.writeHead).toHaveBeenCalledWith(302, {Location: `/login?next=`})
    expect(context.res.end).toHaveBeenCalled()

    // client side
    context.isServer = false
    DummyWrapped.redirectToLogin(context)
    expect(Router.router.push).toHaveBeenCalledWith('/login?next=')
  })

  it('should define a `redirectTo404` static function', function () {
    const DummyWrapped = LoginRequired(DummyComp)
    expect(typeof DummyWrapped.redirectTo404).toBe('function')

    // server side
    let context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      }
    }
    DummyWrapped.redirectTo404(context)
    expect(context.res.writeHead).toHaveBeenCalledWith(302, {Location: `/notfound`})
    expect(context.res.end).toHaveBeenCalled()

    // client side
    context.isServer = false
    DummyWrapped.redirectTo404(context)
    expect(Router.router.push).toHaveBeenCalledWith('/notfound')
  })

  it('should define a getInitialProps static function: no store token', function () {
    const store = mockStore({
      auth: {
        token: null
      }
    })
    const context = {
      isServer: true,
      req: {
        cookies: {}
      },
      store: store
    }
    const expectedActions = [{
      type: SET_TOKEN,
      token: 'anon',
      user: null
    }]
    mock.onPost(`${API_BASE_URL}/verify-token`)
      .reply(200, {
        user: {
          groups: []
        }
      })

    const DummyWrapped = LoginRequired(DummyComp)
    expect(typeof DummyWrapped.getInitialProps).toBe('function')

    DummyWrapped.getInitialProps(context)

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should define a getInitialProps static function: require permissions', function () {
    const store = mockStore({
      auth: {
        token: null
      }
    })
    const context = {
      isServer: true,
      req: {
        cookies: {
          'x-access-token': 'the-token'
        }
      },
      store: store
    }
    const expectedActions = [{
      type: SET_TOKEN,
      token: 'the-token',
      user: {
        groups: ['STAFF']
      }
    }]
    mock.onPost(`${API_BASE_URL}/verify-token`)
      .reply(200, {
        user: {
          groups: ['STAFF']
        }
      })

    const DummyWrapped = LoginRequired(DummyComp, ['STAFF'])
    expect(typeof DummyWrapped.getInitialProps).toBe('function')

    DummyWrapped.getInitialProps(context)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })

  })

})


