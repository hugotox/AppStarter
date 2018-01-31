import React, { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import {fetchData} from "../src/index/actions"


class About extends Component {
  static async getInitialProps({store}) {
    await store.dispatch(fetchData())
    await new Promise(resolve => {
      setTimeout(resolve, 10000)
    })
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

export default withRedux(initStore, mapStateToProps)(About)