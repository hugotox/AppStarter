import React, { Component } from 'react';
import Layout from 'components/layout';

class NotFound extends Component {
  render() {
    return (
      <Layout title="About">
        <div className="container">
          <h1>Nothing to see here.</h1>
        </div>
      </Layout>
    );
  }
}

export default NotFound;
