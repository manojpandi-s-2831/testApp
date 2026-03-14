import Chip from '@mui/material/Chip';

const colorMap = {
  active: 'success',
  inStock: 'success',
  delivered: 'success',
  pending: 'warning',
  cancelled: 'error',
  outOfStock: 'error',
  processing: 'info',
  shipped: 'info',
};

const StatusChip = ({ status, label, ...props }) => {
  const color = colorMap[status] || 'default';
  return <Chip label={label || status} color={color} size="small" {...props} />;
};

export default StatusChip;
