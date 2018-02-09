import React, { Component } from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Router from 'next/router'
import LoginRequired from './login-required'
import { SET_TOKEN } from '../constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
};

class DummyComp extends Component {
  render() {
    return (
      <div className="container">Hey, I'm a dummy component</div>
    )
  }
}

describe('LoginRequired test', function () {
  it('Can wrap a react component', () => {
    const DummyWrapped = LoginRequired()(DummyComp)
    const wrapper = mount(<DummyWrapped/>)
    expect(wrapper.find('div.container').length).toBe(1)
  })

  it('Defines a `getInitialProps` static function', () => {
    const DummyWrapped = LoginRequired()(DummyComp)
    expect(typeof DummyWrapped.getInitialProps).toBe('function')

  })

  it('Defines a `verificationOk` static function to dispatch SET_TOKEN action', () => {
    const DummyWrapped = LoginRequired()(DummyComp)
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
    const DummyWrapped = LoginRequired()(DummyComp)
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

})


