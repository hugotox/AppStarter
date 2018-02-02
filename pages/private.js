import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../src/components/layout'
import initStore from '../src/store'
import loginRequired from '../src/components/auth/hoc/login-required'

class Private extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>This is private content</h1>
        </div>
      </Layout>
    )
  }
}

export default withRedux(initStore)(
  loginRequired()(Private)
)
