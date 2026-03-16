import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchInput from '../atoms/SearchInput';
import PriceText from '../atoms/PriceText';
import useDebounce from '../../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const BillHistoryTable = ({ bills, onView, onPrint, onDelete }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => bills.filter((b) => {
    if (!debouncedSearch) return true;
    const term = debouncedSearch.toLowerCase();
    return (
      b.id.toLowerCase().includes(term) ||
      b.customerName.toLowerCase().includes(term) ||
      new Date(b.date).toLocaleDateString().includes(term)
    );
  }), [bills, debouncedSearch]);

  return (
    <Box>
      <SearchInput value={search} onChange={setSearch} sx={{ mb: 2 }} />
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '14px', bgcolor: 'background.paper', border: 1, borderColor: 'divider', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('billing.billNo')}</TableCell>
              <TableCell>{t('billing.date')}</TableCell>
              <TableCell>{t('billing.customer')}</TableCell>
              <TableCell align="center">{t('billing.itemsCount')}</TableCell>
              <TableCell align="right">{t('billing.grandTotal')}</TableCell>
              <TableCell align="center">{t('billing.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary">{t('billing.noBills')}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((bill) => (
                <TableRow key={bill.id} hover>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                  <TableCell>{bill.customerName}</TableCell>
                  <TableCell align="center">{bill.items.length}</TableCell>
                  <TableCell align="right"><PriceText value={bill.grandTotal} /></TableCell>
                  <TableCell align="center">
                    <Tooltip title={t('billing.view')}>
                      <IconButton size="small" onClick={() => onView(bill)}><VisibilityIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={t('billing.print')}>
                      <IconButton size="small" onClick={() => onPrint(bill)}><PrintIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={t('billing.delete')}>
                      <IconButton size="small" color="error" onClick={() => onDelete(bill.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillHistoryTable;
