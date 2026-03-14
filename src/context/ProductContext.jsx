import { createContext, useReducer, useEffect, useRef, useCallback } from 'react';
import { getProducts, saveProducts, resetProducts as resetSeed } from '../services/productService';
import { addPurchaseToItem } from '../hooks/useCosting';

const ProductContext = createContext();

const productReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.products;

    case 'ADD_STOCK': {
      newState = structuredClone(state);
      const item = newState[action.catIdx].items[action.itemIdx];
      const updated = addPurchaseToItem(item, action.qty, action.buyPrice);
      newState[action.catIdx].items[action.itemIdx] = updated;
      return newState;
    }

    case 'DEDUCT_STOCK': {
      newState = structuredClone(state);
      newState[action.catIdx].items[action.itemIdx].stack -= action.qty;
      return newState;
    }

    case 'EDIT_PRODUCT': {
      newState = structuredClone(state);
      Object.assign(newState[action.catIdx].items[action.itemIdx], action.updates);
      return newState;
    }

    case 'DELETE_PRODUCT': {
      newState = structuredClone(state);
      newState[action.catIdx].items.splice(action.itemIdx, 1);
      return newState;
    }

    case 'ADD_PRODUCT': {
      newState = structuredClone(state);
      const newItem = {
        itemName: action.item.itemName,
        stack: action.item.stack || 0,
        buyingPrice: action.item.buyingPrice || 0,
        sellingPrice: action.item.sellingPrice || 0,
        avgCostPrice: action.item.buyingPrice || 0,
        purchaseLog: action.item.stack > 0
          ? [{ date: new Date().toISOString().split('T')[0], qty: action.item.stack, buyingPrice: action.item.buyingPrice || 0 }]
          : [],
      };
      newState[action.catIdx].items.push(newItem);
      return newState;
    }

    case 'ADD_CATEGORY':
      return [...state, { categoryName: action.categoryName, items: [] }];

    case 'EDIT_CATEGORY': {
      newState = structuredClone(state);
      newState[action.catIdx].categoryName = action.newName;
      return newState;
    }

    case 'DELETE_CATEGORY': {
      newState = structuredClone(state);
      newState.splice(action.catIdx, 1);
      return newState;
    }

    case 'RESET_PRODUCTS':
      return resetSeed();

    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, null, getProducts);
  const timerRef = useRef(null);

  // Debounce localStorage writes (500ms)
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveProducts(products), 500);
    return () => clearTimeout(timerRef.current);
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
