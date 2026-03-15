import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GlassCard from '../components/atoms/GlassCard';
import DashboardWidget from '../components/organisms/DashboardWidget';
import useDashboard from '../hooks/useDashboard';
import { useTranslation } from 'react-i18next';

/* Stat tile config: icon, gradient for icon bg, accent, bottom border gradient */
const STAT_CONFIG = [
  { icon: <CategoryIcon sx={{ fontSize: 20, color: '#3B82F6' }} />, bg: 'rgba(59,130,246,0.1)', accent: '#3B82F6' },
  { icon: <Inventory2Icon sx={{ fontSize: 20, color: '#8B5CF6' }} />, bg: 'rgba(139,92,246,0.1)', accent: '#8B5CF6' },
  { icon: <ReceiptLongIcon sx={{ fontSize: 20, color: '#22C55E' }} />, bg: 'rgba(74,222,128,0.1)', accent: '#22C55E' },
  { icon: <CurrencyRupeeIcon sx={{ fontSize: 20, color: '#F59E0B' }} />, bg: 'rgba(251,191,36,0.1)', accent: '#F59E0B' },
];

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
      {/* Row 1 — Greeting */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
            Good morning 👋
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontSize: 28 }}>
            {t('nav.dashboard')}
          </Typography>
        </Box>
        <GlassCard hover={false} sx={{ px: 2, py: 1, borderRadius: '12px' }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </Typography>
        </GlassCard>
      </Box>

      {/* Row 2 — 4 Stat Tiles */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, idx) => {
          const cfg = STAT_CONFIG[idx];
          return (
            <Grid item xs={6} sm={3} key={stat.label}>
              <GlassCard sx={{
                borderRadius: '16px', p: 2.5, position: 'relative', overflow: 'hidden',
                '&::after': {
                  content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                  background: cfg.accent,
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '10px',
                    bgcolor: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {cfg.icon}
                  </Box>
                  <Chip
                    icon={<TrendingUpIcon sx={{ fontSize: '14px !important' }} />}
                    label="+0%"
                    size="small"
                    sx={{
                      height: 22, fontSize: 11, fontWeight: 600,
                      bgcolor: 'rgba(74,222,128,0.15)', color: '#4ADE80',
                      '& .MuiChip-icon': { color: '#4ADE80' },
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500, mb: 0.25 }}>
                  {stat.label}
                </Typography>
                <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: 32, lineHeight: 1.2 }}>
                  {stat.value}
                </Typography>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Row 3 — Widget cards */}
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.mostSelling')} data={mostSelling} columns={sellingCols} accent="#4F46E5" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.leastSelling')} data={leastSelling} columns={sellingCols} accent="#F87171" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.leastStocked')} data={leastStocked} columns={stockCols} accent="#FBBF24" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardWidget title={t('dashboard.mostStocked')} data={mostStocked} columns={stockCols} accent="#4ADE80" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
