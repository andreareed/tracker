import client from '../../client';

export const actionConstants = {
  REGISTER_USER: 'REGISTER_USER',
  LOGIN_USER: 'LOGIN_USER',
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  LOGOUT_USER: 'LOGOUT_USER',
};

export const registerUser = payload => ({
  type: actionConstants.REGISTER_USER,
  promise: client.post('users', payload),
});

export const login = payload => ({
  type: actionConstants.LOGIN_USER,
  promise: client.post('auth/token', payload),
});

export const verifyToken = () => ({
  type: actionConstants.VERIFY_TOKEN,
  promise: client.get('/auth/verify-token'),
});

export const logout = () => ({ type: actionConstants.LOGOUT_USER });
export const resetRegistration = () => ({ type: `${actionConstants.REGISTER_USER}_RESET` });
export const resetLogin = () => ({ type: `${actionConstants.REGISTER_USER}_RESET` });
