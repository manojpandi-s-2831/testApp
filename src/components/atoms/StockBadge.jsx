import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';

const StockBadge = ({ stock }) => {
  const { t } = useTranslation();

  if (stock === 0) {
    return (
      <Chip
        label={t('products.outOfStock')}
        size="small"
        sx={{ fontWeight: 600, fontSize: 11, bgcolor: '#FEF2F2', color: '#DC2626', border: 'none', minWidth: 80 }}
      />
    );
  }

  const isLow = stock <= 10;
  return (
    <Chip
      label={`${stock} ${t('products.stock')}`}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: 11,
        bgcolor: isLow ? '#FFFBEB' : '#F0FDF4',
        color: isLow ? '#D97706' : '#16A34A',
        border: 'none',
        minWidth: 64,
      }}
    />
  );
};

export default StockBadge;
