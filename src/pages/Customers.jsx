import { useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SearchInput from '../components/atoms/SearchInput';
import CustomerTable from '../components/organisms/CustomerTable';
import CustomerDetailDialog from '../components/organisms/CustomerDetailDialog';
import useCustomers from '../hooks/useCustomers';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();
  const { customers, getBillsForCustomer } = useCustomers();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSort = useCallback((field) => {
    setSortDir((prev) => sortField === field && prev === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  }, [sortField]);

  const filtered = useMemo(() => {
    let list = customers;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.mobile.includes(q));
    }
    return [...list].sort((a, b) => {
      let av = a[sortField], bv = b[sortField];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [customers, search, sortField, sortDir]);

  const selectedBills = useMemo(() => {
    if (!selectedCustomer) return [];
    return getBillsForCustomer(selectedCustomer.mobile);
  }, [selectedCustomer, getBillsForCustomer]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>{t('nav.customers')}</Typography>
        <Chip label={`${customers.length} ${t('customers.customers')}`} size="small" color="primary" variant="outlined" />
      </Box>
      <SearchInput value={search} onChange={setSearch} placeholder={t('customers.search')} sx={{ mb: 2, maxWidth: 400 }} />
      <CustomerTable
        customers={filtered}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
        onViewCustomer={setSelectedCustomer}
      />
      <CustomerDetailDialog
        customer={selectedCustomer}
        bills={selectedBills}
        open={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
      />
    </Box>
  );
};

export default Customers;
