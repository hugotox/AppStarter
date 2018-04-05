/* global jest describe afterEach it expect */
import React, { Component } from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Router from 'next/router'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios/index'
import withAuth from './with-auth'
import { SET_USER } from './constants'

const API_BASE_URL = `${process.env.API_BASE_URL}`
const mock = new MockAdapter(axios)
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
}

class DummyComp extends Component {
  render () {
    return (
      <div className='container'>Hey, I&apos;m a dummy component</div>
    )
  }
}

describe('withAuth test', () => {
  afterEach(() => {
    mock.reset()
  })

  it('Can wrap a react component', () => {
    const DummyWrapped = withAuth()(DummyComp)
    const wrapper = mount(<DummyWrapped />)
    expect(wrapper.find('div.container').length).toBe(1)
  })

  it('Defines a `userHasPermission` static function (no permission required)', () => {
    const DummyWrapped = withAuth()(DummyComp)
    expect(typeof DummyWrapped.userHasPermission).toBe('function')
    const hasPerm = DummyWrapped.userHasPermission({
      user: {
        groups: []
      }
    })
    expect(hasPerm).toBe(true)
  })

  it('Defines a `userHasPermission` static function (permission failed)', () => {
    const DummyWrapped = withAuth([1])(DummyComp)
    expect(typeof DummyWrapped.userHasPermission).toBe('function')
    const hasPerm = DummyWrapped.userHasPermission({
      groups: [2]
    })
    expect(hasPerm).toBe(false)
  })

  it('Defines a `userHasPermission` static function (permission success)', () => {
    const DummyWrapped = withAuth([1])(DummyComp)
    expect(typeof DummyWrapped.userHasPermission).toBe('function')
    const hasPerm = DummyWrapped.userHasPermission({
      groups: [1]
    })
    expect(hasPerm).toBe(true)
  })

  it('should define a `redirectToLogin` static function', () => {
    const DummyWrapped = withAuth()(DummyComp)
    expect(typeof DummyWrapped.redirectToLogin).toBe('function')

    // server side
    const context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn()
      }
    }
    DummyWrapped.redirectToLogin(context)
    expect(context.res.writeHead).toHaveBeenCalledWith(302, { Location: '/login?next=' })
    expect(context.res.end).toHaveBeenCalled()

    // client side
    context.isServer = false
    DummyWrapped.redirectToLogin(context)
    expect(Router.router.push).toHaveBeenCalledWith('/login?next=')
  })

  it('should define a `redirectTo404` static function', () => {
    const DummyWrapped = withAuth()(DummyComp)
    expect(typeof DummyWrapped.redirectTo404).toBe('function')

    // server side
    const context = {
      isServer: true,
      asPath: '',
      req: {
        originalUrl: ''
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn()
      }
    }
    DummyWrapped.redirectTo404(context)
    expect(context.res.writeHead).toHaveBeenCalledWith(302, { Location: '/notfound' })
    expect(context.res.end).toHaveBeenCalled()

    // client side
    context.isServer = false
    DummyWrapped.redirectTo404(context)
    expect(Router.router.push).toHaveBeenCalledWith('/notfound')
  })

  it('should define a getInitialProps static function', () => {
    const store = mockStore({
      auth: {
      }
    })
    const context = {
      isServer: true,
      req: {
        headers: {
          cookies: {
            'x-access-token': 'the-token'
          }
        }
      },
      res: {
        writeHead: function () {},
        end: function () {}
      },
      store
    }
    const expectedActions = [{
      type: SET_USER,
      user: {
        id: 1,
        groups: ['STAFF']
      }
    }]
    mock.onGet(`${API_BASE_URL}/whoami`)
      .reply(200, {
        user: {
          id: 1,
          groups: ['STAFF']
        }
      })

    const DummyWrapped = withAuth(['STAFF'])(DummyComp)
    expect(typeof DummyWrapped.getInitialProps).toBe('function')

    DummyWrapped.getInitialProps(context)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
