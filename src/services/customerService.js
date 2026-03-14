const STORAGE_KEY = 'laceShop_customers';

export const getCustomers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCustomers = (customers) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
};

export const getCustomerByMobile = (mobile, customers) => {
  return customers.find((c) => c.mobile === mobile) || null;
};
