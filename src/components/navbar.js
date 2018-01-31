import React, { Component } from 'react'
import Link from 'next/link'
import {connect} from 'react-redux'

const navbarHeight = '50px'

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

        <style jsx>{ //language=CSS
          `
            .navbar-wrapper {
              background-color: #222222;
              color: white;
              height: ${navbarHeight};
            }

            .flex-row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-content: center;
            }

            .title {
              font-size: 22px;
              height: ${navbarHeight};
              cursor: pointer;
              color: #b5b5b5;
              transition: color 200ms;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }

            .title:hover {
              color: white;
            }

            .links {
              margin-left: 20px;
            }

            .link {
              margin-left: 15px;
              padding-top: 5px;
              height: ${navbarHeight};
              display: flex;
              justify-content: center;
              flex-direction: column;
            }

            a.link {
              color: #b5b5b5;
              text-decoration: none;
              transition: color 200ms;
            }

            a.link:hover {
              color: white;
            }

            .menu {
              display: none;
            }

            @media screen and (max-width: 750px){
              .links, .link {
                display: none;
              }

              .flex-row {
                flex-direction: row-reverse;
              }

              .menu {
                display: flex;
                justify-content: center;
                flex-direction: column;
              }
            }

          `}</style>
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
