import React, { Component } from 'react'
import { mount } from 'enzyme'
import LoginRequired from './login-required'

class DummyComp extends Component {
  render() {
    return (
      <div className="container">Hey, I'm a dummy component</div>
    )
  }
}

it('Can wrap a react component', () => {
  const DummyWrapped = LoginRequired()(DummyComp)
  const wrapper = mount(<DummyWrapped/>)
  expect(wrapper.find('div.container').length).toBe(1)
})

it('Defines a `getInitialProps` static function', () => {
  const DummyWrapped = LoginRequired()(DummyComp)
  expect(typeof DummyWrapped.getInitialProps).toBe('function')
})
