import { connect } from 'react-redux';
import { connect as felaConnect } from 'react-fela';
import compose from 'lodash/flowRight';

import styles from './styles';
import Register from './Register';

import { registerUser, resetRegistration } from '../auth-actions.js';

const mapStateToProps = state => ({
  error: state.auth.user.get('error'),
});

const mapDispatchToProps = dispatch => ({
  registerUser: values => dispatch(registerUser(values)),
  resetRegistration: () => dispatch(resetRegistration()),
});

export default compose(felaConnect(styles), connect(mapStateToProps, mapDispatchToProps))(Register);
