import axios from 'axios'
import * as constants from './constants'
import {BASE_URL} from '../utils/constants'

export function fetchData() {
  return dispatch => {
    return axios.get(`${BASE_URL}/static/test.json`)
      .then(resp => {
        if(resp.status === 200) {
          dispatch({
            type: constants.FETCH_DATA_DONE,
            data: resp.data
          })
        }
      })
      .catch(err => console.log(err))
  }
}
