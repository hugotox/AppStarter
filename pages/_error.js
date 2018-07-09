import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';

class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  static propTypes = {
    statusCode: PropTypes.number
  };

  static defaultProps = {
    statusCode: null
  };

  render() {
    return (
      <Layout>
        <div className="container">
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </div>
      </Layout>
    );
  }
}

export default Error;
