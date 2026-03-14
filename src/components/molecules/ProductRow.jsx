import { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PriceText from '../atoms/PriceText';
import StockBadge from '../atoms/StockBadge';
import { useTranslation } from 'react-i18next';

const ProductRow = memo(({ item, onEdit, onDelete, onAddStock }) => {
  const { t } = useTranslation();
  const profitPerUnit = (item.sellingPrice || 0) - (item.avgCostPrice || 0);

  return (
    <TableRow hover>
      <TableCell>{item.itemName}</TableCell>
      <TableCell align="center"><StockBadge stock={item.stack} /></TableCell>
      <TableCell align="right"><PriceText value={item.buyingPrice} /></TableCell>
      <TableCell align="right"><PriceText value={item.avgCostPrice} /></TableCell>
      <TableCell align="right"><PriceText value={item.sellingPrice} /></TableCell>
      <TableCell align="right">
        <PriceText value={profitPerUnit} color={profitPerUnit >= 0 ? 'success.main' : 'error.main'} />
      </TableCell>
      <TableCell align="center">
        <Tooltip title={t('products.addStock')}>
          <IconButton size="small" color="primary" onClick={onAddStock}><AddCircleIcon /></IconButton>
        </Tooltip>
        <Tooltip title={t('products.edit')}>
          <IconButton size="small" onClick={onEdit}><EditIcon /></IconButton>
        </Tooltip>
        <Tooltip title={t('products.delete')}>
          <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon /></IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});

export default ProductRow;
