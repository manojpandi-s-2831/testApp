import { memo, useMemo, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CategoryHeader from '../molecules/CategoryHeader';
import ProductTable from './ProductTable';
import { useTranslation } from 'react-i18next';

/* Mini stat card for category summary — solid professional style */
const MiniStat = ({ icon, iconBg, label, value }) => (
  <Box sx={{
    display: 'flex', flexDirection: 'column', gap: 0.25, minWidth: { xs: 'calc(50% - 8px)', sm: 130 }, flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 auto' }, px: 2, py: 1.5,
    bgcolor: 'background.default', borderRadius: '10px', border: 1, borderColor: 'divider',
    transition: 'all 200ms ease',
    boxSizing: 'border-box',
    '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: 11 }}>{label}</Typography>
      <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>
    </Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: 18, lineHeight: 1.2 }}>{value}</Typography>
  </Box>
);

const CategoryAccordion = memo(({ category, catIdx, expandedCat, onToggle, onEditCategory, onDeleteCategory, onEditProduct, onDeleteProduct, onAddStock }) => {
  const { t } = useTranslation();
  const expanded = expandedCat === category.categoryName;

  const handleChange = useCallback((_, isExpanded) => {
    onToggle(isExpanded ? category.categoryName : null);
  }, [category.categoryName, onToggle]);

  const handleEdit = useCallback((itemIdx) => onEditProduct(catIdx, itemIdx), [catIdx, onEditProduct]);
  const handleDelete = useCallback((itemIdx) => onDeleteProduct(catIdx, itemIdx), [catIdx, onDeleteProduct]);
  const handleAddStock = useCallback((itemIdx) => onAddStock(catIdx, itemIdx), [catIdx, onAddStock]);
  const handleEditCat = useCallback(() => onEditCategory(catIdx), [catIdx, onEditCategory]);
  const handleDeleteCat = useCallback(() => onDeleteCategory(catIdx), [catIdx, onDeleteCategory]);

  const stats = useMemo(() => {
    const items = category.items || [];
    const totalItems = items.length;
    const totalStockValue = items.reduce((s, i) => s + (i.stack || 0) * (i.sellingPrice || 0), 0);
    const lowStock = items.filter((i) => i.stack > 0 && i.stack <= 10).length;
    const outOfStock = items.filter((i) => i.stack === 0).length;
    return { totalItems, totalStockValue, lowStock, outOfStock };
  }, [category.items]);

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      disableGutters
      sx={{ '&:active .MuiAccordionSummary-root': { transform: 'scale(0.99)', transition: 'transform 100ms ease' } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary', transition: 'transform 200ms ease' }} />}>
        <CategoryHeader
          categoryName={category.categoryName}
          itemCount={category.items.length}
          onEdit={handleEditCat}
          onDelete={handleDeleteCat}
        />
      </AccordionSummary>
      {expanded && (
        <AccordionDetails sx={{ p: 0 }}>
          {/* Stats row */}
          <Box sx={{ display: 'flex', gap: 1.5, px: 2, py: 1.5, flexWrap: 'wrap', borderBottom: 1, borderColor: 'divider' }}>
            <MiniStat
              icon={<InventoryIcon sx={{ fontSize: 15, color: '#2563EB' }} />}
              iconBg="#EEF2FF"
              label={t('dashboard.totalItems')}
              value={stats.totalItems}
            />
            <MiniStat
              icon={<CurrencyRupeeIcon sx={{ fontSize: 15, color: '#16A34A' }} />}
              iconBg="#F0FDF4"
              label={t('reports.stockValue')}
              value={`₹${stats.totalStockValue.toLocaleString('en-IN')}`}
            />
            <MiniStat
              icon={<WarningAmberIcon sx={{ fontSize: 15, color: '#D97706' }} />}
              iconBg="#FFFBEB"
              label={t('reports.lowStockAlerts')}
              value={stats.lowStock}
            />
            <MiniStat
              icon={<ErrorOutlineIcon sx={{ fontSize: 15, color: '#DC2626' }} />}
              iconBg="#FEF2F2"
              label={t('products.outOfStock')}
              value={stats.outOfStock}
            />
          </Box>
          <ProductTable
            items={category.items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddStock={handleAddStock}
          />
        </AccordionDetails>
      )}
    </Accordion>
  );
});

export default CategoryAccordion;
