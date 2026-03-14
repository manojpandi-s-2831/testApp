import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import useSettings from '../../hooks/useSettings';

const languages = [
  { code: 'ta', label: 'தமிழ்' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setLanguage(code);
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Language">
        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={i18n.language === lang.code}
            onClick={() => handleSelect(lang.code)}
          >
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
