import React, { Component } from 'react'
import Layout from '../src/components/layout'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import loginRequired from '../src/components/auth/hoc/login-required'
import withApollo from '../src/components/apollo/with-apollo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { PUBLIC } from '../src/config/user-types'

class ApolloPage extends Component {
  render () {
    return (
      <Layout>
        <div className="container">
          <h3>Data from apollo:</h3>
          <code><pre>{JSON.stringify(this.props.data)}</pre></code>
        </div>
      </Layout>
    )
  }
}

const fetchApolloData = gql`
{
  allOwners {
    id, name, petSet {id, name}
  }
}
`

const ApolloPageWrapped = withApollo(
  graphql(fetchApolloData)(ApolloPage)
)

export default withRedux(initStore, null)(
  loginRequired([PUBLIC])(ApolloPageWrapped)
)


