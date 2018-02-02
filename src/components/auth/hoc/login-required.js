import React, { Component } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { verifyToken } from '../actions'
import { SET_TOKEN } from '../constants'
import { PUBLIC } from "../../../config/user-types"

// TODO: case when anon user navigates to staff required page, and logs in with normal user account. Expected: show error

// BUG: if user is not logged in, verify token gets called every page change, because storeToken is null

export default (permissions = []) => {
  return Component => {
    return class LoginRequired extends Component {

      static verificationOk(store, result, token) {
        store.dispatch({
          type: SET_TOKEN,
          username: result.data.username,
          token
        })
      }

      static redirectToLogin(context) {
        const {isServer, req, res} = context
        if (isServer) {
          res.writeHead(302, {Location: `/login?next=${req.originalUrl}`})
          res.end()
        } else {
          Router.push(`/login?next=${context.asPath}`)
        }
      }

      static redirectTo404(context) {
        const {isServer, res} = context
        if (isServer) {
          res.writeHead(302, {Location: `/notfound`})
          res.end()
        } else {
          Router.push(`/notfound`)
        }
      }

      static async getInitialProps(context) {
        const isPublicPage = permissions.indexOf(PUBLIC) !== -1
        const {isServer, req, res, store} = context
        const token = isServer ? req.cookies['x-access-token'] : Cookies.get('x-access-token')
        const storeToken = store.getState().auth.token

        // verify token always for protected pages (!isPublic)
        // OR if the redux store doesn't have the token, meaning this is the first load from server
        if (!isPublicPage || !storeToken) {
          const result = await store.dispatch(verifyToken(token))
          if (result.status === 200 && result.data.success) {
            // token is valid. Now verify the required permissions
            if (isPublicPage) {
              this.verificationOk(store, result, token)
            } else {
              const userType = result.data.userType
              let auth = true
              // go here only if we have specific permission requirements
              if(permissions.length > 0) {
                auth = false  // will let him pass if he has at least one permission
                for (let i = 0, l = permissions.length; i < l; i++) {
                  if (userType === permissions[i]) {
                    auth = true
                    break
                  }
                }
              }
              if (auth) {
                this.verificationOk(store, result, token)
              } else {
                // since user is already logged in (token is valid) but he doesn't meet the
                // required permission, we just show a 404
                this.redirectTo404(context)
              }
            }
          } else if (!isPublicPage) {
            // token expired
            this.redirectToLogin(context)
          }
        }

        if (typeof Component.getInitialProps === 'function') {
          await Component.getInitialProps(context)
        }

      }

      render() {
        return <Component {...this.props}/>
      }

    }
  }
}