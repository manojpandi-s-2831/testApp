import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import useSettings from '../../hooks/useSettings';

const Invoice = ({ bill }) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  if (!bill) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }} className="printable-invoice">
      <Typography variant="h5" align="center" gutterBottom>{settings.shopName}</Typography>
      {settings.shopAddress && (
        <Typography variant="body2" align="center" color="text.secondary">{settings.shopAddress}</Typography>
      )}
      {settings.shopPhone && (
        <Typography variant="body2" align="center" color="text.secondary">{t('invoice.phone')}: {settings.shopPhone}</Typography>
      )}
      {settings.shopGST && (
        <Typography variant="body2" align="center" color="text.secondary">{t('invoice.gst')}: {settings.shopGST}</Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2"><strong>{t('invoice.billNo')}:</strong> {bill.id}</Typography>
          <Typography variant="body2"><strong>{t('invoice.customer')}:</strong> {bill.customerName}</Typography>
          {bill.customerMobile && (
            <Typography variant="body2"><strong>{t('invoice.mobile')}:</strong> {bill.customerMobile}</Typography>
          )}
          {bill.customerAddress && (
            <Typography variant="body2"><strong>{t('invoice.address')}:</strong> {bill.customerAddress}</Typography>
          )}
          {bill.gstNumber && (
            <Typography variant="body2"><strong>{t('invoice.gst')}:</strong> {bill.gstNumber}</Typography>
          )}
        </Box>
        <Box>
          <Typography variant="body2"><strong>{t('invoice.date')}:</strong> {new Date(bill.date).toLocaleDateString()}</Typography>
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('invoice.sno')}</TableCell>
            <TableCell>{t('invoice.item')}</TableCell>
            <TableCell>{t('invoice.category')}</TableCell>
            <TableCell align="center">{t('invoice.qty')}</TableCell>
            <TableCell align="right">{t('invoice.rate')}</TableCell>
            <TableCell align="right">{t('invoice.amount')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bill.items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.itemName}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="right">₹{item.sellingPrice.toLocaleString('en-IN')}</TableCell>
              <TableCell align="right">₹{item.total.toLocaleString('en-IN')}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="right"><strong>{t('invoice.grandTotal')}</strong></TableCell>
            <TableCell align="right"><strong>₹{bill.grandTotal.toLocaleString('en-IN')}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Invoice;
