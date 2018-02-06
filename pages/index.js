import React, { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import loginRequired from '../src/components/auth/hoc/login-required'
import { fetchData } from "../src/pages/index/actions"
import { PUBLIC } from "../src/config/user-types"
import Modal from '../src/components/modal'

class Index extends Component {
  static async getInitialProps({store}) {
    await store.dispatch(fetchData())
  }

  state = {
    modalVisible: false
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  render() {
    return <Layout>
      <div className="container">
        <h3>Message from the store: {this.props.message}</h3>
        <div>
          <Link href="/about">
            <a>About us</a>
          </Link>
        </div>
        <div>
          <Link href="/private">
            <a>Private link</a>
          </Link>
        </div>
        <div>
          <Link href="/private-staff">
            <a>Private link for staff user only</a>
          </Link>
        </div>
        <div>
          <Link href="/dynamic?id=1" as="/dynamic/1">
            <a>Dynamic page 1</a>
          </Link>
        </div>
        <div>
          <Link href="/dynamic?id=2" as="/dynamic/2">
            <a>Dynamic page 2</a>
          </Link>
        </div>
        <div>
          <Link href="/dynamic?id=3" as="/dynamic/3">
            <a>Dynamic page 3</a>
          </Link>
        </div>
        <div>
          <button onClick={this.toggleModal}>Open modal</button>
        </div>
        <div>
          FA Test: <i className="fa fa-lock"></i>
        </div>
      </div>
      <Modal visible={this.state.modalVisible} onClose={this.toggleModal}>
        Hello from a modal
      </Modal>
    </Layout>
  }
}

function mapStateToProps(state) {
  return {
    message: state.index.message
  }
}

export default withRedux(initStore, mapStateToProps)(
  loginRequired([PUBLIC])(Index)
)