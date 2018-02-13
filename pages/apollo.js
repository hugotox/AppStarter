import React, { Component } from 'react'
import Layout from 'components/layout'
import withRedux from 'next-redux-wrapper'
import initStore from 'initStore'
import loginRequired from 'components/auth/hoc/login-required'
import withApollo from 'components/apollo/with-apollo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from 'components/loading'
import { PUBLIC } from 'config/user-types'

class ApolloPage extends Component {
  render () {
    const {data} = this.props
    return (
      <Layout>
        <div className="container">
          <h3>Data from apollo:</h3>
          {data.loading ?
            <Loading/>
            :
            <code><pre>{JSON.stringify(data)}</pre></code>
          }

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
  loginRequired(ApolloPageWrapped, [PUBLIC])
)


