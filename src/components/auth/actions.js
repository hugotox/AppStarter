import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'

export function login(payload, next) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/login', payload)
      .then(resp => {
        if(resp.status === 200 && resp.data.success) {
          Cookies.set('x-access-token', resp.data.token)
          Router.push(next)
        }
      })
  }
}

export function verifyToken(token) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/verify-token', {token})
  }
}