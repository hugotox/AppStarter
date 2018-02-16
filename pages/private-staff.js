import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from 'components/layout'
import initStore from 'init-store'
import loginRequired from 'components/auth/login-required'
import { STAFF } from "components/auth/user-types"

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
