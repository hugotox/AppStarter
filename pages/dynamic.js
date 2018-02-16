import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from 'init-store'
import Layout from 'components/layout'
import loginRequired from 'components/auth/login-required'
import { fetchData } from "pages/dynamic/actions"
import { PUBLIC } from "components/auth/user-types"

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
