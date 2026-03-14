import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardWidget from '../components/organisms/DashboardWidget';
import useDashboard from '../hooks/useDashboard';
import { useTranslation } from 'react-i18next';

// Accent colors: categories=blue, items=purple, bills=green, revenue=amber
const STAT_ACCENTS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B'];

const Dashboard = () => {
  const { t } = useTranslation();
  const { totalCategories, totalItems, billsToday, revenueToday, mostSelling, leastSelling, leastStocked, mostStocked } = useDashboard();

  const stats = useMemo(() => [
    { label: t('dashboard.totalCategories'), value: totalCategories },
    { label: t('dashboard.totalItems'), value: totalItems },
    { label: t('dashboard.billsToday'), value: billsToday },
    { label: t('dashboard.revenueToday'), value: `₹${revenueToday.toLocaleString('en-IN')}` },
  ], [t, totalCategories, totalItems, billsToday, revenueToday]);

  const sellingCols = useMemo(() => [
    { key: 'item', label: t('dashboard.item') },
    { key: 'category', label: t('dashboard.category') },
    { key: 'qtySold', label: t('dashboard.qtySold'), align: 'right' },
  ], [t]);

  const stockCols = useMemo(() => [
    { key: 'item', label: t('dashboard.item') },
    { key: 'category', label: t('dashboard.category') },
    { key: 'stock', label: t('dashboard.stock'), align: 'right' },
  ], [t]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>{t('nav.dashboard')}</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Card
              elevation={0}
              sx={(theme) => ({
                borderRadius: '12px',
                borderLeft: `4px solid ${STAT_ACCENTS[idx]}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                bgcolor: theme.palette.mode === 'dark' ? '#334155' : '#FFFFFF',
              })}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, fontWeight: 500 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.mostSelling')} data={mostSelling} columns={sellingCols} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.leastSelling')} data={leastSelling} columns={sellingCols} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.leastStocked')} data={leastStocked} columns={stockCols} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.mostStocked')} data={mostStocked} columns={stockCols} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
