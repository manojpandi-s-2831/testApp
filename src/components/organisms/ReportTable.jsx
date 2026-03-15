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

const headerSx = {
  bgcolor: 'background.default',
  '& .MuiTableCell-head': {
    color: 'text.secondary',
    fontWeight: 600,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    px: 2,
    py: 1.5,
    borderBottom: 1,
    borderColor: 'divider',
  },
};

const rowSx = (i) => ({
  minHeight: 54,
  '&:hover': { bgcolor: 'action.hover' },
  transition: 'background 150ms',
  '& .MuiTableCell-body': {
    px: 2,
    py: 1.5,
    borderBottom: 1,
    borderColor: 'divider',
    color: 'text.primary',
    fontVariantNumeric: 'tabular-nums',
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
      sx={{
        borderRadius: '14px',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
      }}
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
              <TableRow key={i} sx={rowSx(i)}>
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
