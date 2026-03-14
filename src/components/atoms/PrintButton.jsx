import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from 'react-i18next';

const PrintButton = ({ onClick, sx, ...props }) => {
  const { t } = useTranslation();
  const handlePrint = onClick || (() => window.print());
  return (
    <Button
      variant="outlined"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      sx={sx}
      {...props}
    >
      {t('common.print')}
    </Button>
  );
};

export default PrintButton;
