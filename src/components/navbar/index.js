import React, { Component } from 'react'
import Link from 'next/link'
import {connect} from 'react-redux'
import styles from './styles'

class NavBar extends Component {
  render() {
    const {username} = this.props
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
            {username ?
              <div className="link">{username}</div>
              :
              <Link href="/login">
                <a className="link">Login</a>
              </Link>
            }
            <div className="menu">
              <i className="fa fa-bars"></i>
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
    username: state.auth.username
  }
}

export default connect(mapStateToProps)(NavBar)
