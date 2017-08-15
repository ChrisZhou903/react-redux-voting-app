import { replace } from 'react-router-redux'
import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import { BLACK_LIST_TO_FETCH_USER } from '../constants'
import * as actionTypes from '../constants/actionTypes'

export const updateCurrentUserId = id => ({
  type: actionTypes.UPDATE_CURRENT_USER,
  id,
})

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchUserRequest = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_USER,
    endpoint: '/user',
    schema: Schemas.USER,
  },
})

export const fetchUser = () => (dispatch, getState) => {
  const { pathname } = getState().router.location

  if (BLACK_LIST_TO_FETCH_USER.indexOf(pathname) === -1) {
    dispatch(fetchUserRequest())
      .then(({ response }) => {
        const result = response && response.result

        if (result) {
          dispatch(updateCurrentUserId(result))
        }
      })
  }
}

// sign in request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signInRequest = payload => ({
  [CALL_API]: {
    type: actionTypes.SIGNIN,
    endpoint: '/login',
    method: 'POST',
    payload,
    schema: Schemas.USER,
  },
})

export const signIn = payload => dispatch => {
  dispatch(signInRequest(payload))
    .then(({ response }) => {
      const result = response && response.result

      if (result) {
        dispatch(updateCurrentUserId(result))
        dispatch(replace('/'))
      }
    })
}

// sign up request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signUpRequest = payload => ({
  [CALL_API]: {
    type: actionTypes.SIGNUP,
    endpoint: '/register',
    method: 'POST',
    payload,
    schema: Schemas.USER,
  },
})

export const signUp = payload => dispatch => {
  dispatch(signUpRequest(payload))
    .then(({ response }) => {
      const result = response && response.result

      if (result) {
        dispatch(updateCurrentUserId(result))
        dispatch(replace('/'))
      }
    })
}

// logout request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const logoutRequest = () => ({
  [CALL_API]: {
    type: actionTypes.LOGOUT,
    endpoint: '/logout',
  },
})

export const logout = () => dispatch => {
  dispatch(logoutRequest())
    .then(({ type }) => {
      if (type === `${actionTypes.LOGOUT}_SUCCESS`) {
        dispatch(replace('/login'))
      }
    })
}
