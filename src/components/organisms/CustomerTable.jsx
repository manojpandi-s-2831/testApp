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
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '14px', bgcolor: 'background.paper', border: 1, borderColor: 'divider', overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
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
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background 150ms',
                cursor: 'pointer',
                minHeight: 54,
              }}
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
