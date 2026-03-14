import { getProducts, saveProducts } from './productService';
import { getBills, saveBills } from './billService';
import { getCustomers, saveCustomers } from './customerService';
import { getSettings, saveSettings } from './settingsService';

export const exportAllData = () => {
  const data = {
    products: getProducts(),
    bills: getBills(),
    customers: getCustomers(),
    settings: getSettings(),
    exportDate: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lace-shop-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importAllData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.products || !Array.isArray(data.products)) {
          reject(new Error('Invalid data format: missing products array'));
          return;
        }
        saveProducts(data.products);
        if (data.bills) saveBills(data.bills);
        if (data.customers) saveCustomers(data.customers);
        if (data.settings) saveSettings(data.settings);
        resolve(data);
      } catch (err) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
