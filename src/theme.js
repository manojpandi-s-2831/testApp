import { createTheme } from '@mui/material/styles';

const commonPalette = {
  sidebar: '#0F172A',
  success: { main: '#22C55E', contrastText: '#fff' },
  warning: { main: '#EAB308', contrastText: '#fff' },
  error: { main: '#EF4444', contrastText: '#fff' },
  info: { main: '#3B82F6', contrastText: '#fff' },
};

const typography = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 600 },
  button: { textTransform: 'none', fontWeight: 500 },
};

const shape = { borderRadius: 8 };

const components = {
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 12 },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 8, minHeight: 44 },
    },
  },
  MuiTextField: {
    defaultProps: { size: 'small' },
  },
  MuiTableCell: {
    styleOverrides: {
      root: { fontSize: 14 },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6' },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: { primary: '#1E293B', secondary: '#64748B' },
    ...commonPalette,
  },
  typography,
  shape,
  components,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3B82F6' },
    background: {
      default: '#1E293B',
      paper: '#334155',
    },
    text: { primary: '#F1F5F9', secondary: '#94A3B8' },
    ...commonPalette,
  },
  typography,
  shape,
  components,
});
