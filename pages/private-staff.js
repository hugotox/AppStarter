import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import { STAFF } from 'components/auth/user-groups';

class PrivateStaff extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>This is private content for staff only</h1>
        </div>
      </Layout>
    );
  }
}

export default connect()(PrivateStaff);
