import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './actions'
import { API_BASE_URL } from "../../config/base-url"
import { SET_TOKEN } from "./constants";

const mock = new MockAdapter(axios)
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('Auth actions test', () => {

  describe('login action', () => {

    afterEach(() => {
      mock.reset()
      mock.restore()
    })

    it('should call the login API with the payload', () => {

      mock.onPost(`${API_BASE_URL}/obtain-token`)
        .reply(200, {
          token: 'the-token',
          user: 'I am the user'
        })

      const store = mockStore({})
      const expectedActions = [{
        type: SET_TOKEN,
        token: 'the-token',
        user: 'I am the user',
      }]

      const payload = {
        username: 'user',
        password: 'pass'
      }

      return store.dispatch(actions.login(payload, '/'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })

    })

  })

})