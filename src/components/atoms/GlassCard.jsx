import Box from '@mui/material/Box';

const GlassCard = ({ children, sx, hover = true, ...props }) => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      borderRadius: '14px',
      border: 1,
      borderColor: 'divider',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      p: 2.5,
      transition: 'all 200ms cubic-bezier(0.25,0.46,0.45,0.94)',
      ...(hover && {
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'scale(0.98) translateY(0)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          transition: 'transform 100ms ease',
        },
      }),
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default GlassCard;
