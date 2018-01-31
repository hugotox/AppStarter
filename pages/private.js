import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../src/modules/layout'
import initStore from '../src/store'
import loginRequired from '../src/modules/auth/hoc/login-required'

class Private extends Component {
  render () {
    return (
      <Layout>
        <h1>This is private content</h1>
      </Layout>
    )
  }
}

export default withRedux(initStore)(
  loginRequired(['staff'])(Private)
)
