import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import Modal from 'components/modal';

class UIExamples extends Component {
  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <h3>UI Examples</h3>
          <div>
            <button onClick={this.toggleModal}>Open modal</button>
            &nbsp;
            <button className="button-primary" onClick={this.toggleModal}>
              Open modal
            </button>
          </div>
          <div className="box">I&apos;m in a box</div>
          <div>
            FA Test: <i className="fa fa-lock" />
          </div>
        </div>
        <Modal visible={this.state.modalVisible} onClose={this.toggleModal}>
          hello
        </Modal>
      </Layout>
    );
  }
}

export default connect()(UIExamples);
