import React, { Component } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { verifyToken } from '../actions'
import { SET_TOKEN } from '../constants'
import { PUBLIC } from "../../../config/user-types"

/**
 * Higher order component for Next.js `pages` components.
 * It reads the "x-access-token" cookie and calls the API to verify the token if its the first server
 * render or if it's a page that requires permissions.
 *
 * To make a page public you have to pass PUBLIC user type as an element of the `permissions` parameter.
 * This is required to be able to show current logged in information on the first server render.
 *
 * @param permissions: array of user types required to render this page. User PUBLIC to make the page public.
 * @returns {function(*)}
 */
export default (permissions = []) => {
  return ChildComponent => {
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
        const {isServer, req, res, store} = context
        // public page passes the permission PUBLIC to this function
        const isPublicPage = permissions.indexOf(PUBLIC) !== -1
        // get the token from the cookie
        const token = isServer ? req.cookies['x-access-token'] : Cookies.get('x-access-token')
        // get the copy of the token saved in redux
        const storeToken = store.getState().auth.token
        let result = null

        if (!storeToken) {
          if (token) {
            // if storeToken is null but I do have a cookie token, means this is the first server render so we need
            // to verify this token
            result = await store.dispatch(verifyToken(token))
          } else {
            // no token means anon user
            store.dispatch({
              type: SET_TOKEN,
              username: 'anon',
              token: 'anon'
            })
          }
        }

        // verify token always for protected pages (!isPublic)
        if (!isPublicPage || !storeToken) {
          if (!result) {
            result = await store.dispatch(verifyToken(token))
          }
          if (result.status === 200 && result.data.success) {
            // token is valid. Now verify the required permissions
            if (isPublicPage) {
              this.verificationOk(store, result, token)
            } else {
              const userType = result.data.userType
              let auth = true
              // go here only if we have specific permission requirements
              if (permissions.length > 0) {
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

        if (typeof ChildComponent.getInitialProps === 'function') {
          const initProps = await ChildComponent.getInitialProps(context)
          return initProps
        }

      }

      render() {
        return <ChildComponent {...this.props}/>
      }

    }
  }
}