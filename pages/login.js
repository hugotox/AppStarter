import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from 'init-store';
import Layout from 'components/layout';
import { login } from 'components/auth/actions';
import loginRequired from 'components/auth/login-required';
import { PUBLIC } from 'components/auth/user-types';

class Login extends Component {
  static propTypes = {
    url: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { url } = props;
    const { query } = url;
    const next = query.next || '/';
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      next
    };
  }

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  submit = (e) => {
    e.preventDefault();
    this.props.dispatch(login({ ...this.state }, this.state.next));
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" value={this.state.username} onChange={this.updateState} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={this.state.password} onChange={this.updateState} />
            </div>
            <div>
              <label>
                <input type="checkbox" className="checkbox" checked={this.state.rememberMe} onChange={this.toggleRememberMe} />
                Remember me
              </label>
            </div>
            <div>
              <button>Log in</button>
            </div>
          </form>
        </div>
        <style jsx>
          {/* language=CSS */ `
            .checkbox {
              margin-right: 5px;
            }

            label {
              user-select: none;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default withRedux(initStore)(
  loginRequired([PUBLIC])(Login)
);
