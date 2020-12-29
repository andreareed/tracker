import { connect } from 'react-redux';
import { connect as felaConnect } from 'react-fela';
import compose from 'lodash/flowRight';

import styles from './styles';
import Login from './Login';

import { login, resetLogin } from '../auth-actions';

const mapStateToProps = state => ({
  error: state.auth.user.get('error'),
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(login(values)),
  resetLogin: () => dispatch(resetLogin()),
});

export default compose(felaConnect(styles), connect(mapStateToProps, mapDispatchToProps))(Login);
