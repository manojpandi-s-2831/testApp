import { useContext, useState, useMemo, useCallback } from 'react';
import { ProductContext } from '../context/ProductContext';
import useDebounce from './useDebounce';

const useProducts = () => {
  const { products, dispatch } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;
    const term = debouncedSearch.toLowerCase();
    return products
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.itemName.toLowerCase().includes(term) ||
            cat.categoryName.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.items.length > 0 || cat.categoryName.toLowerCase().includes(term));
  }, [products, debouncedSearch]);

  const addStock = useCallback((catIdx, itemIdx, qty, buyPrice) => {
    dispatch({ type: 'ADD_STOCK', catIdx, itemIdx, qty, buyPrice });
  }, [dispatch]);

  const editProduct = useCallback((catIdx, itemIdx, updates) => {
    dispatch({ type: 'EDIT_PRODUCT', catIdx, itemIdx, updates });
  }, [dispatch]);

  const deleteProduct = useCallback((catIdx, itemIdx) => {
    dispatch({ type: 'DELETE_PRODUCT', catIdx, itemIdx });
  }, [dispatch]);

  const addProduct = useCallback((catIdx, item) => {
    dispatch({ type: 'ADD_PRODUCT', catIdx, item });
  }, [dispatch]);

  const addCategory = useCallback((categoryName) => {
    dispatch({ type: 'ADD_CATEGORY', categoryName });
  }, [dispatch]);

  const editCategory = useCallback((catIdx, newName) => {
    dispatch({ type: 'EDIT_CATEGORY', catIdx, newName });
  }, [dispatch]);

  const deleteCategory = useCallback((catIdx) => {
    dispatch({ type: 'DELETE_CATEGORY', catIdx });
  }, [dispatch]);

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    addStock,
    editProduct,
    deleteProduct,
    addProduct,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useProducts;
