import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import loginRequired from '../src/components/auth/hoc/login-required'
import { fetchData } from "../src/pages/dynamic/actions"
import { PUBLIC } from "../src/config/user-types"

class Dynamic extends Component {
  static async getInitialProps({query, store}) {
    const {id} = query
    await store.dispatch(fetchData(id))
  }

  render () {
    const id = this.props.url.query.id
    return (
      <Layout>
        <div className="container">
          <h3>This is dynamic content #{id}</h3>
          <pre>{this.props.data}</pre>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.dynamic.data
  }
}

export default withRedux(initStore, mapStateToProps)(
  loginRequired([PUBLIC])(Dynamic)
)
