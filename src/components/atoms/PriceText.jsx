import Typography from '@mui/material/Typography';

const PriceText = ({ value, variant = 'body2', color, sx, ...props }) => {
  const formatted = typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : '₹0';
  return (
    <Typography variant={variant} color={color} sx={sx} {...props}>
      {formatted}
    </Typography>
  );
};

export default PriceText;
