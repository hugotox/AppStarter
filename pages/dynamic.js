import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Layout from 'components/layout';
import { fetchData } from 'pages/dynamic/actions';

class Dynamic extends Component {
  static async getInitialProps({ query, reduxStore }) {
    const { id } = query;
    await reduxStore.dispatch(fetchData(id));
  }

  static propTypes = {
    url: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  render() {
    const { id } = this.props.router.query;
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

export default connect(mapStateToProps)(withRouter(Dynamic));
