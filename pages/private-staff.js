import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../src/components/layout'
import initStore from '../src/store'
import loginRequired from '../src/components/auth/hoc/login-required'
import { STAFF } from "../src/config/user-types"

class PrivateStaff extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>This is private content for staff only</h1>
        </div>
      </Layout>
    )
  }
}

export default withRedux(initStore)(
  loginRequired([STAFF])(PrivateStaff)
)
