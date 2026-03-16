import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductRow from '../molecules/ProductRow';
import { useTranslation } from 'react-i18next';

const headCellSx = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'text.disabled',
  py: 1.5,
  px: 2,
  borderBottom: 1,
  borderColor: 'divider',
  whiteSpace: 'nowrap',
};

const ProductTable = ({ items, onEdit, onDelete, onAddStock }) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) {
    return <Typography variant="body2" color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>{t('products.noItems')}</Typography>;
  }

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell sx={{ ...headCellSx, width: 48 }}>#</TableCell>
              <TableCell sx={headCellSx}>{t('products.itemName')}</TableCell>
              <TableCell sx={headCellSx} align="center">{t('products.stock')}</TableCell>
              <TableCell sx={headCellSx} align="right">{t('products.buyPrice')}</TableCell>
              <TableCell sx={headCellSx} align="right">{t('products.salePrice')}</TableCell>
              <TableCell sx={headCellSx} align="right">{t('products.avgCost')}</TableCell>
              <TableCell sx={headCellSx} align="center">{t('products.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <ProductRow
                key={item.itemName}
                item={item}
                index={idx + 1}
                onEdit={() => onEdit(idx)}
                onDelete={() => onDelete(idx)}
                onAddStock={() => onAddStock(idx)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Footer */}
      <Box sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 12 }}>
          {items.length} {t('products.items')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductTable;
