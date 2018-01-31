import React, { Component } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import {verifyToken} from '../actions'
import {SET_TOKEN} from '../constants'

export default (permissions = []) => {
  return Component => {
    return class LoginRequired extends Component {

      static async getInitialProps(context) {
        const isPublicPage = permissions.indexOf('public') !== -1
        const {isServer, req, res, store} = context
        const token = isServer ? req.cookies['x-access-token'] : Cookies.get('x-access-token')
        const storeToken = store.getState().auth.token
        if(!isPublicPage || !storeToken) {
          const result = await store.dispatch(verifyToken(token))
          if (result.status === 200 && result.data.success) {
            // verification ok
            store.dispatch({
              type: SET_TOKEN,
              username: result.data.username,
              token
            })
          } else if (!isPublicPage) {
            if (isServer) {
              res.writeHead(302, {Location: `/login?next=${req.originalUrl}`})
              res.end()
            } else {
              Router.push(`/login?next=${context.asPath}`)
            }
          }
        }

        if(typeof Component.getInitialProps === 'function') {
          await Component.getInitialProps(context)
        }

      }

      render() {
        return <Component {...this.props}/>
      }
    }
  }
}