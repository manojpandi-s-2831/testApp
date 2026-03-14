import { memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

const DashboardWidget = memo(({ title, data, columns }) => {
  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#E2E8F0'}`,
        height: '100%',
        m: 0,
      })}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{title}</Typography>
        {data.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No data</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow
                sx={(theme) => ({
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
                })}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || 'left'}>{col.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow
                  key={i}
                  sx={(theme) => ({
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? i % 2 === 0 ? '#334155' : '#2D3F55'
                        : i % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    '& .MuiTableCell-body': {
                      px: 2,
                      py: 1.5,
                      borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#E2E8F0'}`,
                    },
                    '&:last-child .MuiTableCell-body': { borderBottom: 'none' },
                  })}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align || 'left'}>{row[col.key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
});

export default DashboardWidget;
