import { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const headerSx = (theme) => ({
  bgcolor: theme.palette.mode === 'dark' ? '#1E293B' : '#F1F5F9',
  '& .MuiTableCell-head': {
    color: theme.palette.mode === 'dark' ? '#94A3B8' : '#475569',
    fontWeight: 600,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    px: 2,
    py: 1.5,
    borderBottom: 'none',
  },
});

const rowSx = (theme, i) => ({
  minHeight: 48,
  bgcolor:
    theme.palette.mode === 'dark'
      ? i % 2 === 0 ? '#334155' : '#2D3F55'
      : i % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
  '& .MuiTableCell-body': {
    px: 2,
    py: 1.5,
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#E2E8F0'}`,
  },
  '&:last-child .MuiTableCell-body': {
    borderBottom: 'none',
  },
});

const ReportTable = memo(({ columns, data, emptyMessage, accentColor }) => {
  const { t } = useTranslation();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={(theme) => ({
        borderRadius: '12px',
        border: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#E2E8F0'}`,
        overflow: 'hidden',
      })}
    >
      <Table>
        <TableHead>
          <TableRow sx={headerSx}>
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align || 'left'}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">{emptyMessage || t('reports.noData')}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow key={i} sx={(theme) => rowSx(theme, i)}>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || 'left'}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ReportTable;
