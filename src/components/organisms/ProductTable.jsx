import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ProductRow from '../molecules/ProductRow';
import { useTranslation } from 'react-i18next';

const ProductTable = ({ items, onEdit, onDelete, onAddStock }) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) {
    return <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>{t('products.noItems')}</Typography>;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('products.itemName')}</TableCell>
            <TableCell align="center">{t('products.stock')}</TableCell>
            <TableCell align="right">{t('products.buyPrice')}</TableCell>
            <TableCell align="right">{t('products.avgCost')}</TableCell>
            <TableCell align="right">{t('products.salePrice')}</TableCell>
            <TableCell align="right">{t('products.profitPerUnit')}</TableCell>
            <TableCell align="center">{t('products.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <ProductRow
              key={item.itemName}
              item={item}
              onEdit={() => onEdit(idx)}
              onDelete={() => onDelete(idx)}
              onAddStock={() => onAddStock(idx)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
