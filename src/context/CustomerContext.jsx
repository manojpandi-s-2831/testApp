import { createContext, useReducer, useEffect, useRef } from 'react';
import { getCustomers, saveCustomers } from '../services/customerService';

const CustomerContext = createContext();

const customerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      return action.customers;
    case 'UPSERT_CUSTOMER': {
      const { mobile, name, address } = action.payload;
      const idx = state.findIndex((c) => c.mobile === mobile);
      if (idx >= 0) {
        const updated = [...state];
        updated[idx] = { ...updated[idx], name, address: address || updated[idx].address };
        return updated;
      }
      const newId = `CX-${String(state.length + 1).padStart(3, '0')}`;
      return [...state, { id: newId, name, mobile, address: address || '', createdAt: new Date().toISOString() }];
    }
    default:
      return state;
  }
};

const CustomerProvider = ({ children }) => {
  const [customers, dispatch] = useReducer(customerReducer, null, getCustomers);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveCustomers(customers), 500);
    return () => clearTimeout(timerRef.current);
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
