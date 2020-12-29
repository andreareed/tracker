export default {
  root: props => {
    let rootStyle = {
      fontFamily: 'Oswald, sans-serif',
      padding:
        props.size === 'small'
          ? '7px 10px'
          : props.buttonType === 'icon' || props.buttonType === 'plainLink' || props.noPadding
          ? 0
          : '10px 14px',
      minWidth: props.size === 'small' ? 'auto' : props.theme.buttonTypes[props.buttonType || 'primary'].minWidth,
      width: props.stretch ? '100%' : 'inherit',
      backgroundColor: props.theme.buttonTypes[props.buttonType || 'primary'].backgroundColor,
      borderRadius: props.theme.globalBorderRadius,
      borderWidth: '1px',
      color: props.theme.buttonTypes[props.buttonType || 'primary'].color,
      border: props.buttonType === 'plain' || props.buttonType === 'plainLink' ? 0 : '2px solid transparent',
      borderColor: props.theme.buttonTypes[props.buttonType || 'primary'].borderColor,
      cursor: props.disabled ? 'auto' : 'pointer',
      transition: props.buttonType === 'icon' ? 'none' : 'all 100ms',
      position: 'relative',
      flexShrink: 0,
      ':hover': {
        backgroundColor: !props.disabled
          ? props.theme.buttonTypes[props.buttonType || 'primary'].hoverBackgroundColor
          : null,
        color: !props.disabled && props.theme.buttonTypes[props.buttonType || 'primary'].hoverColor,
      },
      ':disabled': {
        backgroundColor:
          props.buttonType === 'plainLink' || props.buttonType === 'plain' ? 'transparent' : props.theme.colors.gray300,
        color: props.theme.colors.gray500,
        borderColor: props.theme.colors.gray300,
      },
    };
    if (props.fullWidth) {
      rootStyle = {
        ...rootStyle,
        width: '100%',
      };
    }
    return rootStyle;
  },
  buttonChildren: props => {
    let buttonChildrenStyle = {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
      fontSize: props.fontSize ? props.fontSize : '16px',
      '> svg': {
        height: '22px',
        width: '22px',
        marginRight: props.buttonType === 'icon' || props.buttonType === 'iconRight' ? 0 : '8px',
        marginLeft: props.buttonType === 'iconRight' ? '8px' : 0,
      },
      '> a': {
        color: props.theme.buttonTypes[props.buttonType || 'primary'].color,
      },
      '> span': {
        color: props.theme.buttonTypes[props.buttonType || 'primary'].color,
      },
    };
    if (props.uppercase) {
      buttonChildrenStyle = {
        ...buttonChildrenStyle,
        textTransform: 'uppercase',
        letterSpacing: '.5',
      };
    }
    if (props.destructive) {
      buttonChildrenStyle = {
        ...buttonChildrenStyle,
        color: props.theme.colors.red,
      };
    }
    return buttonChildrenStyle;
  },
};
