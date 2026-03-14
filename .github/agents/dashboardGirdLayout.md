# Sai Ram Lace House — Layout, Spacing & Grid Guide

> Covers parent padding, widget margins, and grid layout for Dashboard and Reports pages.

---

## 1. Full Prompt to Use

> "Fix the layout spacing across Dashboard and Reports pages. The main content area must have `padding: 24px` on desktop and `padding: 16px` on mobile — applied to the parent container, not individual cards. Use MUI `Grid` container with `spacing={3}` (24px gap) as the root layout for both Dashboard widgets and Reports sections. Each widget/card must have `margin: 0` (let the Grid handle spacing — never add manual margins to cards inside a Grid). Dashboard widgets should use `Grid item xs={12} sm={6} lg={6}` for a clean 2×2 layout on desktop, full width on mobile. Reports layout should use `Grid item xs={12}` for the filter bar and summary card (full width), then `Grid item xs={12}` for the data table (full width). Add `mb: 3` (24px bottom margin) between the DateRangePicker row and the summary card, and between the summary card and the table. All cards must use consistent `padding: 24px` inside, `border-radius: 12px`, and `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`. No hardcoded pixel margins anywhere on individual cards."

---

## 2. Parent Container Rules

The content area (right of sidebar) must always have padding applied at the **page level**, not per-card.

```jsx
// ✅ Correct — padding on the page wrapper
<Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
  <Grid container spacing={3}>
    ...
  </Grid>
</Box>

// ❌ Wrong — padding on every card individually
<Card sx={{ p: 3, mt: 2, ml: 2, mr: 2 }}>  // Never add mt/ml/mr on cards inside Grid
```

| Property | Desktop | Mobile |
|---|---|---|
| Page padding | `24px` (`p: 3`) | `16px` (`p: 2`) |
| Max content width | `1400px` | `100%` |
| Horizontal centering | `mx: 'auto'` | `mx: 'auto'` |

---

## 3. Grid Layout Rules

Always use MUI `Grid` container + items. **Never use manual margins between cards.**

```jsx
// ✅ Correct grid setup
<Grid container spacing={3}>        // spacing={3} = 24px gap between all items
  <Grid item xs={12} sm={6}>        // card takes half width on sm+
    <Card>...</Card>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Card>...</Card>
  </Grid>
</Grid>

// ❌ Wrong — manual spacing
<Card sx={{ mb: 2, mr: 2 }}>       // Never add mb/mr/ml/mt to cards inside Grid
```

**Golden rule:** Grid `spacing` handles ALL gaps between cards. Cards inside Grid items must have `margin: 0`.

---

## 4. Dashboard Widget Grid Layout

2×2 on desktop, 1 column on mobile.

```jsx
<Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>

  {/* Summary stats bar — full width */}
  <Grid container spacing={3} sx={{ mb: 3 }}>
    <Grid item xs={6} sm={3}>
      <StatCard title="Total Categories" value={51} />
    </Grid>
    <Grid item xs={6} sm={3}>
      <StatCard title="Total Items" value={400} />
    </Grid>
    <Grid item xs={6} sm={3}>
      <StatCard title="Bills Today" value={bills} />
    </Grid>
    <Grid item xs={6} sm={3}>
      <StatCard title="Revenue Today" value={revenue} />
    </Grid>
  </Grid>

  {/* 4 widgets — 2×2 grid */}
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <DashboardWidget title="Most Selling" ... />
    </Grid>
    <Grid item xs={12} sm={6}>
      <DashboardWidget title="Least Selling" ... />
    </Grid>
    <Grid item xs={12} sm={6}>
      <DashboardWidget title="Least Stocked" ... />
    </Grid>
    <Grid item xs={12} sm={6}>
      <DashboardWidget title="Most Stocked" ... />
    </Grid>
  </Grid>

</Box>
```

### Dashboard Breakpoints

| Screen | Columns | Widget Width |
|---|---|---|
| Mobile `xs` < 600px | 1 column | Full width |
| Tablet `sm` 600–1199px | 2 columns | Half width |
| Desktop `lg` ≥ 1200px | 2 columns | Half width |

---

## 5. Reports Page Grid Layout

Each report tab follows this 3-row structure inside a Grid.

```jsx
<Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
  <Grid container spacing={3}>

    {/* Row 1 — Filter bar (full width) */}
    <Grid item xs={12}>
      <DateRangePicker />
    </Grid>

    {/* Row 2 — Summary card (full width) */}
    <Grid item xs={12}>
      <SummaryCard />
    </Grid>

    {/* Row 3 — Data table (full width) */}
    <Grid item xs={12}>
      <ReportTable />
    </Grid>

  </Grid>
</Box>
```

### Profit Report — Split Summary Cards

For the Profit report, split the summary into 3 cards side by side:

```jsx
<Grid item xs={12} sm={4}>
  <SummaryCard title="Total Revenue" value={revenue} accent="#3B82F6" />
</Grid>
<Grid item xs={12} sm={4}>
  <SummaryCard title="Total Cost" value={cost} accent="#F59E0B" />
</Grid>
<Grid item xs={12} sm={4}>
  <SummaryCard title="Total Profit" value={profit} accent="#22C55E" />
</Grid>
```

### Inventory Report — Split Summary Cards

```jsx
<Grid item xs={12} sm={6}>
  <SummaryCard title="Stock Value" value={stockValue} accent="#F59E0B" />
</Grid>
<Grid item xs={12} sm={6}>
  <SummaryCard title="Sale Value" value={saleValue} accent="#22C55E" />
</Grid>
```

---

## 6. Card Internal Spacing

Every card — widget, summary, table wrapper — must use consistent internal padding.

| Property | Value |
|---|---|
| Internal padding | `24px` (`p: 3`) |
| Border radius | `12px` |
| Box shadow | `0 2px 8px rgba(0,0,0,0.08)` |
| Card margin | `0` — Grid handles gaps |
| Card title margin-bottom | `16px` (`mb: 2`) |
| Row spacing inside card | `8px` (`gap: 1`) |

```jsx
// ✅ Correct card structure
<Card sx={{
  p: 3,               // 24px inner padding
  borderRadius: 3,    // 12px
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  m: 0,               // Never add margin — Grid handles gaps
  height: '100%',     // Fill Grid item height for equal-height cards
}}>
  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
    Widget Title
  </Typography>
  {/* content */}
</Card>
```

---

## 7. Spacing Reference Table

| Location | Property | Value |
|---|---|---|
| Page wrapper padding (desktop) | `p` | `24px` (`p: 3`) |
| Page wrapper padding (mobile) | `p` | `16px` (`p: 2`) |
| Grid gap between cards | `spacing` | `3` = `24px` |
| Card internal padding | `p` | `24px` (`p: 3`) |
| Card title → content gap | `mb` on title | `16px` (`mb: 2`) |
| Summary stats bar → widgets gap | `mb` on stats Grid | `24px` (`mb: 3`) |
| Filter bar → summary card gap | Grid `spacing={3}` | automatic |
| Summary card → table gap | Grid `spacing={3}` | automatic |
| Card margin | `m` | `0` always |

---

## 8. What to Avoid

| ❌ Wrong | ✅ Correct |
|---|---|
| `<Card sx={{ mt: 2, mr: 2 }}>` | Let Grid `spacing` handle all gaps |
| `<Box sx={{ padding: '8px' }}>` on page | Use `p: { xs: 2, md: 3 }` on page wrapper |
| `<Grid container>` without `spacing` | Always set `spacing={3}` |
| Fixed `width: 500px` on cards | Use Grid breakpoints (`xs`, `sm`, `lg`) |
| Cards with different padding values | Always `p: 3` (24px) on every card |
| `height: auto` on sibling cards | Use `height: '100%'` so cards in same row are equal height |

---

## 9. Equal Height Cards (Important)

Cards in the same Grid row must stretch to equal height. Without this, shorter cards look misaligned.

```jsx
// On the Grid item
<Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
  <Card sx={{ p: 3, borderRadius: 3, width: '100%', height: '100%' }}>
    ...
  </Card>
</Grid>
```

Or use `alignItems: 'stretch'` on the container:

```jsx
<Grid container spacing={3} alignItems="stretch">
  <Grid item xs={12} sm={6}>
    <Card sx={{ height: '100%' }}>...</Card>
  </Grid>
</Grid>
```