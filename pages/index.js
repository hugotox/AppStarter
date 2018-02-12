import React, { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import loginRequired from '../src/components/auth/hoc/login-required'
import { PUBLIC } from "../src/config/user-types"


class Index extends Component {
  render() {
    return <Layout>
      <div className="container">
        <h3>App Starter</h3>
        <div>
          <Link href="/about">
            <a>Page with dynamic data</a>
          </Link>
        </div>
        <div>
          <Link href="/dynamic?id=1" as="/dynamic/1">
            <a>Page with dynamic URL &amp; data</a>
          </Link>
        </div>
        <div>
          <Link href="/apollo">
            <a>Page with apollo data</a>
          </Link>
        </div>
        <div>
          <Link href="/ui">
            <a>UI examples</a>
          </Link>
        </div>
        <div>
          <Link href="/private">
            <a>Private page</a>
          </Link>
        </div>
        <div>
          <Link href="/private-staff">
            <a>Private page for staff users only</a>
          </Link>
        </div>
      </div>
    </Layout>
  }
}

export default withRedux(initStore)(
  loginRequired([PUBLIC])(Index)
)