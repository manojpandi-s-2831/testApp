import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { lightTheme, darkTheme } from './theme';
import { ProductProvider } from './context/ProductContext';
import { BillProvider } from './context/BillContext';
import { CustomerProvider } from './context/CustomerContext';
import { SettingsProvider, SettingsContext } from './context/SettingsContext';
import AppLayout from './components/templates/AppLayout';
import { useContext, lazy, Suspense } from 'react';
import './i18n/index';

// Lazy load each route page for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const NewBill = lazy(() => import('./pages/billing/NewBill'));
const BillHistory = lazy(() => import('./pages/billing/BillHistory'));
const Reports = lazy(() => import('./pages/Reports'));
const Customers = lazy(() => import('./pages/Customers'));
const Settings = lazy(() => import('./pages/Settings'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress />
  </Box>
);

const ThemedApp = () => {
  const { settings } = useContext(SettingsContext);
  const theme = settings.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
            <Route path="/products" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
            <Route path="/billing" element={<Navigate to="/billing/new" replace />} />
            <Route path="/billing/new" element={<Suspense fallback={<PageLoader />}><NewBill /></Suspense>} />
            <Route path="/billing/history" element={<Suspense fallback={<PageLoader />}><BillHistory /></Suspense>} />
            <Route path="/customers" element={<Suspense fallback={<PageLoader />}><Customers /></Suspense>} />
            <Route path="/reports" element={<Suspense fallback={<PageLoader />}><Reports /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <SettingsProvider>
      <ProductProvider>
        <BillProvider>
          <CustomerProvider>
            <ThemedApp />
          </CustomerProvider>
        </BillProvider>
      </ProductProvider>
    </SettingsProvider>
  );
};

export default App;
