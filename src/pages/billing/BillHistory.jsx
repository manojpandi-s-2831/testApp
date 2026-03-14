import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import BillHistoryTable from '../../components/organisms/BillHistoryTable';
import Invoice from '../../components/organisms/Invoice';
import PrintButton from '../../components/atoms/PrintButton';
import ConfirmDialog from '../../components/atoms/ConfirmDialog';
import useBilling from '../../hooks/useBilling';
import { useTranslation } from 'react-i18next';

const BillHistory = () => {
  const { t } = useTranslation();
  const { bills, deleteBill } = useBilling();
  const [viewBill, setViewBill] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handlePrint = (bill) => {
    setViewBill(bill);
    setTimeout(() => window.print(), 300);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{t('nav.billHistory')}</Typography>
      <BillHistoryTable
        bills={bills}
        onView={setViewBill}
        onPrint={handlePrint}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* View Invoice Dialog */}
      <Dialog open={Boolean(viewBill)} onClose={() => setViewBill(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <Invoice bill={viewBill} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewBill(null)}>{t('common.close')}</Button>
          <PrintButton />
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        message={t('billing.confirmDelete')}
        onConfirm={() => { deleteBill(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  );
};

export default BillHistory;
