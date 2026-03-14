const STORAGE_KEY = 'laceShop_bills';

export const getBills = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBills = (bills) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bills));
};

export const addBill = (bill) => {
  const bills = getBills();
  bills.unshift(bill);
  saveBills(bills);
  return bills;
};

export const deleteBill = (id) => {
  const bills = getBills().filter((b) => b.id !== id);
  saveBills(bills);
  return bills;
};
