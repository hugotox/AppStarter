import React, { Component } from 'react'
import Layout from 'components/layout'
import withRedux from 'next-redux-wrapper'
import { compose } from 'redux'
import initStore from 'init-store'
import loginRequired from 'components/auth/login-required'
import withApollo from 'components/with-apollo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from 'components/loading'
import { PUBLIC } from 'components/auth/user-types'

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

export default compose(
  withRedux(initStore),
  withApollo(),
  loginRequired([PUBLIC]),
  graphql(fetchApolloData),
)(ApolloPage)

