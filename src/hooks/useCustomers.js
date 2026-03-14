import { useContext, useMemo, useCallback } from 'react';
import { CustomerContext } from '../context/CustomerContext';
import { BillContext } from '../context/BillContext';

const useCustomers = () => {
  const { customers, dispatch } = useContext(CustomerContext);
  const { bills } = useContext(BillContext);

  const upsertCustomer = useCallback((bill) => {
    dispatch({
      type: 'UPSERT_CUSTOMER',
      payload: { mobile: bill.customerMobile, name: bill.customerName, address: bill.customerAddress },
    });
  }, [dispatch]);

  const getCustomerByMobile = useCallback((mobile) => {
    return customers.find((c) => c.mobile === mobile) || null;
  }, [customers]);

  const customersWithStats = useMemo(() => {
    const statsMap = {};
    for (const bill of bills) {
      const mobile = bill.customerMobile;
      if (!mobile) continue;
      if (!statsMap[mobile]) statsMap[mobile] = { totalBills: 0, totalAmount: 0, totalProfit: 0, lastBillDate: null };
      statsMap[mobile].totalBills += 1;
      statsMap[mobile].totalAmount += bill.grandTotal;
      statsMap[mobile].totalProfit += bill.totalProfit;
      const billDate = new Date(bill.date);
      if (!statsMap[mobile].lastBillDate || billDate > new Date(statsMap[mobile].lastBillDate)) {
        statsMap[mobile].lastBillDate = bill.date;
      }
    }
    return customers.map((c) => ({
      ...c,
      totalBills: statsMap[c.mobile]?.totalBills || 0,
      totalAmount: Math.round(statsMap[c.mobile]?.totalAmount || 0),
      totalProfit: Math.round(statsMap[c.mobile]?.totalProfit || 0),
      lastBillDate: statsMap[c.mobile]?.lastBillDate || null,
    }));
  }, [customers, bills]);

  const getBillsForCustomer = useCallback((mobile) => {
    return bills.filter((b) => b.customerMobile === mobile);
  }, [bills]);

  return { customers: customersWithStats, upsertCustomer, getCustomerByMobile, getBillsForCustomer };
};

export default useCustomers;
