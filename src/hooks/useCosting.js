export const calculateAvgCost = (purchaseLog) => {
  if (!purchaseLog || purchaseLog.length === 0) return 0;
  let totalQty = 0;
  let totalCost = 0;
  for (const entry of purchaseLog) {
    totalQty += entry.qty;
    totalCost += entry.qty * entry.buyingPrice;
  }
  return totalQty > 0 ? Math.round((totalCost / totalQty) * 100) / 100 : 0;
};

export const addPurchaseToItem = (item, qty, buyPrice) => {
  const newLog = { date: new Date().toISOString().split('T')[0], qty, buyingPrice: buyPrice };
  const purchaseLog = [...(item.purchaseLog || []), newLog];
  const oldTotal = item.stack * (item.avgCostPrice || 0);
  const newTotal = qty * buyPrice;
  const newStack = item.stack + qty;
  const avgCostPrice = newStack > 0 ? Math.round(((oldTotal + newTotal) / newStack) * 100) / 100 : 0;
  return {
    ...item,
    stack: newStack,
    buyingPrice: buyPrice,
    avgCostPrice,
    purchaseLog,
  };
};

export const createBillItem = (categoryName, item, qty, customSellingPrice) => {
  const costPrice = item.avgCostPrice || 0;
  const sellingPrice = customSellingPrice != null ? customSellingPrice : (item.sellingPrice || 0);
  const total = sellingPrice * qty;
  const profit = (sellingPrice - costPrice) * qty;
  return {
    categoryName,
    itemName: item.itemName,
    quantity: qty,
    costPrice,
    sellingPrice,
    total: Math.round(total * 100) / 100,
    profit: Math.round(profit * 100) / 100,
  };
};

export const recalcBillItem = (billItem, newSellingPrice) => {
  const sellingPrice = Number(newSellingPrice) || 0;
  const total = sellingPrice * billItem.quantity;
  const profit = (sellingPrice - billItem.costPrice) * billItem.quantity;
  return {
    ...billItem,
    sellingPrice,
    total: Math.round(total * 100) / 100,
    profit: Math.round(profit * 100) / 100,
  };
};
