export default {
  wrapper: props => ({
    margin: '10px 0',
  }),
  input: props => ({
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    '&:focus': {
      outline: `${props.theme.colors.primary} auto 3px`,
    },
    backgroundColor: props.disabled ? props.theme.colors.lightGray : props.theme.colors.white,
  }),
  label: props => ({
    display: 'block',
    fontFamily: props.theme.fonts.button,
    '& span': {
      color: props.theme.colors.red,
    },
  }),
  error: props => ({
    color: props.theme.colors.red,
    fontSize: '12px',
    fontFamily: props.theme.fonts.primary,
  }),
};
