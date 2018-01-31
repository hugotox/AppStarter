import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import {fetchData} from "../src/index/actions"
import loginRequired from '../src/components/auth/login-required'


class About extends Component {
  static async getInitialProps({store}) {
    await store.dispatch(fetchData())
  }

  render() {
    return <Layout>
      <h1>About us: {this.props.message}</h1>
    </Layout>
  }
}

function mapStateToProps(state) {
  return {
    message: state.index.message
  }
}

export default withRedux(initStore, mapStateToProps)(
  loginRequired(['public'])(About)
)