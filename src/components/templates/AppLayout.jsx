import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
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
import LanguageMenu from '../molecules/LanguageMenu';
import ProfileMenu from '../molecules/ProfileMenu';
import { useTranslation } from 'react-i18next';

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED = 72;

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

  const drawerWidth = isMobile ? DRAWER_WIDTH : (isTablet || collapsed) ? DRAWER_COLLAPSED : DRAWER_WIDTH;
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

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0F172A', color: '#fff' }}>
      <Toolbar sx={{ justifyContent: showText ? 'space-between' : 'center' }}>
        {showText && <Typography variant="subtitle1" noWrap>Menu</Typography>}
        {!isMobile && (
          <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: '#fff' }}>
            {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => showText ? setBillingOpen(!billingOpen) : handleNav(item.children[0].path)}
                sx={{
                  justifyContent: showText ? 'initial' : 'center',
                  bgcolor: isActive(item.path) ? 'rgba(59,130,246,0.15)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: showText ? 40 : 'auto', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {showText && <ListItemText primary={item.label} />}
                {showText && (billingOpen ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />)}
              </ListItemButton>
              {showText && (
                <Collapse in={billingOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        onClick={() => handleNav(child.path)}
                        sx={{
                          pl: 4,
                          bgcolor: location.pathname === child.path ? 'rgba(59,130,246,0.15)' : 'transparent',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                        }}
                      >
                        <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.label} />
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
                bgcolor: isActive(item.path) ? 'rgba(59,130,246,0.15)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff', minWidth: showText ? 40 : 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {showText && <ListItemText primary={item.label} />}
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
          transition: 'width 225ms, margin 225ms',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 600, color: 'primary.main' }}>
            Sai Ram Lace House
          </Typography>
          <LanguageMenu />
          <ProfileMenu />
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: 'width 225ms',
            '& .MuiDrawer-paper': { width: drawerWidth, transition: 'width 225ms', overflowX: 'hidden' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: '64px',
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
