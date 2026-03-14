import { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import PriceText from '../atoms/PriceText';

const BillItemRow = memo(({ index, item, onRemove, onSellPriceChange }) => {
  return (
    <TableRow hover>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.categoryName}</TableCell>
      <TableCell>{item.itemName}</TableCell>
      <TableCell align="center">{item.quantity}</TableCell>
      <TableCell align="right"><PriceText value={item.costPrice} /></TableCell>
      <TableCell align="right">
        {onSellPriceChange ? (
          <TextField
            type="number"
            size="small"
            value={item.sellingPrice}
            onChange={(e) => onSellPriceChange(Number(e.target.value))}
            inputProps={{ min: 0, step: 1 }}
            sx={{ width: 100 }}
          />
        ) : (
          <PriceText value={item.sellingPrice} />
        )}
      </TableCell>
      <TableCell align="right"><PriceText value={item.total} /></TableCell>
      <TableCell align="right">
        <PriceText value={item.profit} color={item.profit >= 0 ? 'success.main' : 'error.main'} />
      </TableCell>
      <TableCell align="center">
        {onRemove && (
          <IconButton size="small" color="error" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
});

export default BillItemRow;
