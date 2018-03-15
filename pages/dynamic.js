import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from 'init-store';
import Layout from 'components/layout';
import withAuth from 'components/auth/with-auth';
import { fetchData } from 'pages/dynamic/actions';
import { PUBLIC } from 'components/auth/user-groups';

class Dynamic extends Component {
  static async getInitialProps({ query, store }) {
    const { id } = query;
    await store.dispatch(fetchData(id));
  }

  static propTypes = {
    url: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const { id } = this.props.url.query;
    return (
      <Layout title="Dynamic page demo">
        <div className="container">
          <h3>This is dynamic content #{id}</h3>
          <pre>{this.props.data}</pre>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dynamic.data
});

export default withRedux(initStore, mapStateToProps)(
  withAuth([PUBLIC])(Dynamic)
);
