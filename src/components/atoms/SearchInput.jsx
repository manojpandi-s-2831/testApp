import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchInput = ({ value, onChange, placeholder, sx, ...props }) => {
  const { t } = useTranslation();
  return (
    <TextField
      size="small"
      placeholder={placeholder || t('common.search')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{ minWidth: 250, ...sx }}
      {...props}
    />
  );
};

export default SearchInput;
