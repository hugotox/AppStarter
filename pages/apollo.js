import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/';
import withRedux from 'next-redux-wrapper';
import { compose } from 'redux';
import initStore from 'init-store';
import loginRequired from 'components/auth/login-required';
import withApollo from 'components/with-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/loading';
import { PUBLIC } from 'components/auth/user-groups';

const ApolloPage = (props) => {
  const { data } = props;
  return (
    <Layout>
      <div className="container">
        <h3>Data from apollo:</h3>
        {data.loading ?
          <Loading />
          :
          <code>
            {data.allOwners.map(owner => (
              <div key={owner.id}>
                {owner.name}: &nbsp;
                {owner.petSet.map(pet => (
                  <span key={pet.id}>{pet.name} </span>
                ))}
              </div>
            ))}
          </code>
        }
      </div>
    </Layout>
  );
};

ApolloPage.propTypes = {
  data: PropTypes.object.isRequired
};

const fetchApolloData = gql`
{
  allOwners {
    id, name, petSet {id, name}
  }
}
`;

export default compose(
  withRedux(initStore),
  withApollo(),
  loginRequired([PUBLIC]),
  graphql(fetchApolloData),
)(ApolloPage);
