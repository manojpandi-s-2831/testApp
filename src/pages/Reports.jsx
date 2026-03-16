import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SearchIcon from '@mui/icons-material/Search';
import DateRangePicker from '../components/molecules/DateRangePicker';
import ReportTable from '../components/organisms/ReportTable';
import PriceText from '../components/atoms/PriceText';
import useReports from '../hooks/useReports';
import { useTranslation } from 'react-i18next';

// Per-tab accent color mapping
const TAB_ACCENTS = [
  { accent: '#60A5FA', headerTint: 'rgba(59,130,246,0.1)' },   // Sales — blue
  { accent: '#4ADE80', headerTint: 'rgba(74,222,128,0.1)' },   // Profit — green
  { accent: '#FBBF24', headerTint: 'rgba(251,191,36,0.1)' },   // Inventory — amber
  { accent: '#A78BFA', headerTint: 'rgba(139,92,246,0.1)' },   // Category Sales — purple
  { accent: '#F472B6', headerTint: 'rgba(244,114,182,0.1)' },  // Customer Report — pink
];

// Summary card — glass style with colored top border
const SummaryCard = ({ accentColor, children }) => (
  <Box
    sx={{
      borderRadius: '14px',
      bgcolor: 'background.paper',
      border: 1,
      borderColor: 'divider',
      p: 3,
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
      '&::before': {
        content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: accentColor,
      },
      '&:hover': {
        borderColor: 'divider',
        transform: 'translateY(-2px)',
      },
    }}
  >
    {children}
  </Box>
);

// Currency renderer with green/red coloring
const coloredCurrency = (v) => {
  const rounded = Math.round(v);
  const color = rounded > 0 ? '#22C55E' : '#EF4444';
  return (
    <span style={{ color, fontWeight: 500 }}>₹{rounded.toLocaleString('en-IN')}</span>
  );
};

const Reports = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [inventorySearch, setInventorySearch] = useState('');
  const { dateRange, setDateRange, salesReport, profitReport, inventoryReport, inventoryTotals, inventoryDetail, categorySalesReport, customerReport } = useReports();

  const currentAccent = TAB_ACCENTS[tab];

  const salesCols = useMemo(() => [
    { key: 'date', label: t('reports.date') },
    { key: 'billCount', label: t('reports.billCount'), align: 'right' },
    { key: 'totalSales', label: t('reports.totalSales'), align: 'right', render: coloredCurrency },
  ], [t]);

  const catSalesCols = useMemo(() => [
    { key: 'categoryName', label: t('reports.category') },
    { key: 'unitsSold', label: t('reports.unitsSold'), align: 'right' },
    { key: 'revenue', label: t('reports.revenue'), align: 'right', render: coloredCurrency },
    { key: 'profit', label: t('reports.profit'), align: 'right', render: coloredCurrency },
  ], [t]);

  const customerCols = useMemo(() => [
    { key: 'customerName', label: t('customers.name') },
    { key: 'mobile', label: t('customers.mobile') },
    { key: 'totalBills', label: t('customers.totalBills'), align: 'right' },
    { key: 'totalAmount', label: t('customers.totalAmount'), align: 'right', render: coloredCurrency },
    { key: 'totalProfit', label: t('reports.profit'), align: 'right', render: coloredCurrency },
  ], [t]);

  const customerSummaryCols = useMemo(() => [
    { key: 'customerName', label: t('customers.name') },
    { key: 'mobile', label: t('customers.mobile') },
    { key: 'totalBills', label: t('customers.totalBills'), align: 'right' },
    { key: 'totalAmount', label: t('customers.totalAmount'), align: 'right', render: coloredCurrency },
    { key: 'totalProfit', label: t('reports.profit'), align: 'right', render: coloredCurrency },
    { key: 'lastBillDate', label: t('customers.lastBillDate'), render: (v) => v ? new Date(v).toLocaleDateString() : '-' },
  ], [t]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', fontSize: 22 }}>{t('nav.reports')}</Typography>

      {/* Pill tab toggle — scrollable on mobile */}
      <Box sx={{
        borderRadius: '14px',
        bgcolor: 'background.default',
        border: 1,
        borderColor: 'divider',
        p: 0.5,
        mb: 3,
        maxWidth: '100%',
        overflow: 'hidden',
      }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 'auto',
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTabs-scrollButtons': { width: 28, '&.Mui-disabled': { opacity: 0.3 } },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 13,
              minHeight: 36,
              px: 2,
              borderRadius: '10px',
              color: 'text.secondary',
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              '&.Mui-selected': {
                bgcolor: '#4F46E5',
                color: '#fff',
                fontWeight: 600,
              },
            },
          }}
        >
        <Tab label={t('reports.salesReport')} />
        <Tab label={t('reports.profitReport')} />
        <Tab label={t('reports.inventoryReport')} />
        <Tab label={t('reports.categorySales')} />
        <Tab label={t('reports.customerReport')} />
      </Tabs>
      </Box>

      {(tab === 0 || tab === 1 || tab === 3 || tab === 4) && (
        <DateRangePicker dateRange={dateRange} onChange={setDateRange} accentColor={currentAccent.accent} />
      )}

      {/* Sales Report */}
      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ReportTable columns={salesCols} data={salesReport} />
          </Grid>
          <Grid item xs={12}>
            <SummaryCard accentColor={TAB_ACCENTS[0].accent}>
              <Typography variant="body2" color="text.secondary">{t('reports.totalRevenue')}</Typography>
              <PriceText value={salesReport.reduce((s, r) => s + r.totalSales, 0)} variant="h5" color={salesReport.reduce((s, r) => s + r.totalSales, 0) > 0 ? '#22C55E' : '#EF4444'} />
            </SummaryCard>
          </Grid>
        </Grid>
      )}

      {/* Profit Report */}
      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[1].accent}>
              <Typography variant="body2" color="text.secondary">{t('reports.revenue')}</Typography>
              <PriceText value={profitReport.totalRevenue} variant="h6" />
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[1].accent}>
              <Typography variant="body2" color="text.secondary">{t('reports.cost')}</Typography>
              <PriceText value={profitReport.totalCost} variant="h6" />
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[1].accent}>
              <Typography variant="body2" color="text.secondary">{t('reports.profit')}</Typography>
              <PriceText
                value={profitReport.totalProfit}
                variant="h6"
                color={profitReport.totalProfit > 0 ? '#22C55E' : '#EF4444'}
              />
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[1].accent}>
              <Typography variant="body2" color="text.secondary">{t('reports.margin')}</Typography>
              <Typography
                variant="h6"
                sx={{ color: Number(profitReport.margin) > 0 ? '#22C55E' : '#EF4444' }}
              >
                {profitReport.margin}%
              </Typography>
            </SummaryCard>
          </Grid>
        </Grid>
      )}

      {/* Inventory Report */}
      {tab === 2 && (
        <Grid container spacing={3}>
          {/* Summary widgets */}
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[2].accent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CategoryIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">{t('reports.totalCategories') || 'Categories'}</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{inventoryReport.length}</Typography>
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[2].accent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WidgetsIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">{t('reports.totalStock')}</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{inventoryTotals.totalStock.toLocaleString('en-IN')}</Typography>
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[2].accent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <InventoryIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">{t('reports.stockValue')}</Typography>
              </Box>
              <PriceText value={inventoryTotals.totalStockValue} variant="h5" />
            </SummaryCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <SummaryCard accentColor={TAB_ACCENTS[2].accent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SellIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">{t('reports.saleValue')}</Typography>
              </Box>
              <PriceText value={inventoryTotals.totalSaleValue} variant="h5" color="#22C55E" />
            </SummaryCard>
          </Grid>

          {/* Category-wise product breakdown */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('reports.categoryBreakdown')}
              </Typography>
              <TextField
                size="small"
                placeholder={t('products.searchPlaceholder') || 'Search products...'}
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: { xs: 0 }, width: { xs: '100%', sm: 260 } }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {inventoryDetail
                .map((cat) => {
                  const search = inventorySearch.toLowerCase();
                  const filteredItems = search
                    ? cat.items.filter((i) => i.itemName.toLowerCase().includes(search))
                    : cat.items;
                  if (search && filteredItems.length === 0 && !cat.categoryName.toLowerCase().includes(search)) return null;
                  const displayItems = search ? filteredItems : cat.items;
                  const catStockValue = displayItems.reduce((s, i) => s + i.stockValue, 0);
                  const catSaleValue = displayItems.reduce((s, i) => s + i.saleValue, 0);
                  const catTotalStock = displayItems.reduce((s, i) => s + i.stock, 0);
                return (
                  <Accordion
                    key={cat.categoryName}
                    disableGutters
                    sx={{
                      borderRadius: '12px !important',
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                      '&::before': { display: 'none' },
                      overflow: 'hidden',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ px: { xs: 1.5, sm: 2.5 }, py: 1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, width: '100%', flexWrap: 'wrap' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: 13, sm: 15 }, minWidth: 0, flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
                          {cat.categoryName}
                        </Typography>
                        <Chip label={`${displayItems.length} items`} size="small" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 600, fontSize: 11 }} />
                        <Chip label={`Stock: ${catTotalStock}`} size="small" sx={{ bgcolor: '#FFFBEB', color: '#D97706', fontWeight: 600, fontSize: 11 }} />
                        <Box sx={{ ml: { xs: 0, sm: 'auto' }, display: 'flex', gap: { xs: 1.5, sm: 2 }, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                            Stock: <strong>₹{catStockValue.toLocaleString('en-IN')}</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#22C55E', fontSize: { xs: 12, sm: 14 } }}>
                            Sale: <strong>₹{catSaleValue.toLocaleString('en-IN')}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, py: 0 }}>
                      <TableContainer sx={{ overflowX: 'auto' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'background.default' }}>
                              <TableCell sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary', pl: 2.5 }}>#</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>{t('products.itemName')}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>{t('reports.totalStock')}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>{t('products.avgCost') || 'Avg Cost ₹'}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>{t('products.sellingPrice')}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary' }}>{t('reports.stockValue')}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: 'text.secondary', pr: 2.5 }}>{t('reports.saleValue')}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {displayItems.map((item, idx) => (
                              <TableRow key={item.itemName} sx={{ '&:nth-of-type(even)': { bgcolor: 'action.hover' } }}>
                                <TableCell sx={{ pl: 2.5, color: 'text.secondary', fontSize: 13 }}>{idx + 1}</TableCell>
                                <TableCell sx={{ fontWeight: 500, fontSize: 13 }}>{item.itemName}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 13 }}>
                                  <Chip
                                    label={item.stock}
                                    size="small"
                                    sx={{
                                      fontWeight: 600,
                                      fontSize: 12,
                                      bgcolor: item.stock === 0 ? '#FEF2F2' : item.stock <= 5 ? '#FFFBEB' : '#F0FDF4',
                                      color: item.stock === 0 ? '#DC2626' : item.stock <= 5 ? '#D97706' : '#16A34A',
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: 13 }}>₹{item.avgCostPrice.toLocaleString('en-IN')}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 13 }}>₹{item.sellingPrice.toLocaleString('en-IN')}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 13 }}>₹{item.stockValue.toLocaleString('en-IN')}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 13, fontWeight: 500, color: '#22C55E', pr: 2.5 }}>₹{item.saleValue.toLocaleString('en-IN')}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                );
              }).filter(Boolean)}
            </Box>
          </Grid>

        </Grid>
      )}

      {/* Category Sales Report */}
      {tab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ReportTable columns={catSalesCols} data={categorySalesReport} />
          </Grid>
        </Grid>
      )}

      {/* Customer Report */}
      {tab === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('reports.topByAmount')}</Typography>
            <ReportTable columns={customerCols} data={customerReport.topByAmount} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('reports.topByProfit')}</Typography>
            <ReportTable columns={customerCols} data={customerReport.topByProfit} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('reports.customerSummary')}</Typography>
            <ReportTable columns={customerSummaryCols} data={customerReport.all} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Reports;
