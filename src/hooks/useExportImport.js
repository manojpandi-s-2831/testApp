import { useContext, useCallback } from 'react';
import { ProductContext } from '../context/ProductContext';
import { BillContext } from '../context/BillContext';
import { CustomerContext } from '../context/CustomerContext';
import { SettingsContext } from '../context/SettingsContext';
import { exportAllData, importAllData } from '../services/exportService';

const useExportImport = () => {
  const { dispatch: productDispatch } = useContext(ProductContext);
  const { dispatch: billDispatch } = useContext(BillContext);
  const { dispatch: customerDispatch } = useContext(CustomerContext);
  const { dispatch: settingsDispatch } = useContext(SettingsContext);

  const handleExport = useCallback(() => {
    exportAllData();
  }, []);

  const handleImport = useCallback(async (file) => {
    const data = await importAllData(file);
    productDispatch({ type: 'SET_PRODUCTS', products: data.products });
    if (data.bills) billDispatch({ type: 'SET_BILLS', bills: data.bills });
    if (data.customers) customerDispatch({ type: 'SET_CUSTOMERS', customers: data.customers });
    if (data.settings) settingsDispatch({ type: 'SET_SETTINGS', settings: data.settings });
    return data;
  }, [productDispatch, billDispatch, customerDispatch, settingsDispatch]);

  const handleReset = useCallback(() => {
    productDispatch({ type: 'RESET_PRODUCTS' });
  }, [productDispatch]);

  const handleClearBills = useCallback(() => {
    billDispatch({ type: 'CLEAR_BILLS' });
  }, [billDispatch]);

  return { handleExport, handleImport, handleReset, handleClearBills };
};

export default useExportImport;
