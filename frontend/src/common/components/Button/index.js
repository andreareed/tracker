import React, { Component } from 'react';
import { connect } from 'react-fela';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles';

class Button extends Component {
  static propTypes = {
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    noPadding: PropTypes.bool,
    uppercase: PropTypes.bool,
    fontSize: PropTypes.string,
    buttonType: PropTypes.oneOf([
      'primary',
      'secondary',
      'delete',
      'plain',
      'plainLink',
      'icon',
      'iconRight',
      'outline',
      'filter',
      'filterActive',
    ]).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    destructive: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    buttonType: 'primary',
    disabled: false,
  };

  render() {
    const {
      size,
      children,
      styles,
      uppercase,
      buttonType,
      fullWidth,
      noPadding,
      rules,
      className,
      destructive,
      primary,
      stretch,
      ...passthrough
    } = this.props;

    return (
      <button className={classNames(styles.root, className)} {...passthrough}>
        <div className={styles.buttonChildren}>{children}</div>
      </button>
    );
  }
}

export default connect(styles)(Button);
