# Sai Ram Lace House — Shop Management App
# Full Planning & Implementation Document

---

## 1. Project Overview

**App Name:** Sai Ram Lace House
**Type:** Single-page React App (client-side only, no backend)
**Purpose:** Manage stock, billing, and reports for a Tamil lace/decoration shop
**Data:** 50 product categories, ~300+ items, seeded from `products.json`

### Tech Stack

| Technology | Purpose |
|---|---|
| Vite | Build tool |
| React 18+ | UI framework |
| Material UI (MUI) | Component library |
| React Router v6 | URL-based routing |
| i18next + react-i18next | Internationalization (Tamil/English/Hindi) |
| localStorage | Data persistence |
| Google Fonts (Inter) | Typography |

### Install Command

```bash
npm create vite@latest . -- --template react
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom i18next react-i18next
```

---

## 2. Architecture & Development Guidelines

### 2.1 SOLID Principles

| Principle | Application |
|---|---|
| **S — Single Responsibility** | Each file does one thing. `Invoice.jsx` only renders, `useCosting.js` only calculates costs |
| **O — Open/Closed** | Components accept props for extension (e.g., `DashboardWidget` is generic — extend via props, don't modify) |
| **L — Liskov Substitution** | All report components share same interface pattern (date range → table output) |
| **I — Interface Segregation** | 4 separate contexts (`ProductContext`, `BillContext`, `CustomerContext`, `SettingsContext`) — components subscribe only to what they need |
| **D — Dependency Inversion** | Pages → hooks → services. UI never touches localStorage directly |

### 2.2 Atomic Design Pattern

```
src/components/
├── atoms/          — Smallest UI units (no business logic)
│   ├── PriceText.jsx           — Formatted ₹ price display
│   ├── StockBadge.jsx          — Color-coded stock indicator (green/yellow/red)
│   ├── SearchInput.jsx         — Reusable search field
│   ├── ConfirmDialog.jsx       — Generic yes/no confirmation dialog
│   ├── StatusChip.jsx          — Colored status label (MUI Chip)
│   └── PrintButton.jsx         — Print trigger button
│
├── molecules/      — Combinations of atoms with simple interaction logic
│   ├── ProductRow.jsx          — Single item row (name + price + stock + action buttons)
│   ├── BillItemRow.jsx         — Single bill line item row (with inline-editable selling price)
│   ├── CategoryHeader.jsx      — Accordion header (category name + item count + actions)
│   ├── ItemSelector.jsx        — Category → Item → Qty combo selector
│   ├── DateRangePicker.jsx     — Period selector (today/this week/this month/custom)
│   ├── LanguageMenu.jsx        — Language switcher popup (Tamil/English/Hindi)
│   └── ProfileMenu.jsx         — Profile popup with dark mode toggle
│
├── organisms/      — Complex sections composed of molecules
│   ├── ProductTable.jsx        — Full item table for one category
│   ├── BillForm.jsx            — Item selector + bill items table + totals
│   ├── BillHistoryTable.jsx    — Past bills searchable/filterable table
│   ├── DashboardWidget.jsx     — Analytics card (title + ranked list, reusable)
│   ├── Invoice.jsx             — Printable invoice layout
│   ├── ReportTable.jsx         — Generic report data table
│   ├── CustomerTable.jsx       — Customer list table with stats (New)
│   ├── CustomerDetailDialog.jsx— Customer detail + bill history dialog (New)
│   └── CategoryAccordion.jsx   — Single category accordion (header + product table)
│
└── templates/      — Page layouts (slot-based, no data fetching)
    └── AppLayout.jsx           — Navbar + Sidebar + <Outlet /> content slot
```

### 2.3 Three-Layer Architecture

```
┌─────────────────────────────────────────────┐
│  PRESENTATION LAYER                         │
│  pages/*.jsx → organisms → molecules → atoms│
│  (Pure UI, calls hooks only)                │
├─────────────────────────────────────────────┤
│  BUSINESS LOGIC LAYER                       │
│  hooks/*.js  +  context/*.jsx               │
│  (Rules, state, validation, calculations)   │
├─────────────────────────────────────────────┤
│  DATA ACCESS LAYER                          │
│  services/*.js                              │
│  (localStorage read/write, file export)     │
├─────────────────────────────────────────────┤
│  localStorage + products.json (seed)        │
└─────────────────────────────────────────────┘
```

**Layer 1 — Data Access** (`src/services/`)

```
productService.js    — getProducts(), saveProducts(), resetProducts()
billService.js       — getBills(), saveBills(), addBill(), deleteBill()
settingsService.js   — getSettings(), saveSettings()
exportService.js     — exportAllData(), importAllData(file)
```

- Reads/writes to localStorage with key prefix `laceShop_`
- Seeds from `products.json` on first load
- Pure functions, no React dependencies

**Layer 2 — Business Logic** (`src/hooks/`)

```
useProducts.js       — CRUD operations, search/filter, product state
useBilling.js        — Bill creation, item add/remove, total calc, stock deduction
useCosting.js        — addPurchase(), calculateAvgCost(), createBillItem()
useReports.js        — Sales/profit/inventory aggregation, date filtering
useDashboard.js      — Top 5 calculations (most/least selling/stocked)
useSettings.js       — Shop info, theme, language preference
useExportImport.js   — Export/import orchestration with validation
```

- Custom hooks encapsulate all business rules
- Call services from data layer
- Return processed data + action functions to presentation layer

**Layer 3 — Presentation** (`src/components/` + `src/pages/`)

```
Dashboard.jsx        — Uses useDashboard()    → renders DashboardWidgets
Products.jsx         — Uses useProducts()     → renders CategoryAccordions
NewBill.jsx          — Uses useBilling()      → renders BillForm
BillHistory.jsx      — Uses useBilling()      → renders BillHistoryTable
Customers.jsx        — Uses useCustomers()    → renders customer table + detail dialog
Reports.jsx          — Uses useReports()      → renders report sub-tabs (incl. Customer Report)
Settings.jsx         — Uses useSettings()     → renders forms
```

### Data Flow

```
localStorage / products.json (seed)
        ↕
  services/*.js          (read/write raw data)
        ↕
  hooks/*.js + context/  (business rules + state)
        ↕
  pages/ → organisms → molecules → atoms  (render UI)
```

---

## 3. Design System (UI/CSS)

### 3.1 Color Palette

| Element | Light Mode | Dark Mode |
|---|---|---|
| Sidebar | `#0F172A` (navy) | `#0F172A` (same) |
| Content BG | `#F8FAFC` | `#1E293B` |
| Primary | `#3B82F6` (blue) | `#3B82F6` |
| Text | `#1E293B` | `#F1F5F9` |
| Card | `#FFFFFF` | `#334155` |
| Success | `#22C55E` (green) | Active / Delivered / In Stock |
| Warning | `#EAB308` (yellow) | Pending |
| Error | `#EF4444` (red) | Cancelled / Out of Stock |
| Info | `#3B82F6` (blue) | Shipped / Processing |

### 3.2 Typography

- **Font:** `'Inter', sans-serif` (Google Fonts)
- **Min size:** 14px everywhere
- **Headings:** weight 600
- **Body:** weight 400
- Apply via MUI theme `typography` overrides

### 3.3 Layout Specs

- CSS Grid + Flexbox for all layouts
- Card border-radius: **12px**
- Input/button border-radius: **8px**
- Card shadow: `elevation: 1` to `elevation: 3` (`0 1px 3px rgba(0,0,0,0.1)`)
- Content padding: **24px** desktop, **16px** mobile
- Content max-width: **1400px** centered

### 3.4 Status Badges (MUI Chip)

| Status | Color | Usage |
|---|---|---|
| Active / In Stock / Delivered | Green `#22C55E` | Products, orders |
| Pending | Yellow `#EAB308` | Orders |
| Cancelled / Out of Stock | Red `#EF4444` | Orders, low stock |
| Processing / Shipped | Blue `#3B82F6` | Orders |

### 3.5 Responsive Breakpoints

| Screen | Sidebar | Content |
|---|---|---|
| Desktop ≥1200px | Full width (240px) | Fills remaining |
| Tablet 768–1199px | Icon-only (72px) | Fills remaining |
| Mobile <768px | Hidden → hamburger drawer | Full width |

### 3.6 Mobile Rules

- Sidebar → hamburger drawer on mobile (<768px)
- Tables: horizontal scroll with MUI `TableContainer`
- Cards stack vertically (`Grid xs={12}`)
- `overflow-x: hidden` on body (no horizontal page scroll)
- All tap targets minimum **44px** height
- Dialogs go **full-screen** on mobile
- Font size minimum **14px** everywhere

### 3.7 Animations & Interactions

- Sidebar collapse/expand: CSS transition **225ms**
- Hover states on all interactive elements
- Skeleton loading for data-heavy sections
- Success/error feedback via MUI **Snackbar**

### 3.8 Accessibility

- WCAG AA contrast ratios
- Keyboard navigation on all interactive elements
- Focus visible outlines
- `aria-label` on icon-only buttons

### 3.9 Dark Mode

- Toggle in navbar (sun/moon MUI IconButton)
- Full theme switch via MUI `ThemeProvider`
- Sidebar stays dark navy in both modes
- Preference stored in `localStorage` + `SettingsContext`

### 3.10 Grid Layout Rules (from `dashboardGirdLayout.md`)

**Parent Container:** Content area must have padding at the **page level**, not per-card.

```jsx
<Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
  <Grid container spacing={3}> ... </Grid>
</Box>
```

**Golden Rule:** Grid `spacing={3}` (24px) handles ALL gaps. Cards inside Grid items must have `margin: 0`.

**Dashboard Grid:** Summary stats `xs={6} sm={3}` (4 across on desktop), Widgets `xs={12} sm={6}` (2×2 on desktop, 1 col on mobile).

**Reports Grid:** Full-width rows — DateRangePicker → Summary Card(s) → Data Table. Profit summary uses `xs={12} sm={4}` (3 cards side by side).

**Card Standards:**

| Property | Value |
|---|---|
| Internal padding | `24px` (`p: 3`) |
| Border radius | `12px` |
| Box shadow | `0 2px 8px rgba(0,0,0,0.08)` |
| Card margin | `0` (Grid handles gaps) |
| `height` | `100%` (equal-height cards) |

### 3.11 Report & Table Styling (from `reportpageStyle.md`)

**Tab Style:** Underline indicator (not filled background), accent-colored active tab.

**Accent Colors Per Report:**

| Report Tab | Accent | Summary Border |
|---|---|---|
| Sales | `#3B82F6` (blue) | `4px solid #3B82F6` |
| Profit | `#22C55E` (green) | `4px solid #22C55E` |
| Inventory | `#F59E0B` (amber) | `4px solid #F59E0B` |
| Category Sales | `#8B5CF6` (purple) | `4px solid #8B5CF6` |
| Customer Report | `#EC4899` (pink) | `4px solid #EC4899` |

**Table Specs:**

| Property | Light Mode | Dark Mode |
|---|---|---|
| Header bg | `#F1F5F9` | `#1E293B` |
| Header text | `#475569`, 600, 13px uppercase | `#94A3B8` |
| Row odd bg | `#FFFFFF` | `#334155` |
| Row even bg | `#F8FAFC` | `#2D3F55` |
| Row min height | `48px` | `48px` |
| Cell padding | `16px` horizontal | `16px` |
| Row border | `1px solid #E2E8F0` bottom | `1px solid #475569` |
| Positive values | `#22C55E` green | same |
| Negative values | `#EF4444` red | same |
| Currency columns | Right-aligned | Right-aligned |
| Text columns | Left-aligned | Left-aligned |

**DateRangePicker Container:** Light `#F8FAFC` rounded (`border-radius: 8px`, `padding: 12px 16px`), active period fills with accent at 10% opacity.

### 3.12 Performance Rules (from `performance-guide.md`)

**React Rendering:**

- `React.memo` on list items: `ProductRow`, `BillItemRow`, `CategoryAccordion`
- `useMemo` for expensive calculations: report aggregations, dashboard top-5, grand totals
- `useCallback` for all handler functions passed as props
- `React.lazy()` + `Suspense` for route-level code splitting

**Products Page (heaviest — 50 categories, 400+ items):**

- Only render expanded accordion content — collapsed shows header only
- Debounce search input (300ms) via `useDebounce` hook
- Consider `react-window` for very long item lists

**localStorage:**

- Read once on app load (in service), store in context — never read during render
- Debounce writes (500ms) on fast-changing fields

**Reports:**

- Calculate lazily — only when the Reports tab is opened
- All aggregations wrapped in `useMemo` with `[bills, dateRange]` dependency

**Bundle Size:**

- Import MUI components individually: `import Button from '@mui/material/Button'`
- Import only needed icons: `import InventoryIcon from '@mui/icons-material/Inventory'`

---

## 4. Data Models

### 4.1 Product Item (extended with costing)

```json
{
  "itemName": "1 அடி மாலை",
  "stack": 250,
  "buyingPrice": 105,
  "sellingPrice": 120,
  "avgCostPrice": 104,
  "purchaseLog": [
    { "date": "2026-03-10", "qty": 100, "buyingPrice": 100 },
    { "date": "2026-03-13", "qty": 200, "buyingPrice": 105 }
  ]
}
```

| Field | Type | Description | Updated When |
|---|---|---|---|
| `itemName` | string | Product name (Tamil) | Manual edit |
| `stack` | number | Current stock qty | +on purchase, −on sale |
| `buyingPrice` | number | Latest buy price (display) | On add stock or manual edit |
| `sellingPrice` | number | **Default** sell price (used as initial value during billing) | Editable anytime |
| `avgCostPrice` | number | Weighted average cost | Auto-recalculated on every purchase |
| `purchaseLog` | array | History of all purchases | Appended on every "Add Stock" |

### 4.2 Category Structure (products.json format)

```json
[
  {
    "categoryName": "வெட்டிவேர் மாலை",
    "items": [
      {
        "itemName": "1 அடி மாலை",
        "stack": 0,
        "buyingPrice": 0,
        "sellingPrice": 0,
        "avgCostPrice": 0,
        "purchaseLog": []
      }
    ]
  }
]
```

### 4.3 Bill Model

```json
{
  "id": "BILL-20260314-001",
  "date": "2026-03-14T10:30:00Z",
  "customerName": "Ravi Kumar",
  "customerMobile": "9876543210",
  "customerAddress": "12, Anna Nagar, Chennai",
  "gstNumber": "33AABCU9603R1ZM",
  "items": [
    {
      "categoryName": "வெட்டிவேர் மாலை",
      "itemName": "1 அடி மாலை",
      "quantity": 50,
      "costPrice": 104,
      "sellingPrice": 120,
      "total": 6000,
      "profit": 800
    }
  ],
  "grandTotal": 6000,
  "totalProfit": 800
}
```

| Field | Type | Description |
|---|---|---|
| `customerName` | string | **Mandatory** — Customer name |
| `customerMobile` | string | **Mandatory** — Customer mobile number (used as customer identifier) |
| `customerAddress` | string | Optional — Customer address for invoice |
| `gstNumber` | string | Optional — GST number for invoice |
| `costPrice` | number | `avgCostPrice` snapshot at time of sale (FROZEN — never changes) |
| `sellingPrice` | number | **Actual selling price used for this bill item** (may differ from product's default `sellingPrice` — editable per line item during billing). FROZEN after bill is created. |
| `profit` | number | `(sellingPrice - costPrice) × quantity` — uses the **actual bill selling price**, not the product default. FROZEN after bill is created. |

### 4.7 Customer Model

Customers are **auto-created** when a new mobile number is used during billing. No separate "Create Customer" flow.

```json
{
  "id": "CX-001",
  "name": "Ravi Kumar",
  "mobile": "9876543210",
  "address": "12, Anna Nagar, Chennai",
  "createdAt": "2026-03-14T10:30:00Z",
  "totalBills": 5,
  "totalAmount": 15000,
  "totalProfit": 3200
}
```

| Field | Type | Description | Updated When |
|---|---|---|---|
| `id` | string | Auto-generated unique ID (`CX-001`, `CX-002`...) | On creation |
| `name` | string | Customer name (updated if changed in a later bill) | On bill create |
| `mobile` | string | **Unique identifier** — used to match/lookup customer | On creation (immutable) |
| `address` | string | Latest address (updated from most recent bill) | On bill create |
| `createdAt` | string | ISO date of first bill | On creation |
| `totalBills` | number | Count of bills for this customer | Recalculated from bills |
| `totalAmount` | number | Σ `grandTotal` of all bills | Recalculated from bills |
| `totalProfit` | number | Σ `totalProfit` of all bills | Recalculated from bills |

**Customer Auto-Creation Rules:**

1. During billing, user enters `customerName` (mandatory) + `customerMobile` (mandatory)
2. On "Generate Bill", system checks if `customerMobile` exists in customers list
3. If **new mobile** → auto-create customer with name, mobile, address from bill
4. If **existing mobile** → update name & address if changed, link bill to customer
5. Customer `totalBills`, `totalAmount`, `totalProfit` are computed from bill data (not stored separately — derived on read)
6. Customer `mobile` is the **primary key** — two bills with same mobile = same customer

### 4.4 Weighted Average Costing Logic

```
On Add Stock (buy more):
  1. Append to purchaseLog: { date, qty, buyingPrice }
  2. stack += qty
  3. buyingPrice = new buy price (display only)
  4. avgCostPrice = (oldAvgCost × oldStack + newQty × newBuyPrice) / newStack

On Create Bill (sell):
  1. Snapshot avgCostPrice → billItem.costPrice
  2. sellingPrice may be edited per line item (defaults to product's sellingPrice)
  3. billItem.profit = (actualSellingPrice - costPrice) × quantity
  4. stack -= quantity
  5. avgCostPrice does NOT change on sale
  6. Product's default sellingPrice is NOT affected by per-bill edits
```

### 4.5 Product Update Actions Matrix

| Action | stack | buyingPrice | sellingPrice | avgCostPrice | purchaseLog | Past Bill Profits |
|---|---|---|---|---|---|---|
| **Add Stock** | +qty | = new price | unchanged | recalculated | new entry | unaffected |
| **Edit Selling Price** | unchanged | unchanged | = new price | unchanged | unchanged | unaffected |
| **Edit Item Name** | unchanged | unchanged | unchanged | unchanged | unchanged | unaffected |
| **Edit Buy Price** (display) | unchanged | = new price | unchanged | unchanged | unchanged | unaffected |
| **Delete Item** | removed | — | — | — | — | unaffected |
| **Bill Created** (sell) | −qty | unchanged | unchanged | unchanged | unchanged | frozen in bill |
| **Bill Sell Price Edit** | unchanged | unchanged | unchanged | unchanged | unchanged | only affects current bill item (frozen) |

### 4.6 Variable Selling Price (Per-Bill Override)

**Core Concept:** The product's `sellingPrice` is a **default/suggested price**, not a fixed price. During billing, each line item's selling price can be edited independently.

**Why:** In this shop, different customers may negotiate different prices for the same product. The selling price is not constant.

**How it works:**

```
Product (master):    sellingPrice = 120  (default, shown in Products page)

Bill A, Item X:      sellingPrice = 120  (used default)
Bill B, Item X:      sellingPrice = 110  (customer negotiated discount)
Bill C, Item X:      sellingPrice = 130  (premium customer)
```

**Rules:**

1. When adding an item to a bill, `sellingPrice` pre-fills from product default
2. User can edit selling price **per line item** in the bill form (inline-editable)
3. Editing bill selling price does **NOT** change the product's default `sellingPrice`
4. On "Generate Bill", the actual selling price used is **frozen** into the bill item
5. `profit = (actualSellingPrice - costPrice) × qty` — always uses the bill's selling price
6. Profit reports read **only from frozen bill data** — never from product defaults
7. Product page continues to show product default `sellingPrice` and `profit/unit` based on default
8. Invoice shows the actual selling price from the bill

**Affected Components:**

| Component | Change |
|---|---|
| `BillItemRow.jsx` | Sell ₹ column becomes inline-editable `TextField` |
| `BillForm.jsx` | Manages per-item sell price state, recalculates totals on change |
| `useCosting.js` → `createBillItem()` | Accepts optional `customSellingPrice` parameter |
| `useBilling.js` | Handles sell price override in bill state |
| `useReports.js` | No change needed — already reads from frozen bill data |
| `Invoice.jsx` | No change — already renders bill's `sellingPrice` |
| `ProductTable.jsx` | No change — shows product default price as before |

---

## 5. Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR (sticky top, 64px)                               │
│  [☰ Hamburger] "Sai Ram Lace House"  [🌐Lang] [🌙] [👤]  │
├──────────┬───────────────────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT (scrollable, route-based)       │
│ (240px   │  max-width: 1400px, centered, padding: 24px  │
│  full /  │                                               │
│  72px    │  Content renders via <Outlet />               │
│  icon-   │                                               │
│  only)   │                                               │
│          │                                               │
│ Dashboard│                                               │
│ Products │                                               │
│ Billing  │                                               │
│ Customers│                                               │
│ Reports  │                                               │
│ Settings │                                               │
└──────────┴───────────────────────────────────────────────┘
```

### Navbar

- Sticky top, height 64px
- Left: Hamburger (mobile) + Shop name "Sai Ram Lace House" (Inter 600, primary color)
- Right: Language menu (MUI IconButton + Menu), Dark mode toggle (sun/moon), Profile avatar menu

### Sidebar

- MUI Drawer: permanent on desktop (240px), icon-only on tablet (72px), temporary on mobile (hamburger)
- Background: `#0F172A` (navy), white text/icons
- Nav items with MUI ListItem + icons
- Active item: `#3B82F6` at 15% opacity background
- Smooth collapse animation (width transition 225ms)
- Bottom: collapse/expand toggle button

| Nav Item | Route | Icon |
|---|---|---|
| Dashboard | `/dashboard` | DashboardIcon |
| Products | `/products` | InventoryIcon |
| Billing | `/billing` | ReceiptIcon (sub: New Bill, History) |
| Customers | `/customers` | PeopleIcon |
| Reports | `/reports` | AssessmentIcon |
| Settings | `/settings` | SettingsIcon |

---

## 6. URL Routes

| URL | Page | Description |
|---|---|---|
| `/` | redirect → `/dashboard` | Default route |
| `/dashboard` | Dashboard | Analytics widgets |
| `/products` | Products | Category list + item management |
| `/billing` | Billing | Redirects to `/billing/new` |
| `/billing/new` | New Bill | Bill creation form |
| `/billing/history` | Bill History | Past bills list |
| `/customers` | Customers | Customer list + bill tracking |
| `/reports` | Reports | Sales/Profit/Inventory/Customer reports |
| `/settings` | Settings | Export/Import/Theme/Language |

---

## 7. Implementation Phases

### Phase 1: Project Setup & Layout Shell (Steps 1–4)

#### Step 1 — Initialize project

- Scaffold Vite + React
- Install all dependencies
- Add Inter font to `index.html`
- Copy `products.json` → `src/data/products.json`

#### Step 2 — Layout & Theme

- Create `src/theme.js` — MUI light + dark theme variants
- Create `src/components/templates/AppLayout.jsx` — Navbar + Sidebar + `<Outlet />`
- Implement responsive sidebar (permanent/icon-only/drawer)
- Implement navbar with language menu, dark mode toggle, profile menu

#### Step 3 — React Router

- Set up routes in `src/App.jsx`
- Wrap with `BrowserRouter`, context providers, `ThemeProvider`
- Redirect `/` → `/dashboard`

#### Step 4 — i18n Setup

- Create `src/i18n/index.js` with i18next config
- Create locale files: `en.json`, `ta.json` (default), `hi.json`
- Cover: nav items, buttons, form labels, table headers, status labels
- Product names stay in Tamil (not translated)

---

### Phase 2: Data Layer (Steps 5–6)

#### Step 5 — Services (Data Access Layer)

**`src/services/productService.js`**

```
getProducts()    → Read from localStorage 'laceShop_products'; seed from products.json if missing
saveProducts()   → Write to localStorage 'laceShop_products'
resetProducts()  → Re-seed from products.json, overwrite localStorage
```

**`src/services/billService.js`**

```
getBills()       → Read from localStorage 'laceShop_bills'
saveBills()      → Write to localStorage 'laceShop_bills'
addBill(bill)    → Append to bills array, save
deleteBill(id)   → Remove by ID, save
```

**`src/services/customerService.js`** (New)

```
getCustomers()          → Read from localStorage 'laceShop_customers'
saveCustomers()         → Write to localStorage 'laceShop_customers'
upsertCustomer(bill)    → Create or update customer from bill data (lookup by mobile)
getCustomerByMobile(m)  → Find customer by mobile number (for billing auto-fill)
```

**`src/services/settingsService.js`**

```
getSettings()    → Read from localStorage 'laceShop_settings'
saveSettings()   → Write to localStorage 'laceShop_settings'
```

**`src/services/exportService.js`**

```
exportAllData()      → Download JSON { products, bills, customers, settings }
importAllData(file)  → Parse JSON, validate, replace all localStorage data
```

#### Step 5b — Costing Utilities

**`src/hooks/useCosting.js`**

```
calculateAvgCost(purchaseLog, currentStack)
  → Weighted average from purchase history

addPurchase(item, qty, buyPrice, date)
  → Append to purchaseLog
  → stack += qty
  → buyingPrice = latest
  → Recalculate avgCostPrice

createBillItem(item, qty, customSellingPrice?)
  → Snapshot avgCostPrice as costPrice
  → sellingPrice = customSellingPrice ?? item.sellingPrice (use override if provided, else product default)
  → profit = (sellingPrice - costPrice) × qty
  → Return frozen bill item with actual selling price used
```

#### Step 6 — React Contexts

**`src/context/ProductContext.jsx`**

```
State: products array (nested category→items format)
Actions:
  addStock(catIdx, itemIdx, qty, buyPrice)
  editProduct(catIdx, itemIdx, { itemName?, sellingPrice?, buyingPrice? })
  deleteProduct(catIdx, itemIdx)
  addProduct(catIdx, item)
  addCategory(categoryName)
  editCategory(catIdx, newName)
  deleteCategory(catIdx)
```

**`src/context/BillContext.jsx`**

```
State: bills array
Actions: addBill(bill), deleteBill(id)
```

**`src/context/CustomerContext.jsx`** (New)

```
State: customers array
Actions:
  upsertCustomer(bill)           → Create or update from bill data
  getCustomerByMobile(mobile)    → Lookup for auto-fill during billing
```

**`src/context/SettingsContext.jsx`**

```
State: { shopName, shopAddress, shopPhone, shopGST, theme, language }
Actions: updateSettings(partial), toggleTheme()
```

---

### Phase 3: Dashboard — `/dashboard` (Step 7)

**`src/pages/Dashboard.jsx`** — Uses `useDashboard()` hook

- **Summary stats bar** (top): Total categories, Total items, Bills today, Revenue today
- **4 widget cards** (2×2 responsive grid):

| Widget | Data Source | Calculation |
|---|---|---|
| Most Selling (Top 5) | Bills | Sum qty sold per item |
| Least Selling (Top 5) | Bills | Lowest qty sold (sold at least once) |
| Least Stocked (Top 5) | Products | Lowest `stack` value |
| Most Stocked (Top 5) | Products | Highest `stack` value |

- Uses reusable `DashboardWidget` organism — accepts `title`, `data`, `columns` props
- To add new widgets later: just pass different data/columns

---

### Phase 4: Products — `/products` (Steps 8–8b)

**`src/pages/Products.jsx`** — Uses `useProducts()` hook

**Top bar:**

- SearchInput atom (filters categories + items, case-insensitive, works with Tamil)
- "Add Product" button → AddProductDialog
- "Add Category" button → AddCategoryDialog

**Category list (MUI Accordion per category):**

- **Header**: Category name + item count badge + Edit/Delete buttons
- **Body**: ProductTable organism with columns:

| Column | Description |
|---|---|
| Item Name | Product name |
| Stock | Current quantity (StockBadge atom: green/yellow/red) |
| Buy Price ₹ | Latest buying price (PriceText atom) |
| Avg Cost ₹ | Weighted average cost (auto-calculated, read-only) |
| Sale Price ₹ | Current selling price (inline-editable) |
| Profit/unit | `sellingPrice - avgCostPrice` |
| Actions | Edit / Add Stock / Delete |

**Dialogs:**

- **Add Product**: Select category OR new name → item name, qty, buy price, sell price → creates first purchaseLog entry
- **Add Category**: Category name → creates empty category
- **Add Stock**: Qty + new buy price → appends purchaseLog, recalculates avgCostPrice
- **Edit Product**: Update itemName, sellingPrice (no effect on past profits)
- **Delete**: Confirmation dialog

---

### Phase 5: Billing — `/billing` (Steps 9–12)

#### Step 9 — Billing sub-tabs (URL-driven)

- `/billing/new` → New Bill form
- `/billing/history` → Bill History table

#### Step 10 — New Bill (`src/pages/billing/NewBill.jsx`)

**Form flow:**

1. **Customer name** input — **mandatory** (MUI TextField, required, validation on empty)
2. **Customer mobile** input — **mandatory** (MUI TextField, type="tel", 10-digit validation)
3. **Customer address** input — optional (MUI TextField, multiline)
4. **GST number** input — optional (MUI TextField, 15-char GST format hint)
5. ItemSelector molecule: Category dropdown → Item dropdown → Shows stock & price → Qty input → "Add" button
6. Validates: qty ≤ available stock
7. Bill items table: S.No | Category | Item | Qty | Cost ₹ | **Sell ₹ (editable)** | Total ₹ | Profit ₹ | Remove
8. **Sell ₹ column is an inline-editable number field** — pre-filled with product's default `sellingPrice`, but user can change it per line item for this specific bill
9. Total ₹ and Profit ₹ auto-recalculate on sell price change
10. Auto-calculated: Subtotal, Total Profit, Grand Total — all reflect actual selling prices
11. **Generate Bill button disabled** until: customerName filled + customerMobile filled (10 digits) + at least 1 item added

**Customer Auto-Lookup:**

- As user types mobile number, system searches existing customers
- If mobile matches an existing customer → auto-fill name & address (editable)
- If new mobile → fields stay blank for manual entry
- On Generate Bill: new mobile → auto-creates customer; existing mobile → updates customer info

**Selling Price Edit Behavior:**

- When an item is added to the bill, Sell ₹ defaults to the product's `sellingPrice`
- User can click/tap the Sell ₹ cell to edit it (MUI `TextField` type="number", size="small")
- Editing the sell price in the bill does **NOT** change the product's default `sellingPrice`
- Total and Profit columns update in real-time as sell price changes
- The edited sell price is frozen into the bill when "Generate Bill" is clicked

**Generate Bill action:**

1. Validates: customerName not empty, customerMobile is 10 digits, at least 1 item
2. Freezes `avgCostPrice` → `costPrice` in each bill item
3. Freezes the **actual selling price** (default or edited) → `sellingPrice` in each bill item
4. Calculates `profit = (actualSellingPrice - costPrice) × qty` per item
5. Saves `customerName`, `customerMobile`, `customerAddress`, `gstNumber` into bill
6. Deducts stock: `stack -= qty` for each item
7. **Auto-creates/updates customer** in `CustomerContext` (lookup by mobile)
8. Saves bill to `BillContext` → localStorage
9. Shows printable Invoice

#### Step 11 — Bill History (`src/pages/billing/BillHistory.jsx`)

- Table: Bill No | Date | Customer | Items Count | Grand Total | Actions (View/Print/Delete)
- Search/filter by date range, customer name, bill number
- Click "View" → opens Invoice dialog

#### Step 12 — Invoice (`src/components/organisms/Invoice.jsx`)

- Print-friendly layout:
  - **Shop header**: Shop name + shop address + shop phone numbers (from settings)
  - **GST line**: Shop GST number (if configured in settings)
  - Bill number, date
  - **Customer block**: Customer name + mobile number + address (if provided) + GST number (if provided)
  - Itemized table: S.No | Item | Category | Qty | Rate ₹ | Amount ₹
  - Grand Total
- Print: `window.print()` with `@media print` CSS (hides sidebar/header)

---

### Phase 6: Reports — `/reports` (Steps 13–17)

**`src/pages/Reports.jsx`** — MUI Tabs for sub-reports, uses `useReports()` hook

#### Step 14 — Sales Report

- DateRangePicker molecule (Today / This Week / This Month / Custom)
- Table: Date | Bill Count | Total Sales ₹
- Summary card: Total Revenue for period

#### Step 15 — Profit Report

- DateRangePicker (Weekly / Monthly)
- Table: Period | Revenue | Cost | Profit | Margin %
  - Revenue = Σ `total` from bill items (uses **actual selling price** from each bill, not product default)
  - Cost = Σ `costPrice × quantity` (frozen at sale time)
  - Profit = Σ `profit` from bill items (**always accurate** — uses frozen actual sell price and cost price from each bill, unaffected by later product price changes or per-bill price edits on other bills)
- Top profitable items list
- Summary: Total Profit

> **Note:** Since selling price varies per bill, profit reports always read from the frozen bill data. The product's default `sellingPrice` is never used for historical profit calculations.

#### Step 16 — Inventory Report

- **Summary Widgets (top row, 4 cards):**
  - Categories — total category count
  - Total Stock — overall stock quantity across all products
  - Stock Value — total ₹ value at weighted average cost price: Σ (stack × avgCostPrice)
  - Sale Value — total ₹ value at selling price: Σ (stack × sellingPrice) — uses product's **default** `sellingPrice` (appropriate for inventory valuation)

- **Category-wise Product Breakdown (accordion list with search):**
  - Search input at the top — filters products by name across all categories (case-insensitive, works with Tamil)
  - Each category rendered as an expandable Accordion:
    - **Header**: Category name + item count chip + total stock chip + Stock Value ₹ + Sale Value ₹
    - **Expanded body**: Per-product table with columns: # | Item Name | Stock (color-coded chip: green/amber/red) | Avg Cost ₹ | Selling Price ₹ | Stock Value ₹ | Sale Value ₹
  - When searching: only categories with matching items (or matching category name) are shown; item counts and values reflect filtered items
  - Data source: `inventoryDetail` from `useReports()` — computed from `products` context (category → items with per-item stockValue/saleValue)
  - Totals in summary widgets: `inventoryTotals` from `useReports()` — aggregated from `inventoryReport`

#### Step 17 — Category Sales Report

- Table: Category | Units Sold | Revenue ₹ | Profit ₹
- Filterable by date range

#### Step 17b — Customer Report (New)

- **Top 5 Customers by Amount**: Table ranked by total purchase amount
  - Columns: Rank | Customer Name | Mobile | Total Bills | Total Amount ₹ | Total Profit ₹
- **Top 5 Customers by Profit**: Table ranked by total profit generated
  - Columns: Rank | Customer Name | Mobile | Total Bills | Total Amount ₹ | Total Profit ₹
- **Customer-wise Summary**: Full searchable table of all customers
  - Columns: Customer Name | Mobile | Bills Count | Total Amount | Profit | Last Bill Date
  - Filterable by date range
- Data source: Aggregated from `bills` array, grouped by `customerMobile`

---

### Phase 7b: Customers — `/customers` (Steps 19–20) (New)

#### Step 19 — Customer List Page

**`src/pages/Customers.jsx`** — Uses `useCustomers()` hook

**Top bar:**

- SearchInput atom (search by name or mobile number)
- Customer count badge

**Customer list (MUI Table):**

| Column | Description |
|---|---|
| Customer Name | Clickable → opens customer detail |
| Mobile | Phone number |
| Total Bills | Count of bills for this customer |
| Total Amount ₹ | Sum of all bill grandTotals |
| Last Bill Date | Date of most recent bill |
| Actions | View Bills |

- Sortable by name, amount, bills count, last bill date
- No manual "Create Customer" button — customers are auto-created via billing
- Click row or "View Bills" → opens **Customer Detail Dialog**

#### Step 20 — Customer Detail Dialog

- **Header**: Customer name + mobile + address
- **Stats row**: Total Bills | Total Amount | Total Profit | Avg Bill Value
- **Bill history table** (filtered to this customer):
  - Columns: Bill No | Date | Items Count | Grand Total | Actions (View/Print)
  - Click "View" → opens Invoice dialog
- Data: filters `bills` array by `customerMobile`

---

### Phase 8: Settings — `/settings` (Step 18)

**`src/pages/Settings.jsx`** — Uses `useSettings()` + `useExportImport()` hooks

| Section | Contents |
|---|---|
| **Shop Info** | Editable shop name, shop address, **shop phone numbers**, **shop GST number** (all used in invoices) |
| **Export Data** | Button → downloads `{ products, bills, customers, settings }` as JSON |
| **Import Data** | File upload → parse, validate, replace all data |
| **Reset Products** | Re-seeds from original `products.json` |
| **Clear Bills** | Deletes bill history (with confirmation) |
| **Language** | Tamil / English / Hindi selector |
| **Theme** | Dark / Light toggle |

---

## 8. i18n Structure

**Default language:** Tamil (`ta`)

**Files:**

- `src/i18n/locales/ta.json` — Tamil translations
- `src/i18n/locales/en.json` — English translations
- `src/i18n/locales/hi.json` — Hindi translations

**What's translated:**

- Navigation labels, button text, form labels, table headers, status labels, dialog titles, error messages, placeholder text

**What's NOT translated:**

- Product names (`itemName`) — always Tamil from `products.json`
- Category names (`categoryName`) — always Tamil from `products.json`

---

## 9. Complete File Structure

```
testApp/
├── products.json                        — Original seed data (root)
├── PLAN.md                              — This file
├── index.html                           — Inter font link
├── package.json
├── vite.config.js
│
└── src/
    ├── App.jsx                          — Router + Context + Theme providers
    ├── main.jsx                         — ReactDOM entry point
    ├── theme.js                         — MUI createTheme (light + dark)
    │
    ├── i18n/
    │   ├── index.js                     — i18next init config
    │   └── locales/
    │       ├── en.json
    │       ├── ta.json
    │       └── hi.json
    │
    ├── data/
    │   └── products.json                — Seed data (copied from root)
    │
    ├── services/                        — DATA ACCESS LAYER
    │   ├── productService.js            — Product localStorage CRUD
    │   ├── billService.js               — Bill localStorage CRUD
    │   ├── customerService.js           — Customer localStorage CRUD (New)
    │   ├── settingsService.js           — Settings localStorage CRUD
    │   └── exportService.js             — JSON export/import
    │
    ├── hooks/                           — BUSINESS LOGIC LAYER
    │   ├── useProducts.js               — Product CRUD + search/filter
    │   ├── useBilling.js                — Bill creation + stock deduction + customer upsert
    │   ├── useCosting.js                — Avg cost calc + purchase log + bill item snapshot
    │   ├── useReports.js                — Report aggregation + date filtering + customer report
    │   ├── useDashboard.js              — Top 5 analytics calculations
    │   ├── useCustomers.js              — Customer list, search, detail (New)
    │   ├── useSettings.js               — Shop info + theme + language
    │   └── useExportImport.js           — Export/import orchestration
    │
    ├── context/                         — REACT CONTEXT (state providers)
    │   ├── ProductContext.jsx            — Products state + dispatch
    │   ├── BillContext.jsx               — Bills state + dispatch
    │   ├── CustomerContext.jsx           — Customers state + dispatch (New)
    │   └── SettingsContext.jsx           — Settings state + dispatch
    │
    ├── components/                      — PRESENTATION LAYER (Atomic Design)
    │   ├── atoms/
    │   │   ├── PriceText.jsx
    │   │   ├── StockBadge.jsx
    │   │   ├── SearchInput.jsx
    │   │   ├── ConfirmDialog.jsx
    │   │   ├── StatusChip.jsx
    │   │   └── PrintButton.jsx
    │   │
    │   ├── molecules/
    │   │   ├── ProductRow.jsx
    │   │   ├── BillItemRow.jsx
    │   │   ├── CategoryHeader.jsx
    │   │   ├── ItemSelector.jsx
    │   │   ├── DateRangePicker.jsx
    │   │   ├── LanguageMenu.jsx
    │   │   └── ProfileMenu.jsx
    │   │
    │   ├── organisms/
    │   │   ├── ProductTable.jsx
    │   │   ├── BillForm.jsx
    │   │   ├── BillHistoryTable.jsx
    │   │   ├── DashboardWidget.jsx
    │   │   ├── Invoice.jsx
    │   │   ├── ReportTable.jsx
    │   │   ├── CustomerTable.jsx            — Customer list table (New)
    │   │   ├── CustomerDetailDialog.jsx     — Customer detail + bill history dialog (New)
    │   │   └── CategoryAccordion.jsx
    │   │
    │   └── templates/
    │       └── AppLayout.jsx            — Navbar + Sidebar + Outlet
    │
    └── pages/                           — ROUTE PAGES
        ├── Dashboard.jsx
        ├── Products.jsx
        ├── Customers.jsx                    — Customer management page (New)
        ├── billing/
        │   ├── NewBill.jsx
        │   └── BillHistory.jsx
        ├── Reports.jsx
        └── Settings.jsx
```

**Total: ~50 files**

---

## 10. Verification Checklist

| # | Test | Expected |
|---|---|---|
| 1 | Navigate each URL manually | Correct page renders, sidebar highlights active |
| 2 | Switch language (Tamil → English → Hindi) | All UI labels update, product names stay Tamil |
| 3 | Dashboard widgets | Correct top 5 lists based on stock/bill data |
| 4 | Products: search | Filters categories + items (Tamil text) |
| 5 | Products: add/edit/delete item | Data updates, persists on refresh |
| 6 | Products: add stock (buy more) | purchaseLog appended, avgCostPrice recalculated, stack increased |
| 7 | Products: edit selling price | Only sellingPrice changes, past bill profits unaffected |
| 8 | Billing: create bill | Stock deducted, bill saved with frozen costPrice/profit, customer auto-created |
| 8b | Billing: edit sell price per item | Change sell price in bill → Total/Profit update in real-time. Product default sellingPrice unchanged |
| 8c | Billing: bill with mixed prices | Bill with same item at different sell prices → each line item has its own frozen sellingPrice/profit |
| 8d | Billing: mandatory fields | Generate Bill disabled until customerName + customerMobile (10 digits) + at least 1 item |
| 8e | Billing: customer auto-fill | Type existing mobile → name & address auto-fill. New mobile → fields blank |
| 8f | Billing: customer auto-create | New mobile on Generate Bill → customer created in Customers list |
| 8g | Billing: invoice has full details | Invoice shows shop address/phone, customer name/mobile/address, GST if provided |
| 9 | Billing: bill shows in history | View/print/delete work |
| 10 | Billing: print invoice | Clean print layout, shop + customer details, sidebar/header hidden |
| 11 | Reports: sales | Date-filtered totals match expected values |
| 12 | Reports: profit | Reads frozen profit from bills — always accurate |
| 13 | Reports: inventory summary | 4 summary widgets (Categories, Total Stock, Stock Value, Sale Value) show correct totals |
| 13a | Reports: inventory breakdown | Category-wise accordion shows per-product Stock/AvgCost/SellPrice/StockValue/SaleValue |
| 13b | Reports: inventory search | Search filters products by name across categories, hides non-matching categories |
| 13c | Reports: customer report | Top 5 customers by amount/profit, customer summary table |
| 14 | Settings: export | Downloads valid JSON with products + bills + customers + settings |
| 15 | Settings: import | Restores data correctly (including customers) |
| 16 | Settings: reset products | Re-seeds from original products.json |
| 16b | Settings: shop info | Shop name, address, phone, GST editable and reflected in invoices |
| 17 | Dark mode toggle | Full theme switch, sidebar stays navy |
| 18 | Mobile responsive | Sidebar collapses, cards stack, tables scroll horizontally |
| 19 | Refresh browser | All data persists from localStorage |
| 20 | Customers: list page | Searchable customer table with stats |
| 21 | Customers: detail dialog | Shows customer info + filtered bill history |
| 22 | Customers: bill tracking | All bills for a customer accessible from Customers page |

---

## 11. Key Decisions

| Decision | Rationale |
|---|---|
| **Material UI** (not Tailwind) | Richer component library, built-in accessibility, theming |
| **React Router** for navigation | Bookmarkable URLs, browser back/forward, SEO-friendly |
| **i18next** for i18n | Industry standard, Tamil default, lazy-loadable |
| **Weighted average costing** | Accurate profit tracking when buy prices change frequently |
| **Frozen profits in bills** | Price changes never corrupt historical profit data |
| **Nested products.json format preserved** | Same structure in localStorage, state, and export |
| **3 separate Contexts** | Interface segregation — components subscribe only to what they need |
| **4th Context: CustomerContext** | Separate customer state for customer management + billing auto-fill, decoupled from bills |
| **Atomic Design** | Consistent, reusable, testable UI components |
| **3-Layer Architecture** | Clean separation of concerns, easy to test/maintain |
| **localStorage** (no backend) | Fully client-side, zero server cost |
| **DashboardWidget pattern** | Add new analytics by passing props, no code change |
| **Stock auto-deducted on billing** | Inventory stays accurate |
| **Product names stay Tamil** | Original data preserved, not translated |
| **Variable selling price per bill** | Selling price is editable per line item during billing. Product `sellingPrice` is a default/suggested price only. Each bill item freezes the actual price used — profit reports always use frozen bill data, never product defaults. |
| **Customer auto-creation via billing** | No separate "Create Customer" form. Customers are created automatically when a new mobile number is used in billing. Mobile number is the unique key. |
| **Mandatory customer info on billing** | Customer name + mobile are required to generate a bill. Ensures every bill is trackable to a customer. |
| **Customer report in Reports tab** | Top 5 customers by amount/profit + full customer summary — helps identify key customers. |

---

## 12. Implementation Order (Dependency Graph)

```
Step 1  (Project init)
  ↓
Step 2  (Layout + Theme)  ←parallel→  Step 4 (i18n)
  ↓
Step 3  (Router)
  ↓
Step 5  (Services)  →  Step 5b (Costing utils)
  ↓
Step 6  (Contexts)
  ↓
Step 7 (Dashboard)  ←parallel→  Step 8 (Products)  ←parallel→  Step 9-12 (Billing + Customer auto-create)
  ↓
Step 13-17 (Reports incl. Customer Report)  ←parallel→  Step 19-20 (Customers page)
  ↓
Step 18 (Settings)
  ↓
Verification & Testing
```

**Parallelizable:**

- Steps 2 + 4 (layout and i18n are independent)
- Steps 7, 8, 9 (Dashboard, Products, Billing are independent once data layer is done)

**Blockers:**

- Steps 5–6 must complete before any page (7, 8, 9)
- Step 5b (costing) must complete before billing (Step 10)
