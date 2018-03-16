import axios from 'axios'
import * as constants from './constants'

const API_BASE_URL = `${process.env.API_BASE_URL}`

export function fetchData () {
  return dispatch => axios.get(`${API_BASE_URL}/static/test.json`)
    .then(resp => {
      if (resp.status === 200) {
        dispatch({
          type: constants.FETCH_DATA_DONE,
          data: resp.data
        })
      }
    })
    .catch(err => err)
}
