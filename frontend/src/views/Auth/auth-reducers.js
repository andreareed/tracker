import { combineReducers } from 'redux';
import store from 'store2';

import getApiReducer, { defaultState } from '../../common/utils/getApiReducer';
import { actionConstants } from './auth-actions';

const { REGISTER_USER, LOGIN_USER, VERIFY_TOKEN, LOGOUT_USER } = actionConstants;

const token = (state = defaultState.set('data', store.get('token') || null), action) => {
  state = getApiReducer(VERIFY_TOKEN)(state, action);

  switch (action.type) {
    case `${REGISTER_USER}_SUCCESS`:
    case `${LOGIN_USER}_SUCCESS`:
      store.set('token', action.json.token);
      state = state.merge({
        loaded: true,
        loading: false,
        data: action.json.token,
      });
      return state;

    case `${VERIFY_TOKEN}_SUCCESS`:
      store.set('token', action.json.token);
      return state;

    default:
      return state;
  }
};

const user = (state = defaultState, action) => {
  state = getApiReducer(REGISTER_USER)(state, action);
  state = getApiReducer(LOGIN_USER)(state, action);
  state = getApiReducer(VERIFY_TOKEN)(state, action);

  switch (action.type) {
    case `${REGISTER_USER}_FAILURE`:
    case `${LOGIN_USER}_FAILURE`:
    case LOGOUT_USER:
      store.clear();
      return state.set('data', null);

    default:
      return state;
  }
};

export default combineReducers({ token, user });
