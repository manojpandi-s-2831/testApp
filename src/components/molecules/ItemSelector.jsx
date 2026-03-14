import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

const ItemSelector = ({ products, onAdd }) => {
  const { t } = useTranslation();
  const [catIdx, setCatIdx] = useState('');
  const [itemIdx, setItemIdx] = useState('');
  const [qty, setQty] = useState('');

  const selectedCat = catIdx !== '' ? products[catIdx] : null;
  const selectedItem = selectedCat && itemIdx !== '' ? selectedCat.items[itemIdx] : null;

  const handleAdd = () => {
    if (!selectedCat || !selectedItem || !qty || Number(qty) <= 0) return;
    if (Number(qty) > selectedItem.stack) return;
    onAdd(selectedCat.categoryName, selectedItem, Number(qty));
    setItemIdx('');
    setQty('');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t('billing.selectCategory')}</InputLabel>
        <Select
          value={catIdx}
          label={t('billing.selectCategory')}
          onChange={(e) => { setCatIdx(e.target.value); setItemIdx(''); setQty(''); }}
        >
          {products.map((cat, i) => (
            <MenuItem key={i} value={i}>{cat.categoryName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t('billing.selectItem')}</InputLabel>
        <Select
          value={itemIdx}
          label={t('billing.selectItem')}
          onChange={(e) => { setItemIdx(e.target.value); setQty(''); }}
          disabled={catIdx === ''}
        >
          {selectedCat?.items.map((item, i) => (
            <MenuItem key={i} value={i} disabled={item.stack === 0}>
              {item.itemName} (₹{item.sellingPrice})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedItem && (
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          {t('billing.availableStock')}: {selectedItem.stack}
        </Typography>
      )}
      <TextField
        size="small"
        type="number"
        label={t('billing.quantity')}
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        disabled={itemIdx === ''}
        slotProps={{ htmlInput: { min: 1, max: selectedItem?.stack || 0 } }}
        sx={{ width: 100 }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        disabled={!selectedItem || !qty || Number(qty) <= 0 || Number(qty) > (selectedItem?.stack || 0)}
      >
        {t('billing.add')}
      </Button>
    </Box>
  );
};

export default ItemSelector;
