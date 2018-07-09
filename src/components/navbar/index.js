import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../auth/actions';
import styles from './styles';
import { openDrawer } from '../drawer/actions';

class NavBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static defaultProps = {
    user: null
  };

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleOpenDrawer = () => {
    this.props.dispatch(openDrawer());
  };

  render() {
    const { user } = this.props;
    return (
      <div className="navbar-wrapper">
        <div className="container">
          <div className="flex-row">
            <div className="menu" />
            <div className="flex-row">
              <Link href="/">
                <div className="title">Next.js App Starter</div>
              </Link>
              <div className="links flex-row">
                <div className="link">Hello</div>
                <div className="link">
                  <a>World</a>
                </div>
              </div>
            </div>
            {user ? (
              <div className="links flex-row">
                {user.first_name && (
                  <span className="link">Welcome {user.first_name} </span>
                )}
                <span className="link" onClick={this.handleLogout}>
                  {' '}
                  Logout
                </span>
              </div>
            ) : (
              <Link href="/login">
                <a className="link">Login</a>
              </Link>
            )}
            <div className="menu">
              <i className="fa fa-bars" onClick={this.handleOpenDrawer} />
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(NavBar);
