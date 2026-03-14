import { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const CustomerTable = memo(({ customers, sortField, sortDir, onSort, onViewCustomer }) => {
  const { t } = useTranslation();

  const createSortHandler = (field) => () => onSort(field);

  const sortableHead = (field, label, align) => (
    <TableCell align={align} sx={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', color: 'text.secondary' }}>
      <TableSortLabel active={sortField === field} direction={sortField === field ? sortDir : 'asc'} onClick={createSortHandler(field)}>
        {label}
      </TableSortLabel>
    </TableCell>
  );

  if (customers.length === 0) {
    return <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>{t('common.noData')}</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={1} sx={{ borderRadius: '12px' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={(theme) => ({ bgcolor: theme.palette.mode === 'dark' ? '#1E293B' : '#F1F5F9' })}>
            {sortableHead('name', t('customers.name'), 'left')}
            <TableCell sx={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', color: 'text.secondary' }}>{t('customers.mobile')}</TableCell>
            {sortableHead('totalBills', t('customers.totalBills'), 'right')}
            {sortableHead('totalAmount', t('customers.totalAmount'), 'right')}
            {sortableHead('lastBillDate', t('customers.lastBillDate'), 'left')}
            <TableCell sx={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', color: 'text.secondary' }}>{t('products.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c, i) => (
            <TableRow
              key={c.mobile}
              hover
              sx={(theme) => ({
                bgcolor: i % 2 === 0
                  ? theme.palette.mode === 'dark' ? '#334155' : '#FFFFFF'
                  : theme.palette.mode === 'dark' ? '#2D3F55' : '#F8FAFC',
                cursor: 'pointer',
                minHeight: 48,
              })}
              onClick={() => onViewCustomer(c)}
            >
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.mobile}</TableCell>
              <TableCell align="right">{c.totalBills}</TableCell>
              <TableCell align="right">₹{c.totalAmount.toLocaleString('en-IN')}</TableCell>
              <TableCell>{c.lastBillDate ? new Date(c.lastBillDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell>
                <Button size="small" onClick={(e) => { e.stopPropagation(); onViewCustomer(c); }}>{t('customers.viewBills')}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

CustomerTable.displayName = 'CustomerTable';
export default CustomerTable;
