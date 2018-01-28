import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import {verifyToken} from './actions'

export default (permissions = []) => {
  return Component => {
    return class LoginRequired extends Component {
      static async getInitialProps(context) {
        const {isServer, req, res, store} = context
        const token = isServer ? req.cookies['x-access-token'] : Cookies.get('x-access-token')
        const result = await store.dispatch(verifyToken(token))
        if(result.status === 200 && result.data.success) {
          // all good
        } else {
          if(isServer) {
            res.writeHead(302, {Location: `/login?next=${req.originalUrl}`})
            res.end()
          } else {
            Router.push(`/login?next=${context.asPath}`)
          }
        }
      }

      render() {
        return <Component {...this.props}/>
      }
    }
  }
}