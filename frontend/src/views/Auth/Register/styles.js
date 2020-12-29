export default {
  wrapper: props => ({
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  form: props => ({
    width: '100%',
    maxWidth: '400px',
  }),
  error: props => ({
    backgroundColor: props.theme.colors.red,
    padding: '12px',
    marginTop: '12px',
    textAlign: 'center',
    color: props.theme.colors.white,
  }),
  link: props => ({
    color: props.theme.colors.primary,
    textDecoration: 'none',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'right',
    paddingTop: '8px',
  }),
};
