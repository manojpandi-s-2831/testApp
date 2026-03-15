import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ItemSelector from '../molecules/ItemSelector';
import BillItemRow from '../molecules/BillItemRow';
import PriceText from '../atoms/PriceText';
import { useTranslation } from 'react-i18next';

const BillForm = ({ products, billItems, onAddItem, onRemoveItem, onSellPriceChange, grandTotal, totalProfit }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <ItemSelector products={products} onAdd={onAddItem} />
      <TableContainer component={Paper} elevation={0} sx={{ mt: 2, borderRadius: '14px', bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('billing.sno')}</TableCell>
              <TableCell>{t('billing.category')}</TableCell>
              <TableCell>{t('billing.item')}</TableCell>
              <TableCell align="center">{t('billing.qty')}</TableCell>
              <TableCell align="right">{t('billing.costPrice')}</TableCell>
              <TableCell align="right">{t('billing.sellPrice')}</TableCell>
              <TableCell align="right">{t('billing.total')}</TableCell>
              <TableCell align="right">{t('billing.profit')}</TableCell>
              <TableCell align="center">{t('billing.remove')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary">{t('common.noData')}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              billItems.map((item, idx) => (
                <BillItemRow key={idx} index={idx} item={item} onRemove={() => onRemoveItem(idx)} onSellPriceChange={onSellPriceChange ? (price) => onSellPriceChange(idx, price) : undefined} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {billItems.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, mt: 2, pr: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">{t('billing.subtotal')}</Typography>
            <PriceText value={grandTotal} variant="h6" />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{t('billing.totalProfit')}</Typography>
            <PriceText value={totalProfit} variant="h6" color="success.main" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BillForm;
