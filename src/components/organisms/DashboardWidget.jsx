import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import GlassCard from '../atoms/GlassCard';

const DashboardWidget = memo(({ title, data, columns, accent = '#4F46E5' }) => {
  return (
    <GlassCard sx={{ height: '100%', p: 0, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 4, height: 20, borderRadius: 2, background: accent }} />
          <Typography sx={{ fontWeight: 600, fontSize: 16, color: 'text.primary' }}>{title}</Typography>
        </Box>
      </Box>
      {data.length === 0 ? (
        <Typography sx={{ px: 3, pb: 3, color: 'text.disabled', fontSize: 13 }}>No data</Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow sx={{
              '& .MuiTableCell-head': {
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                px: 3,
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.default',
              },
            }}>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || 'left'}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                  transition: 'background 150ms',
                  '& .MuiTableCell-body': {
                    px: 3, py: 1.5,
                    borderBottom: 1,
                    borderColor: 'divider',
                    color: 'text.primary',
                    fontSize: 14,
                  },
                  '&:last-child .MuiTableCell-body': { borderBottom: 'none' },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || 'left'}>{row[col.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </GlassCard>
  );
});

export default DashboardWidget;
