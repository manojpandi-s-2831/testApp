import { createTheme } from '@mui/material/styles';

/* ── Professional Solid UI Design Tokens ── */
const tokens = {
  light: {
    bg: '#FFFFFF',
    bgPage: '#F8FAFC',
    border: '#E2E8F0',
    borderHover: '#CBD5E1',
    divider: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    shadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    shadowHover: '0 4px 12px rgba(0,0,0,0.08)',
    shadowPressed: '0 1px 2px rgba(0,0,0,0.06)',
  },
  dark: {
    bg: '#1E293B',
    bgPage: '#0F172A',
    border: '#334155',
    borderHover: '#475569',
    divider: '#1E293B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    shadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.12)',
    shadowHover: '0 4px 12px rgba(0,0,0,0.25)',
    shadowPressed: '0 1px 2px rgba(0,0,0,0.15)',
  },
};

const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: 14,
  h4: { fontWeight: 700 },
  h5: { fontWeight: 700 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 600 },
  button: { textTransform: 'none', fontWeight: 600 },
};

const shape = { borderRadius: 10 };

/* Press animation transition shorthand */
const press = 'transform 100ms ease, box-shadow 200ms ease';

const buildComponents = (t) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        overflowX: 'hidden',
      },
      body: {
        background: t.bgPage,
        minHeight: '100vh',
        color: t.textPrimary,
        overflowX: 'hidden',
      },
      '*::-webkit-scrollbar': { width: 6 },
      '*::-webkit-scrollbar-track': { background: 'transparent' },
      '*::-webkit-scrollbar-thumb': { background: t.border, borderRadius: 3 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        background: t.bg,
        borderRadius: 14,
        border: `1px solid ${t.border}`,
        boxShadow: t.shadow,
        transition: `all 200ms cubic-bezier(0.25,0.46,0.45,0.94)`,
        '&:hover': {
          boxShadow: t.shadowHover,
          transform: 'translateY(-1px)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        minHeight: 38,
        fontWeight: 600,
        transition: press,
        '&:active': { transform: 'scale(0.96)' },
      },
      contained: {
        backgroundColor: '#4F46E5',
        boxShadow: 'none',
        color: '#fff',
        '&:hover': { backgroundColor: '#4338CA', boxShadow: '0 2px 8px rgba(79,70,229,0.25)' },
      },
      outlined: {
        borderColor: t.border,
        color: t.textPrimary,
        '&:hover': { borderColor: t.borderHover, background: t.divider },
      },
    },
  },
  MuiTextField: {
    defaultProps: { size: 'small' },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          color: t.textPrimary,
          backgroundColor: t.bg,
          '& fieldset': { borderColor: t.border },
          '&:hover fieldset': { borderColor: t.borderHover },
          '&.Mui-focused fieldset': {
            borderColor: '#4F46E5',
            borderWidth: 2,
            boxShadow: '0 0 0 3px rgba(79,70,229,0.12)',
          },
        },
        '& .MuiInputLabel-root': { color: t.textMuted },
        '& .MuiInputLabel-root.Mui-focused': { color: '#4F46E5' },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: { fontSize: 14, color: t.textPrimary, borderBottom: `1px solid ${t.divider}` },
      head: { color: t.textMuted, fontWeight: 600 },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,
        background: t.bg,
        border: `1px solid ${t.border}`,
        boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: '14px !important',
        background: t.bg,
        border: `1px solid ${t.border}`,
        boxShadow: t.shadow,
        transition: `all 200ms cubic-bezier(0.25,0.46,0.45,0.94)`,
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: '0 0 10px 0' },
        '&:hover': { boxShadow: t.shadowHover },
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { fontWeight: 500, borderRadius: 6 } },
  },
  MuiTab: {
    styleOverrides: { root: { textTransform: 'none', fontWeight: 500, color: t.textMuted } },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: { color: t.textMuted },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        background: t.bg,
        border: `1px solid ${t.border}`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: t.textPrimary,
        '&:hover': { background: t.divider },
        '&.Mui-selected': { background: '#EEF2FF', color: '#4F46E5' },
        '&.Mui-selected:hover': { background: '#E0E7FF' },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        '& .MuiSwitch-track': { backgroundColor: t.border },
      },
    },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: t.divider } },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        background: t.textPrimary,
        color: t.bg,
        fontSize: 12,
        borderRadius: 6,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        border: `1px solid ${t.border}`,
        borderRadius: 10,
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4F46E5' },
    secondary: { main: '#6366F1' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
    success: { main: '#16A34A' },
    warning: { main: '#D97706' },
    error: { main: '#DC2626' },
    info: { main: '#2563EB' },
    divider: '#E2E8F0',
  },
  typography,
  shape,
  components: buildComponents(tokens.light),
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366F1' },
    secondary: { main: '#818CF8' },
    background: { default: '#0F172A', paper: '#1E293B' },
    text: { primary: '#F8FAFC', secondary: '#94A3B8' },
    success: { main: '#4ADE80' },
    warning: { main: '#FBBF24' },
    error: { main: '#F87171' },
    info: { main: '#60A5FA' },
    divider: '#334155',
  },
  typography,
  shape,
  components: buildComponents(tokens.dark),
});

/* Export tokens for direct use in components */
export { tokens };
