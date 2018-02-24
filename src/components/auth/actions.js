import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { API_BASE_URL } from '../../config/base-url'
import { SET_USER, LOGOUT } from './constants'

export function login(payload, next) {
  return dispatch => {
    return axios.post(`${API_BASE_URL}/obtain-token`, payload)
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: SET_USER,
            user: resp.data.user,
          })
          Cookies.set('x-access-token', resp.data.token, {expires: payload.rememberMe ? 365 : undefined})
          Router.push(next)
        }
      })
      .catch(err => err)
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
    return axios.post(`${API_BASE_URL}/verify-token`, {token})
      .then(result => result)
      .catch(err => err)
  }
}