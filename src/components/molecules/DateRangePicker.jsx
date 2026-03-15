import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const DateRangePicker = ({ dateRange, onChange, accentColor = '#3B82F6' }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
        mb: 2,
        bgcolor: 'background.default',
        borderRadius: '14px',
        border: 1,
        borderColor: 'divider',
        p: '12px 16px',
      }}
    >
      <ToggleButtonGroup
        value={dateRange.type}
        exclusive
        onChange={(_, val) => val && onChange({ type: val, start: null, end: null })}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontWeight: 500,
            borderColor: 'divider',
            color: 'text.secondary',
            px: 2,
          },
          '& .Mui-selected': {
            bgcolor: `${accentColor}26 !important`,
            color: `${accentColor} !important`,
            borderColor: `${accentColor}66 !important`,
            fontWeight: 600,
          },
        }}
      >
        <ToggleButton value="today">{t('reports.today')}</ToggleButton>
        <ToggleButton value="thisWeek">{t('reports.thisWeek')}</ToggleButton>
        <ToggleButton value="thisMonth">{t('reports.thisMonth')}</ToggleButton>
        <ToggleButton value="custom">{t('reports.custom')}</ToggleButton>
      </ToggleButtonGroup>
      {dateRange.type === 'custom' && (
        <>
          <TextField
            type="date"
            size="small"
            label="Start"
            value={dateRange.start || ''}
            onChange={(e) => onChange({ ...dateRange, start: e.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            type="date"
            size="small"
            label="End"
            value={dateRange.end || ''}
            onChange={(e) => onChange({ ...dateRange, end: e.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </>
      )}
    </Box>
  );
};

export default DateRangePicker;
