import seedData from '../data/products.json';

const STORAGE_KEY = 'laceShop_products';

export const getProducts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  // First load: seed from products.json
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return structuredClone(seedData);
};

export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const resetProducts = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return structuredClone(seedData);
};
