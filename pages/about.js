import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from 'init-store';
import Layout from 'components/layout';
import { fetchData } from 'pages/index/actions';
import withAuth from 'components/auth/with-auth';
import { PUBLIC } from 'components/auth/user-groups';

class About extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchData());
  }

  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    return (
      <Layout title="About">
        <div className="container">
          <h1>About us: {this.props.message}</h1>
        </div>
      </Layout>);
  }
}

function mapStateToProps(state) {
  return {
    message: state.index.message
  };
}

export default withRedux(initStore, mapStateToProps)(
  withAuth([PUBLIC])(About)
);
