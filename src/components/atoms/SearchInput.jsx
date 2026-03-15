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
              <SearchIcon sx={{ color: 'text.disabled' }} fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        minWidth: 250,
        '& .MuiOutlinedInput-root': {
          bgcolor: 'background.paper',
          borderRadius: '8px',
          '& fieldset': { borderColor: 'divider' },
          '&:hover fieldset': { borderColor: 'text.disabled' },
          '&.Mui-focused fieldset': {
            borderColor: '#4F46E5',
            boxShadow: '0 0 0 3px rgba(79,70,229,0.12)',
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default SearchInput;
