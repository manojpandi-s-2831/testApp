import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import DateRangePicker from '../components/molecules/DateRangePicker';
import ReportTable from '../components/organisms/ReportTable';
import PriceText from '../components/atoms/PriceText';
import useReports from '../hooks/useReports';
import { useTranslation } from 'react-i18next';

// Per-tab accent color mapping from the style guide
const TAB_ACCENTS = [
  { accent: '#3B82F6', headerTint: '#EFF6FF' }, // Sales — blue
  { accent: '#22C55E', headerTint: '#F0FDF4' }, // Profit — green
  { accent: '#F59E0B', headerTint: '#FFFBEB' }, // Inventory — amber
  { accent: '#8B5CF6', headerTint: '#F5F3FF' }, // Category Sales — purple
  { accent: '#EC4899', headerTint: '#FDF2F8' }, // Customer Report — pink
];

// Summary card with colored left border
const SummaryCard = ({ accentColor, children }) => (
  <Card
    elevation={0}
    sx={(theme) => ({
      borderRadius: '12px',
      p: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${accentColor}`,
      bgcolor: theme.palette.mode === 'dark' ? '#334155' : '#FFFFFF',
      height: '100%',
      m: 0,
    })}
  >
    <CardContent sx={{ p: 3 }}>{children}</CardContent>
  </Card>
);

// Currency renderer with green/red coloring
const coloredCurrency = (v) => {
  const rounded = Math.round(v);
  const color = rounded > 0 ? '#22C55E' : '#EF4444';
  return (
    <span style={{ color, fontWeight: 500 }}>
      ₹{rounded.toLocaleString('en-IN')}
    </span>
  );
};

const Reports = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const { dateRange, setDateRange, salesReport, profitReport, inventoryReport, categorySalesReport, lowStockItems, customerReport } = useReports();

  const currentAccent = TAB_ACCENTS[tab];

  const salesCols = useMemo(() => [
    { key: 'date', label: t('reports.date') },
    { key: 'billCount', label: t('reports.billCount'), align: 'right' },
    { key: 'totalSales', label: t('reports.totalSales'), align: 'right', render: coloredCurrency },
  ], [t]);

  const inventoryCols = useMemo(() => [
    { key: 'categoryName', label: t('reports.category') },
    { key: 'totalItems', label: t('reports.totalItems'), align: 'right' },
    { key: 'totalStock', label: t('reports.totalStock'), align: 'right' },
    { key: 'stockValue', label: t('reports.stockValue'), align: 'right', render: (v) => `₹${v.toLocaleString('en-IN')}` },
    { key: 'saleValue', label: t('reports.saleValue'), align: 'right', render: (v) => `₹${v.toLocaleString('en-IN')}` },
  ], [t]);

  const catSalesCols = useMemo(() => [
    { key: 'categoryName', label: t('reports.category') },
    { key: 'unitsSold', label: t('reports.unitsSold'), align: 'right' },
    { key: 'revenue', label: t('reports.revenue'), align: 'right', render: coloredCurrency },
    { key: 'profit', label: t('reports.profit'), align: 'right', render: coloredCurrency },
  ], [t]);

  const lowStockCols = useMemo(() => [
    { key: 'categoryName', label: t('reports.category') },
    { key: 'itemName', label: t('dashboard.item') },
    { key: 'stock', label: t('dashboard.stock'), align: 'right' },
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
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>{t('nav.reports')}</Typography>

      {/* Underline-style tabs with per-tab accent color */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            backgroundColor: currentAccent.accent,
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: 14,
            minHeight: 48,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: currentAccent.accent,
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
          <Grid item xs={12}>
            <ReportTable columns={inventoryCols} data={inventoryReport} />
          </Grid>
          {lowStockItems.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t('reports.lowStockAlerts')}</Typography>
              <ReportTable columns={lowStockCols} data={lowStockItems} />
            </Grid>
          )}
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
