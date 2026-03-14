# Sai Ram Lace House — Performance Guide

> How to keep the app fast, smooth, and free from slowness issues.

---

## 1. Data & State Management

Avoid re-rendering everything on every change. With 51 categories and 400+ items, if all of them re-render when you add one bill, the app will feel sluggish.

- Split your 4 contexts (`ProductContext`, `BillContext`, `CustomerContext`, `SettingsContext`) properly — components should only subscribe to the context they need
- Use `useMemo` for expensive calculations like report aggregations and dashboard top-5 lists
- Use `useCallback` for functions passed as props (like edit/delete handlers in `ProductRow`)
- Use `React.memo` on `ProductRow`, `BillItemRow`, `CategoryAccordion` — these render inside lists and will re-render unnecessarily without it

---

## 2. Products Page (Heaviest Page)

This is your biggest risk — 51 accordions with 400 items.

- **Only render open accordions.** Keep a state like `openCategory` and only mount `ProductTable` when the accordion is expanded. Collapsed ones just show the header.
- **Virtualize long lists** if you ever show all items at once — use `react-window` or `react-virtual`
- **Debounce search input** — don't filter 400 items on every keystroke. Wait 300ms after the user stops typing.

```js
// Debounce example
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);
const filtered = useMemo(
  () => filterProducts(products, debouncedQuery),
  [products, debouncedQuery]
);
```

---

## 3. localStorage

- **Never read localStorage inside a render.** Read once on app load inside your service, store in context — done.
- **Debounce writes too.** If the user types fast in a price field, don't write to localStorage on every keystroke — write after 500ms of no changes.
- **Keep your data flat where possible.** Deeply nested objects are slower to clone and update.

---

## 4. Billing Page

- The `NewBill` form recalculates totals every time an item is added/removed. Wrap the grand total calculation in `useMemo` so it only recomputes when the items array actually changes.
- Don't store derived values (like `grandTotal`) in state — compute them from the items array.

```js
// Good — derived, not stored
const grandTotal = useMemo(
  () => billItems.reduce((sum, item) => sum + item.total, 0),
  [billItems]
);
```

---

## 5. Reports Page

- Reports aggregate across all bills — this can be slow if you have hundreds of bills.
- Run report calculations inside `useMemo` with the date range as the dependency.
- Consider computing them lazily — only when the Reports tab is actually opened.

```js
const salesData = useMemo(
  () => aggregateSales(bills, dateRange),
  [bills, dateRange]
);
```

---

## 6. General React Rules

| Rule | Why |
|---|---|
| `key` prop must be stable and unique | Using array index as key causes unnecessary re-mounts |
| Avoid inline object/function props | `<Comp style={{margin:0}}/>` creates a new object every render |
| Lazy load heavy pages | `React.lazy()` + `Suspense` so Dashboard doesn't load Reports bundle upfront |
| Avoid `useEffect` chains | One effect triggering another = hard to debug + slow |

```js
// Lazy load each route page
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Reports   = React.lazy(() => import('./pages/Reports'));
const Products  = React.lazy(() => import('./pages/Products'));
```

---

## 7. Bundle Size

```js
// Import only what you use from MUI — tree-shaking works per component
import Button from '@mui/material/Button';   // ✅ good
import { Button } from '@mui/material';       // ✅ also fine with Vite
```

- Use Vite's built-in code splitting — each route becomes its own chunk automatically with `React.lazy()`
- Don't import entire icon libraries — import only the icons you use

```js
// ✅ Import only what you need
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon   from '@mui/icons-material/Receipt';

// ❌ Never do this
import * as Icons from '@mui/icons-material';
```

---

## 8. Summary — Priority Fix List

Since this is a **client-only app**, you don't need to worry about network or server performance. Your real risks are:

| Priority | Problem | Fix |
|---|---|---|
| 🔴 1 | Re-renders on every state change | `React.memo` + `useMemo` + `useCallback` |
| 🔴 2 | Products page with 400 items | Lazy accordion rendering + debounced search |
| 🟡 3 | localStorage writes on every keystroke | Debounce writes (500ms) |
| 🟡 4 | Report calculations on large bill history | `useMemo` + lazy computation |
| 🟢 5 | Large bundle size | `React.lazy()` per route |

> Implement these and the app will feel instant even on a low-end device.
