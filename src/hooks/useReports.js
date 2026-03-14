import { useContext, useMemo, useState } from 'react';
import { BillContext } from '../context/BillContext';
import { ProductContext } from '../context/ProductContext';

const useReports = () => {
  const { bills } = useContext(BillContext);
  const { products } = useContext(ProductContext);
  const [dateRange, setDateRange] = useState({ type: 'thisMonth', start: null, end: null });

  const getFilteredBills = useMemo(() => {
    const now = new Date();
    let start, end;
    switch (dateRange.type) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
      case 'thisWeek': {
        const day = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - day);
        start.setHours(0, 0, 0, 0);
        end = new Date(now);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now);
        end.setHours(23, 59, 59, 999);
        break;
      case 'custom':
        start = dateRange.start ? new Date(dateRange.start) : new Date(0);
        end = dateRange.end ? new Date(dateRange.end) : new Date();
        end.setHours(23, 59, 59, 999);
        break;
      default:
        start = new Date(0);
        end = new Date();
    }
    return bills.filter((b) => {
      const d = new Date(b.date);
      return d >= start && d <= end;
    });
  }, [bills, dateRange]);

  const salesReport = useMemo(() => {
    const grouped = {};
    for (const bill of getFilteredBills) {
      const date = new Date(bill.date).toLocaleDateString();
      if (!grouped[date]) grouped[date] = { date, billCount: 0, totalSales: 0 };
      grouped[date].billCount += 1;
      grouped[date].totalSales += bill.grandTotal;
    }
    return Object.values(grouped);
  }, [getFilteredBills]);

  const profitReport = useMemo(() => {
    let totalRevenue = 0;
    let totalCost = 0;
    let totalProfit = 0;
    for (const bill of getFilteredBills) {
      for (const item of bill.items) {
        totalRevenue += item.total;
        totalCost += item.costPrice * item.quantity;
        totalProfit += item.profit;
      }
    }
    const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;
    return { totalRevenue: Math.round(totalRevenue), totalCost: Math.round(totalCost), totalProfit: Math.round(totalProfit), margin };
  }, [getFilteredBills]);

  const inventoryReport = useMemo(() => {
    return products.map((cat) => {
      const totalItems = cat.items.length;
      const totalStock = cat.items.reduce((s, i) => s + i.stack, 0);
      const stockValue = cat.items.reduce((s, i) => s + i.stack * (i.avgCostPrice || 0), 0);
      const saleValue = cat.items.reduce((s, i) => s + i.stack * (i.sellingPrice || 0), 0);
      return {
        categoryName: cat.categoryName,
        totalItems,
        totalStock,
        stockValue: Math.round(stockValue),
        saleValue: Math.round(saleValue),
      };
    });
  }, [products]);

  const categorySalesReport = useMemo(() => {
    const catMap = {};
    for (const bill of getFilteredBills) {
      for (const item of bill.items) {
        if (!catMap[item.categoryName]) catMap[item.categoryName] = { categoryName: item.categoryName, unitsSold: 0, revenue: 0, profit: 0 };
        catMap[item.categoryName].unitsSold += item.quantity;
        catMap[item.categoryName].revenue += item.total;
        catMap[item.categoryName].profit += item.profit;
      }
    }
    return Object.values(catMap).map((c) => ({
      ...c,
      revenue: Math.round(c.revenue),
      profit: Math.round(c.profit),
    }));
  }, [getFilteredBills]);

  const lowStockItems = useMemo(() => {
    const items = [];
    for (const cat of products) {
      for (const item of cat.items) {
        if (item.stack <= 5) {
          items.push({ categoryName: cat.categoryName, itemName: item.itemName, stock: item.stack });
        }
      }
    }
    return items.sort((a, b) => a.stock - b.stock);
  }, [products]);

  const customerReport = useMemo(() => {
    const custMap = {};
    for (const bill of getFilteredBills) {
      const mobile = bill.customerMobile;
      if (!mobile) continue;
      if (!custMap[mobile]) custMap[mobile] = { customerName: bill.customerName, mobile, totalBills: 0, totalAmount: 0, totalProfit: 0, lastBillDate: bill.date };
      custMap[mobile].totalBills += 1;
      custMap[mobile].totalAmount += bill.grandTotal;
      custMap[mobile].totalProfit += bill.totalProfit;
      if (new Date(bill.date) > new Date(custMap[mobile].lastBillDate)) custMap[mobile].lastBillDate = bill.date;
      custMap[mobile].customerName = bill.customerName;
    }
    const all = Object.values(custMap).map((c) => ({ ...c, totalAmount: Math.round(c.totalAmount), totalProfit: Math.round(c.totalProfit) }));
    const topByAmount = [...all].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5);
    const topByProfit = [...all].sort((a, b) => b.totalProfit - a.totalProfit).slice(0, 5);
    return { all, topByAmount, topByProfit };
  }, [getFilteredBills]);

  return {
    dateRange,
    setDateRange,
    getFilteredBills,
    salesReport,
    profitReport,
    inventoryReport,
    categorySalesReport,
    lowStockItems,
    customerReport,
  };
};

export default useReports;
