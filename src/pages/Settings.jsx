import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ConfirmDialog from '../components/atoms/ConfirmDialog';
import useSettings from '../hooks/useSettings';
import useExportImport from '../hooks/useExportImport';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings, toggleTheme, setLanguage } = useSettings();
  const { handleExport, handleImport, handleReset, handleClearBills } = useExportImport();
  const fileRef = useRef();

  const [shopName, setShopName] = useState(settings.shopName);
  const [shopAddress, setShopAddress] = useState(settings.shopAddress || '');
  const [shopPhone, setShopPhone] = useState(settings.shopPhone || '');
  const [shopGST, setShopGST] = useState(settings.shopGST || '');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState('');

  const showSnack = (message, severity = 'success') => setSnack({ open: true, message, severity });

  const handleSaveShop = () => {
    updateSettings({ shopName, shopAddress, shopPhone, shopGST });
    showSnack(t('settings.saved'));
  };

  const onImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await handleImport(file);
      showSnack(t('settings.imported'));
    } catch (err) {
      showSnack(err.message, 'error');
    }
    e.target.value = '';
  };

  const doExport = () => {
    handleExport();
    showSnack(t('settings.exported'));
  };

  const confirmAndDo = (msg, action) => {
    setConfirmMsg(msg);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', fontSize: 22 }}>{t('nav.settings')}</Typography>

      <Card elevation={0} sx={{ mb: 3, borderRadius: '20px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('settings.shopInfo')}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField size="small" label={t('settings.shopName')} value={shopName} onChange={(e) => setShopName(e.target.value)} />
            <TextField size="small" label={t('settings.shopAddress')} value={shopAddress} onChange={(e) => setShopAddress(e.target.value)} multiline rows={2} />
            <TextField size="small" label={t('settings.shopPhone')} value={shopPhone} onChange={(e) => setShopPhone(e.target.value)} />
            <TextField size="small" label={t('settings.shopGST')} value={shopGST} onChange={(e) => setShopGST(e.target.value.toUpperCase())} inputProps={{ maxLength: 15 }} />
            <Button variant="contained" onClick={handleSaveShop} sx={{ alignSelf: 'flex-start' }}>{t('settings.save')}</Button>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ mb: 3, borderRadius: '20px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('settings.dataManagement')}</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={doExport}>{t('settings.exportData')}</Button>
            <Button variant="outlined" startIcon={<UploadIcon />} onClick={() => fileRef.current.click()}>{t('settings.importData')}</Button>
            <input type="file" accept=".json" ref={fileRef} hidden onChange={onImport} />
            <Button variant="outlined" color="warning" startIcon={<RestartAltIcon />} onClick={() => confirmAndDo(t('settings.resetConfirm'), () => { handleReset(); showSnack(t('settings.resetDone')); })}>{t('settings.resetProducts')}</Button>
            <Button variant="outlined" color="error" startIcon={<DeleteSweepIcon />} onClick={() => confirmAndDo(t('settings.clearBillsConfirm'), () => { handleClearBills(); showSnack(t('settings.billsCleared')); })}>{t('settings.clearBills')}</Button>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ mb: 3, borderRadius: '20px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('settings.language')}</Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{t('settings.language')}</InputLabel>
            <Select value={settings.language} label={t('settings.language')} onChange={(e) => { setLanguage(e.target.value); i18n.changeLanguage(e.target.value); }}>
              <MenuItem value="ta">தமிழ்</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">हिन्दी</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>{t('settings.theme')}</Typography>
          <FormControlLabel control={<Switch checked={settings.theme === 'dark'} onChange={toggleTheme} />} label={settings.theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')} />
        </CardContent>
      </Card>

      <ConfirmDialog open={confirmOpen} message={confirmMsg} onConfirm={() => { confirmAction?.(); setConfirmOpen(false); }} onCancel={() => setConfirmOpen(false)} />

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
