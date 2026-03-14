const STORAGE_KEY = 'laceShop_settings';

const defaultSettings = {
  shopName: 'Sai Ram Lace House',
  shopAddress: '',
  shopPhone: '',
  shopGST: '',
  theme: 'light',
  language: 'ta',
};

export const getSettings = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? { ...defaultSettings, ...JSON.parse(data) } : { ...defaultSettings };
};

export const saveSettings = (settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
