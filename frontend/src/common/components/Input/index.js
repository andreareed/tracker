import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect as felaConnect } from 'react-fela';
import styles from './styles';

const Input = ({ label, className, required, disabled, validation, styles, ...props }) => (
  <div className={styles.wrapper}>
    {label && (
      <label className={styles.label}>
        {label}
        {required && <span>*</span>}
      </label>
    )}
    <Field className={styles.input} disabled={disabled} {...props} />
    {validation && <div className={styles.error}>{validation}</div>}
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  validation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
};

export default felaConnect(styles)(Input);
