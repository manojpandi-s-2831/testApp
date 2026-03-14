import { createContext, useReducer, useEffect, useRef } from 'react';
import { getBills, saveBills } from '../services/billService';

const BillContext = createContext();

const billReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BILLS':
      return action.bills;
    case 'ADD_BILL':
      return [action.bill, ...state];
    case 'DELETE_BILL':
      return state.filter((b) => b.id !== action.id);
    case 'CLEAR_BILLS':
      return [];
    default:
      return state;
  }
};

const BillProvider = ({ children }) => {
  const [bills, dispatch] = useReducer(billReducer, null, getBills);
  const timerRef = useRef(null);

  // Debounce localStorage writes (500ms)
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveBills(bills), 500);
    return () => clearTimeout(timerRef.current);
  }, [bills]);

  return (
    <BillContext.Provider value={{ bills, dispatch }}>
      {children}
    </BillContext.Provider>
  );
};

export { BillContext, BillProvider };
