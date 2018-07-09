import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import Head from 'next/head';
import { login } from 'components/auth/actions';
import Layout from 'components/layout';
import { whoAmI } from '../src/components/auth/actions';

class Login extends Component {
  static isPublic = true;

  static propTypes = {
    router: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static async getInitialProps(context) {
    // call whoami in case the user navigates to /login when already logged in
    const { reduxStore, req } = context;
    const isServer = typeof window === 'undefined';
    if (isServer) {
      // happens on page first load
      const { cookie } = req.headers;
      if (cookie) {
        await reduxStore.dispatch(whoAmI(cookie));
      }
    }
  }

  constructor(props) {
    super(props);
    const { router } = props;
    const { query } = router;
    const next = query.next || '/';
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      next
    };
  }

  componentWillMount() {
    const isServer = typeof window === 'undefined';
    const { user } = this.props;
    if (user && !isServer) {
      Router.push('/');
    }
  }

  updateState = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  submit = e => {
    e.preventDefault();
    this.props.dispatch(login({ ...this.state }, this.state.next));
  };

  render() {
    return (
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <div className="container">
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={this.state.username}
                onChange={this.updateState}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.updateState}
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.rememberMe}
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Login));
