import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import StoreIcon from '@mui/icons-material/Store';
import useSettings from '../../hooks/useSettings';
import { useTranslation } from 'react-i18next';

const ProfileMenu = () => {
  const { settings, toggleTheme } = useSettings();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Tooltip title={settings.shopName}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: 'text.secondary' }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#4F46E5', border: 2, borderColor: 'divider' }}>
            <StoreIcon fontSize="small" />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { toggleTheme(); setAnchorEl(null); }}>
          <ListItemIcon>
            {settings.theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
          <ListItemText>
            {settings.theme === 'light' ? t('settings.darkMode') : t('settings.lightMode')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
