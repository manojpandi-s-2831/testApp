import { useContext, useState, useCallback, useMemo } from 'react';
import { BillContext } from '../context/BillContext';
import { ProductContext } from '../context/ProductContext';
import { CustomerContext } from '../context/CustomerContext';
import { createBillItem, recalcBillItem } from './useCosting';

const useBilling = () => {
  const { bills, dispatch: billDispatch } = useContext(BillContext);
  const { products, dispatch: productDispatch } = useContext(ProductContext);
  const { customers, dispatch: customerDispatch } = useContext(CustomerContext);
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');

  const addItemToBill = useCallback((categoryName, item, qty) => {
    const billItem = createBillItem(categoryName, item, qty);
    setBillItems((prev) => [...prev, billItem]);
  }, []);

  const removeItemFromBill = useCallback((index) => {
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateSellPrice = useCallback((index, newPrice) => {
    setBillItems((prev) => prev.map((item, i) => i === index ? recalcBillItem(item, newPrice) : item));
  }, []);

  const clearBill = useCallback(() => {
    setBillItems([]);
    setCustomerName('');
    setCustomerMobile('');
    setCustomerAddress('');
    setGstNumber('');
  }, []);

  const grandTotal = useMemo(() => billItems.reduce((sum, item) => sum + item.total, 0), [billItems]);
  const totalProfit = useMemo(() => billItems.reduce((sum, item) => sum + item.profit, 0), [billItems]);

  const generateBill = useCallback(() => {
    if (billItems.length === 0 || !customerName.trim() || !/^\d{10}$/.test(customerMobile)) return null;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
    const existing = bills.filter((b) => b.id.startsWith(`BILL-${dateStr}`));
    const seq = String(existing.length + 1).padStart(3, '0');

    const bill = {
      id: `BILL-${dateStr}-${seq}`,
      date: now.toISOString(),
      customerName: customerName.trim(),
      customerMobile,
      customerAddress: customerAddress.trim(),
      gstNumber: gstNumber.trim(),
      items: billItems,
      grandTotal: Math.round(grandTotal * 100) / 100,
      totalProfit: Math.round(totalProfit * 100) / 100,
    };

    // Deduct stock for each bill item
    for (const item of billItems) {
      const catIdx = products.findIndex((c) => c.categoryName === item.categoryName);
      if (catIdx === -1) continue;
      const itemIdx = products[catIdx].items.findIndex((p) => p.itemName === item.itemName);
      if (itemIdx === -1) continue;
      productDispatch({ type: 'DEDUCT_STOCK', catIdx, itemIdx, qty: item.quantity });
    }

    // Auto-create or update customer
    customerDispatch({
      type: 'UPSERT_CUSTOMER',
      payload: { mobile: customerMobile, name: customerName.trim(), address: customerAddress.trim() },
    });

    billDispatch({ type: 'ADD_BILL', bill });
    clearBill();
    return bill;
  }, [billItems, customerName, customerMobile, customerAddress, gstNumber, grandTotal, totalProfit, bills, products, productDispatch, billDispatch, customerDispatch, clearBill]);

  const deleteBill = useCallback((id) => {
    billDispatch({ type: 'DELETE_BILL', id });
  }, [billDispatch]);

  // Auto-lookup customer by mobile
  const lookupCustomer = useCallback((mobile) => {
    return customers.find((c) => c.mobile === mobile) || null;
  }, [customers]);

  return {
    bills,
    billItems,
    customerName,
    setCustomerName,
    customerMobile,
    setCustomerMobile,
    customerAddress,
    setCustomerAddress,
    gstNumber,
    setGstNumber,
    addItemToBill,
    removeItemFromBill,
    updateSellPrice,
    clearBill,
    grandTotal,
    totalProfit,
    generateBill,
    deleteBill,
    lookupCustomer,
  };
};

export default useBilling;
