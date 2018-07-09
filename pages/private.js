import React, { Component } from 'react';
import Layout from 'components/layout';

class Private extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>This is private content</h1>
        </div>
      </Layout>
    );
  }
}

export default Private;
