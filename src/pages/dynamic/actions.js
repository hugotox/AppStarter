import axios from 'axios';
import { API_BASE_URL } from 'utils/base-url';
import * as constants from './constants';

export function fetchData(id) {
  return dispatch => axios.get(`${API_BASE_URL}/data/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        dispatch({
          type: constants.FETCH_DATA_DONE,
          data: resp.data
        });
      }
    })
    .catch(err => err);
}
