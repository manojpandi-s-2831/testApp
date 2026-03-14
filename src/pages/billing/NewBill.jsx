import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import BillForm from '../../components/organisms/BillForm';
import Invoice from '../../components/organisms/Invoice';
import PrintButton from '../../components/atoms/PrintButton';
import useBilling from '../../hooks/useBilling';
import useCustomers from '../../hooks/useCustomers';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

const NewBill = () => {
  const { t } = useTranslation();
  const { products } = useContext(ProductContext);
  const {
    billItems, customerName, setCustomerName,
    customerMobile, setCustomerMobile,
    customerAddress, setCustomerAddress,
    gstNumber, setGstNumber,
    addItemToBill, removeItemFromBill, updateSellPrice,
    clearBill, grandTotal, totalProfit, generateBill,
  } = useBilling();
  const { customers } = useCustomers();
  const [invoiceBill, setInvoiceBill] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const isMobileValid = /^\d{10}$/.test(customerMobile);
  const canGenerate = customerName.trim() && isMobileValid && billItems.length > 0;

  const handleCustomerSelect = (_, value) => {
    setSelectedCustomer(value);
    if (value) {
      setCustomerName(value.name);
      setCustomerMobile(value.mobile);
      setCustomerAddress(value.address || '');
    }
  };

  const handleClear = () => {
    clearBill();
    setSelectedCustomer(null);
  };

  const handleGenerate = () => {
    const bill = generateBill();
    if (bill) {
      setInvoiceBill(bill);
      setSnackOpen(true);
      setSelectedCustomer(null);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{t('nav.newBill')}</Typography>

      {/* Customer selector */}
      {customers.length > 0 && (
        <Autocomplete
          size="small"
          options={customers}
          value={selectedCustomer}
          onChange={handleCustomerSelect}
          getOptionLabel={(opt) => `${opt.name} — ${opt.mobile}`}
          isOptionEqualToValue={(opt, val) => opt.mobile === val.mobile}
          renderOption={(props, opt) => (
            <li {...props} key={opt.mobile}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{opt.name}</Typography>
                <Typography variant="caption" color="text.secondary">{opt.mobile}{opt.address ? ` • ${opt.address}` : ''}</Typography>
              </Box>
            </li>
          )}
          renderInput={(params) => <TextField {...params} label={t('billing.selectCustomer')} />}
          sx={{ mb: 2, maxWidth: 500 }}
          noOptionsText={t('common.noData')}
        />
      )}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            fullWidth
            required
            label={t('billing.customerName')}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            error={!customerName.trim() && customerName !== ''}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            fullWidth
            required
            label={t('billing.customerMobile')}
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            error={customerMobile.length > 0 && !isMobileValid}
            helperText={customerMobile.length > 0 && !isMobileValid ? t('billing.mobileHint') : ''}
            inputProps={{ inputMode: 'numeric' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            fullWidth
            label={t('billing.customerAddress')}
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            fullWidth
            label={t('billing.gstNumber')}
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value.toUpperCase().slice(0, 15))}
            inputProps={{ maxLength: 15 }}
          />
        </Grid>
      </Grid>
      <BillForm
        products={products}
        billItems={billItems}
        onAddItem={addItemToBill}
        onRemoveItem={removeItemFromBill}
        onSellPriceChange={updateSellPrice}
        grandTotal={grandTotal}
        totalProfit={totalProfit}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleClear} disabled={billItems.length === 0}>{t('billing.clear')}</Button>
        <Button variant="contained" onClick={handleGenerate} disabled={!canGenerate}>{t('billing.generateBill')}</Button>
      </Box>

      {/* Invoice Dialog */}
      <Dialog open={Boolean(invoiceBill)} onClose={() => setInvoiceBill(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <Invoice bill={invoiceBill} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceBill(null)}>{t('common.close')}</Button>
          <PrintButton />
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" onClose={() => setSnackOpen(false)}>{t('billing.billGenerated')}</Alert>
      </Snackbar>
    </Box>
  );
};

export default NewBill;
