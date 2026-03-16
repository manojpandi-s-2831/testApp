import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import LanguageMenu from '../molecules/LanguageMenu';
import ProfileMenu from '../molecules/ProfileMenu';
import { useTranslation } from 'react-i18next';

const SIDEBAR_W = 260;
const SIDEBAR_COLLAPSED = 72;
const NAVBAR_H = 64;

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = isMobile ? SIDEBAR_W : (isTablet || collapsed) ? SIDEBAR_COLLAPSED : SIDEBAR_W;
  const showText = !isTablet && !collapsed;

  const navItems = [
    { label: t('nav.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { label: t('nav.products'), icon: <InventoryIcon />, path: '/products' },
    {
      label: t('nav.billing'), icon: <ReceiptIcon />, path: '/billing',
      children: [
        { label: t('nav.newBill'), icon: <AddCircleIcon />, path: '/billing/new' },
        { label: t('nav.billHistory'), icon: <HistoryIcon />, path: '/billing/history' },
      ],
    },
    { label: t('nav.customers'), icon: <PeopleIcon />, path: '/customers' },
    { label: t('nav.reports'), icon: <AssessmentIcon />, path: '/reports' },
    { label: t('nav.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleNav = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  /* ── Professional nav item styles ── */
  const activeSx = {
    bgcolor: '#EEF2FF',
    borderRadius: '10px',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 3,
      height: '60%',
      borderRadius: 2,
      bgcolor: '#4F46E5',
    },
    '&:hover': { bgcolor: '#E0E7FF' },
    '&:active': { transform: 'scale(0.97)', transition: 'transform 120ms ease' },
  };
  const inactiveSx = {
    borderRadius: '10px',
    '&:hover': { bgcolor: 'action.hover' },
    transition: 'all 150ms ease',
    '&:active': { transform: 'scale(0.97)', transition: 'transform 120ms ease' },
  };

  /* ── Sidebar drawer content ── */
  const sidebarContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: showText ? 1.5 : 1,
    }}>
      {/* Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: showText ? 'flex-start' : 'center', gap: 1.5, px: 1, py: 2, mb: 1 }}>
        {showText ? (
          <>
            <Avatar sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#4F46E5' }}>
              <StoreIcon sx={{ fontSize: 20, color: '#fff' }} />
            </Avatar>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: 16, color: 'text.primary', letterSpacing: '-0.02em', flex: 1 }}>
              Sai Ram
            </Typography>
            {!isMobile && (
              <IconButton size="small" onClick={() => setCollapsed(true)} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            )}
          </>
        ) : (
          <IconButton size="small" onClick={() => setCollapsed(false)} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Nav */}
      <List sx={{ flexGrow: 1, px: 0.5, py: 0.5 }}>
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => showText ? setBillingOpen(!billingOpen) : handleNav(item.children[0].path)}
                sx={{
                  justifyContent: showText ? 'initial' : 'center',
                  py: 1, mb: 0.5, mx: 0.5,
                  ...(isActive(item.path) ? activeSx : inactiveSx),
                }}
              >
                <ListItemIcon sx={{ color: isActive(item.path) ? '#4F46E5' : 'text.secondary', minWidth: showText ? 36 : 'auto', justifyContent: 'center', '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                  {item.icon}
                </ListItemIcon>
                {showText && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: isActive(item.path) ? 600 : 500, color: isActive(item.path) ? '#4F46E5' : 'text.secondary' }} />}
                {showText && (billingOpen ? <ExpandLess sx={{ color: 'text.disabled', fontSize: 18 }} /> : <ExpandMore sx={{ color: 'text.disabled', fontSize: 18 }} />)}
              </ListItemButton>
              {showText && (
                <Collapse in={billingOpen} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ pl: 1 }}>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        onClick={() => handleNav(child.path)}
                        sx={{
                          pl: 3, py: 0.75, mb: 0.25, mx: 0.5,
                          ...(location.pathname === child.path ? activeSx : inactiveSx),
                        }}
                      >
                        <ListItemIcon sx={{ color: location.pathname === child.path ? '#4F46E5' : 'text.secondary', minWidth: 32, '& .MuiSvgIcon-root': { fontSize: 18 } }}>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: 13, fontWeight: location.pathname === child.path ? 600 : 500, color: location.pathname === child.path ? '#4F46E5' : 'text.secondary' }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ) : (
            <ListItemButton
              key={item.path}
              onClick={() => handleNav(item.path)}
              sx={{
                justifyContent: showText ? 'initial' : 'center',
                py: 1, mb: 0.5, mx: 0.5,
                ...(isActive(item.path) ? activeSx : inactiveSx),
              }}
            >
              <ListItemIcon sx={{ color: isActive(item.path) ? '#4F46E5' : 'text.secondary', minWidth: showText ? 36 : 'auto', justifyContent: 'center', '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                {item.icon}
              </ListItemIcon>
              {showText && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: isActive(item.path) ? 600 : 500, color: isActive(item.path) ? '#4F46E5' : 'text.secondary' }} />}
            </ListItemButton>
          )
        )}
      </List>

      {/* User section */}
      {showText && (
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 1.5, py: 1.5,
          bgcolor: 'action.hover',
          borderRadius: '10px',
        }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#4F46E5', fontSize: 13 }}>SR</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: 600, color: 'text.primary', fontSize: 13, lineHeight: 1.3 }}>Sai Ram</Typography>
            <Typography noWrap sx={{ color: 'text.disabled', fontSize: 11 }}>Admin</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* ── Content ── */}
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Sidebar ── */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: SIDEBAR_W,
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        ) : (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: sidebarWidth,
            height: '100vh',
            bgcolor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
            overflow: 'auto',
            transition: 'width 225ms',
            zIndex: 50,
          }}>
            {sidebarContent}
          </Box>
        )}

        {/* ── Navbar ── */}
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: isMobile ? 0 : sidebarWidth,
          right: 0,
          height: NAVBAR_H,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          px: 2.5,
          gap: 1.5,
          transition: 'left 225ms',
        }}>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ color: 'text.secondary' }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Page title */}
          <Typography sx={{ fontWeight: 600, fontSize: 18, color: 'text.primary' }}>
            {navItems.find(n => isActive(n.path))?.label || ''}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <TextField
            size="small"
            placeholder={t('common.search') + '...'}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: 140, sm: 240 },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.default',
                borderRadius: '8px',
                fontSize: 14,
                '& fieldset': { borderColor: 'divider' },
                '&:hover fieldset': { borderColor: 'text.disabled' },
              },
            }}
          />

          <LanguageMenu />
          <ProfileMenu />
        </Box>

        {/* ── Main Content Area ── */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: isMobile ? 0 : `${sidebarWidth}px`,
            mt: `${NAVBAR_H}px`,
            p: { xs: 1.5, sm: 2, md: 3 },
            maxWidth: 1400,
            transition: 'margin-left 225ms',
            overflowX: 'hidden',
            width: isMobile ? '100%' : 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
