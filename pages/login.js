import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/store'
import Layout from '../src/components/layout'
import { login } from "../src/components/auth/actions"
import loginRequired from '../src/components/auth/hoc/login-required'
import { PUBLIC } from "../src/config/user-types"

class Login extends Component {
  constructor(props) {
    super(props)
    const {url} = props
    const query = url.query
    const next = query.next || '/'
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      next: next
    }
  }

  updateState = key => e => {
    this.setState({[key]: e.target.value})
  }

  toggleRememberMe = () => {
    this.setState({rememberMe: !this.state.rememberMe})
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
              <label>
                <input type="checkbox" className="checkbox" checked={this.state.rememberMe}
                  onChange={this.toggleRememberMe}
                />
                Remember me
              </label>
            </div>
            <div>
              <button>Log in</button>
            </div>
          </form>
        </div>
        <style jsx>{/*language=CSS*/ `
          .checkbox {
            margin-right: 5px;
          }
          label {
            user-select: none;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRedux(initStore)(
  loginRequired([PUBLIC])(Login)
)
