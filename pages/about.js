import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import { fetchData } from 'pages/index/actions';

class About extends Component {
  static async getInitialProps({ reduxStore }) {
    await reduxStore.dispatch(fetchData());
  }

  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <Layout title="About">
        <div className="container">
          <h1>About us: {this.props.message}</h1>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.index.message
  };
}

export default connect(mapStateToProps)(About);
