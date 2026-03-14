import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const CategoryHeader = ({ categoryName, itemCount, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{categoryName}</Typography>
      <Chip label={`${itemCount} ${t('products.items')}`} size="small" variant="outlined" />
      <Tooltip title={t('products.edit')}>
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('products.delete')}>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CategoryHeader;
