import { memo, useState, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryHeader from '../molecules/CategoryHeader';
import ProductTable from './ProductTable';

const CategoryAccordion = memo(({ category, catIdx, onEditCategory, onDeleteCategory, onEditProduct, onDeleteProduct, onAddStock }) => {
  const [expanded, setExpanded] = useState(false);

  const handleEdit = useCallback((itemIdx) => onEditProduct(catIdx, itemIdx), [catIdx, onEditProduct]);
  const handleDelete = useCallback((itemIdx) => onDeleteProduct(catIdx, itemIdx), [catIdx, onDeleteProduct]);
  const handleAddStock = useCallback((itemIdx) => onAddStock(catIdx, itemIdx), [catIdx, onAddStock]);
  const handleEditCat = useCallback(() => onEditCategory(catIdx), [catIdx, onEditCategory]);
  const handleDeleteCat = useCallback(() => onDeleteCategory(catIdx), [catIdx, onDeleteCategory]);

  return (
    <Accordion expanded={expanded} onChange={(_, isExpanded) => setExpanded(isExpanded)} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <CategoryHeader
          categoryName={category.categoryName}
          itemCount={category.items.length}
          onEdit={handleEditCat}
          onDelete={handleDeleteCat}
        />
      </AccordionSummary>
      {expanded && (
        <AccordionDetails sx={{ p: 0 }}>
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
