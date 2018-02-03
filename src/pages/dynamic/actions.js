import axios from 'axios'
import * as constants from './constants'
import { API_BASE_URL } from '../../config/base-url'

export function fetchData(id) {
  return dispatch => {
    return axios.get(`${API_BASE_URL}/static/data-${id}.json`)
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: constants.FETCH_DATA_DONE,
            data: resp.data
          })
        }
      })
      .catch(err => console.log(err))
  }
}
