import { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriceText from '../atoms/PriceText';
import StockBadge from '../atoms/StockBadge';
import { useTranslation } from 'react-i18next';

const cellSx = { px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' };

const ProductRow = memo(({ item, index, onEdit, onDelete, onAddStock }) => {
  const { t } = useTranslation();

  return (
    <TableRow sx={{
      '&:hover': { bgcolor: 'action.hover' },
      '&:hover .action-btns': { opacity: 1 },
      transition: 'background 120ms ease',
    }}>
      {/* Serial number */}
      <TableCell sx={{ ...cellSx, width: 48 }}>
        <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: 13 }}>{index}</Typography>
      </TableCell>
      {/* Item name with icon */}
      <TableCell sx={cellSx}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#EEF2FF', borderRadius: '8px' }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: '#4F46E5' }} />
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontSize: 13 }}>
            {item.itemName}
          </Typography>
        </Box>
      </TableCell>
      {/* Stock status */}
      <TableCell align="center" sx={cellSx}><StockBadge stock={item.stack} /></TableCell>
      {/* Prices */}
      <TableCell align="right" sx={cellSx}><PriceText value={item.buyingPrice} sx={{ color: 'text.primary' }} /></TableCell>
      <TableCell align="right" sx={cellSx}><PriceText value={item.sellingPrice} sx={{ color: 'text.primary' }} /></TableCell>
      <TableCell align="right" sx={cellSx}><PriceText value={item.avgCostPrice} sx={{ color: 'text.secondary' }} /></TableCell>
      {/* Actions */}
      <TableCell align="center" sx={{ ...cellSx, whiteSpace: 'nowrap' }}>
        <Box className="action-btns" sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 150ms ease', display: 'inline-flex', gap: 0.25 }}>
          <Tooltip title={t('products.addStock')}>
            <IconButton size="small" sx={{ color: '#4F46E5', '&:hover': { bgcolor: '#EEF2FF' }, '&:active': { transform: 'scale(0.92)' }, transition: 'transform 80ms ease' }} onClick={onAddStock}><AddCircleIcon sx={{ fontSize: 18 }} /></IconButton>
          </Tooltip>
          <Tooltip title={t('products.edit')}>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover', color: 'text.primary' }, '&:active': { transform: 'scale(0.92)' }, transition: 'transform 80ms ease' }} onClick={onEdit}><EditIcon sx={{ fontSize: 18 }} /></IconButton>
          </Tooltip>
          <Tooltip title={t('products.delete')}>
            <IconButton size="small" sx={{ color: '#DC2626', '&:hover': { bgcolor: '#FEF2F2' }, '&:active': { transform: 'scale(0.92)' }, transition: 'transform 80ms ease' }} onClick={onDelete}><DeleteIcon sx={{ fontSize: 18 }} /></IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
});

export default ProductRow;
