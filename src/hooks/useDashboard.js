import { useContext, useMemo } from 'react';
import { BillContext } from '../context/BillContext';
import { ProductContext } from '../context/ProductContext';

const useDashboard = () => {
  const { bills } = useContext(BillContext);
  const { products } = useContext(ProductContext);

  const totalCategories = products.length;
  const totalItems = useMemo(() => products.reduce((sum, cat) => sum + cat.items.length, 0), [products]);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const billsToday = useMemo(() => bills.filter((b) => b.date.startsWith(todayStr)), [bills, todayStr]);
  const revenueToday = useMemo(() => billsToday.reduce((sum, b) => sum + b.grandTotal, 0), [billsToday]);

  const mostSelling = useMemo(() => {
    const map = {};
    for (const bill of bills) {
      for (const item of bill.items) {
        const key = `${item.categoryName}||${item.itemName}`;
        if (!map[key]) map[key] = { item: item.itemName, category: item.categoryName, qtySold: 0 };
        map[key].qtySold += item.quantity;
      }
    }
    return Object.values(map).sort((a, b) => b.qtySold - a.qtySold).slice(0, 5);
  }, [bills]);

  const leastSelling = useMemo(() => {
    const map = {};
    for (const bill of bills) {
      for (const item of bill.items) {
        const key = `${item.categoryName}||${item.itemName}`;
        if (!map[key]) map[key] = { item: item.itemName, category: item.categoryName, qtySold: 0 };
        map[key].qtySold += item.quantity;
      }
    }
    return Object.values(map).sort((a, b) => a.qtySold - b.qtySold).slice(0, 5);
  }, [bills]);

  const allItems = useMemo(() => {
    const items = [];
    for (const cat of products) {
      for (const item of cat.items) {
        items.push({ item: item.itemName, category: cat.categoryName, stock: item.stack });
      }
    }
    return items;
  }, [products]);

  const leastStocked = useMemo(() => {
    return [...allItems].sort((a, b) => a.stock - b.stock).slice(0, 5);
  }, [allItems]);

  const mostStocked = useMemo(() => {
    return [...allItems].sort((a, b) => b.stock - a.stock).slice(0, 5);
  }, [allItems]);

  return {
    totalCategories,
    totalItems,
    billsToday: billsToday.length,
    revenueToday: Math.round(revenueToday),
    mostSelling,
    leastSelling,
    leastStocked,
    mostStocked,
  };
};

export default useDashboard;
