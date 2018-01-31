import React, { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/modules/layout'
import loginRequired from '../src/modules/auth/hoc/login-required'
import { fetchData } from "../src/pages/index/actions"


class Index extends Component {
  static async getInitialProps({store}) {
    await store.dispatch(fetchData())
  }

  render() {
    return <Layout>
      <div className="container">
        <h1>Yo</h1>
        <h3>Message from the store: {this.props.message}</h3>
        <Link href="/about">
          <a>About us</a>
        </Link>
        <br/>
        <Link href="/private?a=5">
          <a>Private link</a>
        </Link>
        <div>
          FA Test: <i className="fa fa-lock"></i>
        </div>
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
  loginRequired(['public'])(Index)
)