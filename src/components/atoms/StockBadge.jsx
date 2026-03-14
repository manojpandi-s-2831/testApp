import Chip from '@mui/material/Chip';

const StockBadge = ({ stock }) => {
  let color = 'success';
  if (stock === 0) color = 'error';
  else if (stock <= 10) color = 'warning';

  return (
    <Chip
      label={stock}
      color={color}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 600, minWidth: 48 }}
    />
  );
};

export default StockBadge;
