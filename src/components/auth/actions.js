import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {API_BASE_URL} from '../../config/base-url'
import {SET_TOKEN, LOGOUT} from './constants'

export function login(payload, next) {
  return dispatch => {
    return axios.post(`${API_BASE_URL}/api/login`, payload)
      .then(resp => {
        if(resp.status === 200 && resp.data.success) {
          dispatch({
            type: SET_TOKEN,
            token: resp.data.token,
            username: payload.username
          })
          Cookies.set('x-access-token', resp.data.token)
          Router.push(next)
        }
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT})
    Cookies.remove('x-access-token')
    Router.push('/')
  }
}

export function verifyToken(token) {
  return dispatch => {
    return axios.post(`${API_BASE_URL}/api/verify-token`, {token})
  }
}