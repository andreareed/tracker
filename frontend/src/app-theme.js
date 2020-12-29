import chroma from 'chroma-js';

const colors = {
  primary: '#007bff',
  blue: '#007bff',
  red: '#dc3545',
  gray: '#6d757d',
  green: '#29a745',
  yellow: '#ffc009',
  charcoal: '#343A40',
  white: '#fff',
  black: '#000',
  lightGray: '#ddd',
};

const fonts = {
  primary: '"Oswald", sans-serif',
  button: '"Oswald", sans-serif',
};

const breakpoints = {
  small: '@media (min-width: 576px)',
  medium: '@media (min-width: 768px)',
  large: '@media (min-width: 992px)',
  xlarge: '@media (min-width: 1200px)',
};

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  [breakpoints.small]: {
    padding: '24px',
  },
  [breakpoints.medium]: {
    padding: '24px',
    width: '750px',
  },
  [breakpoints.large]: {
    padding: '24px',
    width: '970px',
  },
  [breakpoints.xlarge]: {
    padding: '24px',
    width: '1170px',
  },
};

const buttonTypes = {
  primary: {
    backgroundColor: colors.primary,
    hoverBackgroundColor: chroma(colors.primary)
      .darken()
      .hex(),
    color: colors.white,
    hoverColor: colors.white,
    borderColor: 'transparent',
    minWidth: '110px',
  },
  secondary: {
    backgroundColor: colors.blue,
    hoverBackgroundColor: chroma(colors.blue)
      .darken()
      .hex(),
    color: colors.white,
    hoverColor: colors.white,
    borderColor: 'transparent',
    minWidth: '110px',
  },
  delete: {
    backgroundColor: colors.red,
    hoverBackgroundColor: chroma(colors.red)
      .darken()
      .hex(),
    color: colors.white,
    hoverColor: colors.white,
    borderColor: colors.red,
    minWidth: '110px',
  },
  iconRight: {
    backgroundColor: colors.primary,
    hoverBackgroundColor: chroma(colors.primary)
      .darken()
      .hex(),
    color: colors.white,
    hoverColor: colors.white,
    borderColor: 'transparent',
    minWidth: '130px',
  },
  outline: {
    backgroundColor: colors.white,
    hoverBackgroundColor: colors.gray,
    color: colors.gray,
    hoverColor: colors.white,
    borderColor: colors.gray,
    minWidth: '130px',
  },
  plain: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'transparent',
    color: colors.gray,
    hoverColor: chroma(colors.gray)
      .darken()
      .hex(),
    borderColor: 'transparent',
    minWidth: 0,
  },
  plainLink: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'transparent',
    color: colors.primary,
    hoverColor: chroma(colors.primary)
      .darken()
      .hex(),
    borderColor: 'transparent',
    minWidth: 0,
  },
  filter: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'transparent',
    color: colors.gray,
    hoverColor: chroma(colors.gray)
      .darken()
      .hex(),
    borderColor: colors.gray,
    minWidth: 0,
  },
  filterActive: {
    backgroundColor: colors.blue,
    hoverBackgroundColor: chroma(colors.blue)
      .darken()
      .hex(),
    color: colors.white,
    hoverColor: colors.white,
    borderColor: 'transparent',
    minWidth: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'transparent',
    color: colors.gray,
    hoverColor: chroma(colors.gray)
      .darken()
      .hex(),
    borderColor: 'transparent',
    minWidth: 0,
  },
};

export default {
  breakpoints,
  colors,
  fonts,
  container,
  buttonTypes,
};
