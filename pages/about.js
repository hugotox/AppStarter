import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from 'init-store'
import Layout from 'components/layout'
import { fetchData } from "pages/index/actions"
import loginRequired from 'components/auth/login-required'
import { PUBLIC } from "components/auth/user-types"

class About extends Component {
  static async getInitialProps({store}) {
    await store.dispatch(fetchData())
  }

  render() {
    return <Layout title="About">
      <div className="container">
        <h1>About us: {this.props.message}</h1>
      </div>
    </Layout>
  }
}

function mapStateToProps(state) {
  return {
    message: state.index.message
  }
}

export default withRedux(initStore, mapStateToProps)(
  loginRequired(About, [PUBLIC])
)