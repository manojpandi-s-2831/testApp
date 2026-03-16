import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../components/atoms/SearchInput';
import ConfirmDialog from '../components/atoms/ConfirmDialog';
import CategoryAccordion from '../components/organisms/CategoryAccordion';
import useProducts from '../hooks/useProducts';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t } = useTranslation();
  const { products, filteredProducts, searchTerm, setSearchTerm, addStock, editProduct, deleteProduct, addProduct, addCategory, editCategory, deleteCategory } = useProducts();

  // Dialog states
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [editCatOpen, setEditCatOpen] = useState(false);

  // Only one category accordion open at a time
  const [expandedCat, setExpandedCat] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Form states
  const [selectedCat, setSelectedCat] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [formData, setFormData] = useState({ itemName: '', stack: '', buyingPrice: '', sellingPrice: '', categoryName: '' });
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAddProduct = () => {
    addProduct(selectedCat, {
      itemName: formData.itemName,
      stack: Number(formData.stack) || 0,
      buyingPrice: Number(formData.buyingPrice) || 0,
      sellingPrice: Number(formData.sellingPrice) || 0,
    });
    setAddProductOpen(false);
    setFormData({ itemName: '', stack: '', buyingPrice: '', sellingPrice: '', categoryName: '' });
  };

  const handleAddCategory = () => {
    if (formData.categoryName.trim()) {
      addCategory(formData.categoryName.trim());
      setAddCategoryOpen(false);
      setFormData({ ...formData, categoryName: '' });
    }
  };

  const handleEditProduct = () => {
    editProduct(selectedCat, selectedItem, {
      itemName: formData.itemName,
      sellingPrice: Number(formData.sellingPrice) || 0,
      buyingPrice: Number(formData.buyingPrice) || 0,
    });
    setEditProductOpen(false);
  };

  const handleAddStock = () => {
    addStock(selectedCat, selectedItem, Number(formData.stack), Number(formData.buyingPrice));
    setAddStockOpen(false);
  };

  const handleEditCategory = () => {
    editCategory(selectedCat, formData.categoryName);
    setEditCatOpen(false);
  };

  const openEditProduct = (catIdx, itemIdx) => {
    const item = products[catIdx].items[itemIdx];
    setSelectedCat(catIdx);
    setSelectedItem(itemIdx);
    setFormData({ itemName: item.itemName, buyingPrice: String(item.buyingPrice), sellingPrice: String(item.sellingPrice), stack: '', categoryName: '' });
    setEditProductOpen(true);
  };

  const openAddStock = (catIdx, itemIdx) => {
    setSelectedCat(catIdx);
    setSelectedItem(itemIdx);
    setFormData({ ...formData, stack: '', buyingPrice: '' });
    setAddStockOpen(true);
  };

  const openDeleteProduct = (catIdx, itemIdx) => {
    setConfirmAction(() => () => deleteProduct(catIdx, itemIdx));
    setConfirmOpen(true);
  };

  const openEditCategory = (catIdx) => {
    setSelectedCat(catIdx);
    setFormData({ ...formData, categoryName: products[catIdx].categoryName });
    setEditCatOpen(true);
  };

  const openDeleteCategory = (catIdx) => {
    setConfirmAction(() => () => deleteCategory(catIdx));
    setConfirmOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', fontSize: 22 }}>{t('nav.products')}</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder={t('products.search')} sx={{ width: { xs: '100%', sm: 260, md: 320 }, minWidth: 0 }} />
          <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => setAddProductOpen(true)} sx={{ whiteSpace: 'nowrap', '&:active': { transform: 'scale(0.96)' } }}>{t('products.addProduct')}</Button>
          <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => setAddCategoryOpen(true)} sx={{ whiteSpace: 'nowrap', '&:active': { transform: 'scale(0.96)' } }}>{t('products.addCategory')}</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {filteredProducts.map((cat, catIdx) => {
          const realCatIdx = products.findIndex((c) => c.categoryName === cat.categoryName);
          return (
            <CategoryAccordion
              key={cat.categoryName}
              category={cat}
              catIdx={realCatIdx}
              expandedCat={expandedCat}
              onToggle={setExpandedCat}
              onEditCategory={openEditCategory}
              onDeleteCategory={openDeleteCategory}
              onEditProduct={openEditProduct}
              onDeleteProduct={openDeleteProduct}
              onAddStock={openAddStock}
            />
          );
        })}
      </Box>

      {/* Add Product Dialog */}
      <Dialog open={addProductOpen} onClose={() => setAddProductOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('products.addProduct')}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <FormControl size="small" fullWidth>
            <InputLabel>{t('billing.selectCategory')}</InputLabel>
            <Select value={selectedCat} label={t('billing.selectCategory')} onChange={(e) => setSelectedCat(e.target.value)}>
              {products.map((cat, i) => <MenuItem key={i} value={i}>{cat.categoryName}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField size="small" label={t('products.itemName')} value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
          <TextField size="small" type="number" label={t('products.quantity')} value={formData.stack} onChange={(e) => setFormData({ ...formData, stack: e.target.value })} />
          <TextField size="small" type="number" label={t('products.buyingPrice')} value={formData.buyingPrice} onChange={(e) => setFormData({ ...formData, buyingPrice: e.target.value })} />
          <TextField size="small" type="number" label={t('products.sellingPrice')} value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddProductOpen(false)}>{t('products.cancel')}</Button>
          <Button variant="contained" onClick={handleAddProduct} disabled={!formData.itemName.trim()}>{t('products.save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryOpen} onClose={() => setAddCategoryOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('products.addCategory')}</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <TextField size="small" fullWidth label={t('products.categoryName')} value={formData.categoryName} onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCategoryOpen(false)}>{t('products.cancel')}</Button>
          <Button variant="contained" onClick={handleAddCategory} disabled={!formData.categoryName.trim()}>{t('products.save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editProductOpen} onClose={() => setEditProductOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('products.edit')}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField size="small" label={t('products.itemName')} value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
          <TextField size="small" type="number" label={t('products.buyingPrice')} value={formData.buyingPrice} onChange={(e) => setFormData({ ...formData, buyingPrice: e.target.value })} />
          <TextField size="small" type="number" label={t('products.sellingPrice')} value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProductOpen(false)}>{t('products.cancel')}</Button>
          <Button variant="contained" onClick={handleEditProduct}>{t('products.save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Add Stock Dialog */}
      <Dialog open={addStockOpen} onClose={() => setAddStockOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('products.addStock')}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField size="small" type="number" label={t('products.quantity')} value={formData.stack} onChange={(e) => setFormData({ ...formData, stack: e.target.value })} />
          <TextField size="small" type="number" label={t('products.buyingPrice')} value={formData.buyingPrice} onChange={(e) => setFormData({ ...formData, buyingPrice: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStockOpen(false)}>{t('products.cancel')}</Button>
          <Button variant="contained" onClick={handleAddStock} disabled={!formData.stack || Number(formData.stack) <= 0}>{t('products.save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={editCatOpen} onClose={() => setEditCatOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('products.edit')}</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <TextField size="small" fullWidth label={t('products.categoryName')} value={formData.categoryName} onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCatOpen(false)}>{t('products.cancel')}</Button>
          <Button variant="contained" onClick={handleEditCategory}>{t('products.save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        message={t('products.confirmDeleteItem')}
        onConfirm={() => { confirmAction?.(); setConfirmOpen(false); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
};

export default Products;
