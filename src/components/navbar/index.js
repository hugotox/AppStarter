import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { logout } from "../auth/actions"
import styles from './styles'
import { openDrawer } from '../drawer/actions'

class NavBar extends Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  handleOpenDrawer = () => {
    this.props.dispatch(openDrawer())
  }

  render() {
    const {token, user} = this.props
    return (
      <div className="navbar-wrapper">
        <div className="container">
          <div className="flex-row">
            <div className="menu"></div>
            <div className="flex-row">
              <Link href="/">
                <div className="title">Next.js App Starter</div>
              </Link>
              <div className="links flex-row">
                <div className="link">Hello</div>
                <div className="link"><a>World</a></div>
              </div>
            </div>
            {token && token !== 'anon' ?
              <div className="links flex-row">
                {user && user.first_name && <span className="link">Welcome {user.first_name} </span>}
                <span className="link" onClick={this.handleLogout}> Logout</span>
              </div>
              :
              <Link href="/login">
                <a className="link">Login</a>
              </Link>
            }
            <div className="menu">
              <i className="fa fa-bars" onClick={this.handleOpenDrawer}></i>
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(NavBar)
