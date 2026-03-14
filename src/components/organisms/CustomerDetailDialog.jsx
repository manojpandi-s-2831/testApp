import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Invoice from './Invoice';
import PrintButton from '../atoms/PrintButton';
import { useTranslation } from 'react-i18next';

const CustomerDetailDialog = ({ customer, bills, open, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [invoiceBill, setInvoiceBill] = useState(null);

  if (!customer) return null;

  const totalAmount = bills.reduce((s, b) => s + b.grandTotal, 0);
  const totalProfit = bills.reduce((s, b) => s + b.totalProfit, 0);
  const avgBillValue = bills.length > 0 ? Math.round(totalAmount / bills.length) : 0;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
        <DialogTitle>{customer.name} — {customer.mobile}</DialogTitle>
        <DialogContent>
          {customer.address && (
            <Typography variant="body2" color="text.secondary" gutterBottom>{customer.address}</Typography>
          )}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6} sm={3}>
              <Card elevation={0} sx={{ bgcolor: 'action.hover', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" color="text.secondary">{t('customers.totalBills')}</Typography>
                  <Typography variant="h6">{bills.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={0} sx={{ bgcolor: 'action.hover', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" color="text.secondary">{t('customers.totalAmount')}</Typography>
                  <Typography variant="h6">₹{Math.round(totalAmount).toLocaleString('en-IN')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={0} sx={{ bgcolor: 'action.hover', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" color="text.secondary">{t('reports.totalProfit')}</Typography>
                  <Typography variant="h6" sx={{ color: totalProfit > 0 ? '#22C55E' : '#EF4444' }}>₹{Math.round(totalProfit).toLocaleString('en-IN')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={0} sx={{ bgcolor: 'action.hover', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" color="text.secondary">{t('customers.avgBillValue')}</Typography>
                  <Typography variant="h6">₹{avgBillValue.toLocaleString('en-IN')}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>{t('nav.billHistory')}</Typography>
          {bills.length === 0 ? (
            <Typography color="text.secondary">{t('billing.noBills')}</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={(th) => ({ bgcolor: th.palette.mode === 'dark' ? '#1E293B' : '#F1F5F9' })}>
                    <TableCell>{t('billing.billNo')}</TableCell>
                    <TableCell>{t('billing.date')}</TableCell>
                    <TableCell align="right">{t('billing.itemsCount')}</TableCell>
                    <TableCell align="right">{t('billing.grandTotal')}</TableCell>
                    <TableCell>{t('billing.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bills.map((b) => (
                    <TableRow key={b.id} hover>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>{new Date(b.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{b.items.length}</TableCell>
                      <TableCell align="right">₹{b.grandTotal.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => setInvoiceBill(b)}>{t('billing.view')}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Invoice sub-dialog */}
      <Dialog open={Boolean(invoiceBill)} onClose={() => setInvoiceBill(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <Invoice bill={invoiceBill} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceBill(null)}>{t('common.close')}</Button>
          <PrintButton />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerDetailDialog;
