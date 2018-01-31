import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/modules/layout'
import { login } from "../src/modules/auth/actions"
import loginRequired from '../src/modules/auth/hoc/login-required'

class Login extends Component {
  constructor(props) {
    super(props)
    const {url} = props
    const query = url.query
    const next = query.next || '/'
    this.state = {
      username: '',
      password: '',
      next
    }
  }

  updateState = key => e => {
    this.setState({[key]: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    this.props.dispatch(login({...this.state}, this.state.next))
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <form onSubmit={this.submit}>
            <div>
              <label>Username</label>
              <input type="text" value={this.state.username} onChange={this.updateState('username')}/>
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.updateState('password')}/>
            </div>
            <div>
              <button>Log in</button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default withRedux(initStore)(
  loginRequired(['public'])(Login)
)
