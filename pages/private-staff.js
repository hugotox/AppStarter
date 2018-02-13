import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from 'components/layout'
import initStore from 'initStore'
import loginRequired from 'components/auth/hoc/login-required'
import { STAFF } from "config/user-types"

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
  loginRequired(PrivateStaff, [STAFF])
)
