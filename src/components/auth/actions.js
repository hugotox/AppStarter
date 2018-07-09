import axios from 'axios';
import Router from 'next/router';
import { SET_USER, LOGOUT } from './constants';
import { API_BASE_URL } from 'client-config';

export function login(payload, next) {
  return dispatch =>
    axios
      .post(`${API_BASE_URL}/login`, payload)
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: SET_USER,
            user: resp.data.user
          });
          Router.push(next);
        }
      })
      .catch(err => err);
}

export function logout() {
  return dispatch =>
    axios
      .get(`${API_BASE_URL}/logout`)
      .then(resp => {
        if (resp.status === 200) {
          dispatch({ type: LOGOUT });
          Router.push('/');
        }
      })
      .catch(err => err);
}

export function whoAmI(cookie) {
  return dispatch =>
    axios
      .get(`${API_BASE_URL}/whoami`, {
        headers: {
          Accept: 'application/json',
          Cookie: cookie
        },
        withCredentials: true
      })
      .then(response => {
        let user = null;
        if (response.status === 200) {
          user = response.data.user;
          dispatch({
            type: SET_USER,
            user
          });
        }
        return user;
      })
      .catch(err => err);
}
