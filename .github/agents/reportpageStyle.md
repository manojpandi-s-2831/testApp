# Sai Ram Lace House — Reports Tab and Dashboard Tab Styling Guide

> How to ask for a polished, professional Reports page without breaking readability.

---

## 1. Full Prompt to Use

> "Redesign the Reports page tabs and tables to feel structured and professional — not plain. Each sub-tab (Sales, Profit, Inventory, Category Sales) should have a clear active indicator — underline style tab with the accent color, not a filled background tab. The summary card at the top of each report should have a soft colored left border (4px) matching the report type, white background, `border-radius: 12px`, `padding: 24px`, and `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`. The data table should have a light colored header row (e.g. `#F1F5F9` background, `#475569` text, `font-weight: 600`, `font-size: 13px`, uppercase letters). Table rows should alternate between `#FFFFFF` and `#F8FAFC`. Each row should have `48px` min height and `16px` horizontal cell padding. Positive profit/revenue values should display in `#22C55E` (green), negative or zero in `#EF4444` (red). Currency values right-aligned, text columns left-aligned. No heavy borders — only a single `1px #E2E8F0` bottom border per row. Keep full dark mode compatibility."

---

## 2. Why Each Part Matters

**"Underline style tab, not filled background"**
Filled tabs feel like buttons — underline tabs feel like a proper report navigator. Cleaner for a data-heavy page.

**"Summary card with colored left border"**
Same principle as dashboard widgets — gives each report section a visual anchor without painting the whole card a loud color.

**"Table header — light bg + uppercase + weight 600"**
This is the most common reason report tables look plain. A distinct header row immediately tells the user "this is a data table" and makes columns scannable.

**"Alternating row colors `#FFFFFF` / `#F8FAFC`"**
Removes the blank wall of white rows. Helps the eye track across wide rows without losing position.

**"Green for positive, red for negative values"**
Standard financial table convention. Users instantly understand profit health without reading the number carefully.

**"Right-aligned currency, left-aligned text"**
Columns of numbers must be right-aligned so decimal points stack — this is a readability rule, not a style preference.

**"No heavy borders — only bottom border per row"**
Grid lines everywhere make tables feel cramped. One subtle bottom border per row keeps structure without noise.

---

## 3. Color Map Per Report Tab

| Report Tab | Accent Color | Header Tint | Summary Border |
|---|---|---|---|
| Sales Report | `#3B82F6` (blue) | `#EFF6FF` | `#3B82F6` |
| Profit Report | `#22C55E` (green) | `#F0FDF4` | `#22C55E` |
| Inventory Report | `#F59E0B` (amber) | `#FFFBEB` | `#F59E0B` |
| Category Sales | `#8B5CF6` (purple) | `#F5F3FF` | `#8B5CF6` |
| Customer Report | `#EC4899` (pink) | `#FDF2F8` | `#EC4899` |

---

## 4. DateRangePicker Styling

Add this to your prompt if the date filter looks plain:

> "The DateRangePicker filter bar should sit in a light `#F8FAFC` rounded container (`border-radius: 8px`, `padding: 12px 16px`) above the table — not floating loosely. Active selected period button should fill with the accent color at 10% opacity with a solid accent border."

---

## 5. Table Spec at a Glance

| Property | Value |
|---|---|
| Header background | `#F1F5F9` |
| Header text color | `#475569` |
| Header font weight | `600` |
| Header font size | `13px` (uppercase) |
| Row odd background | `#FFFFFF` |
| Row even background | `#F8FAFC` |
| Row min height | `48px` |
| Cell horizontal padding | `16px` |
| Row border | `1px solid #E2E8F0` (bottom only) |
| Positive value color | `#22C55E` (green) |
| Negative / zero color | `#EF4444` (red) |
| Currency alignment | Right |
| Text column alignment | Left |
| Card border-radius | `12px` |
| Card padding | `24px` |
| Card shadow | `0 2px 8px rgba(0,0,0,0.08)` |
| Left border accent | `4px solid <accent color>` |

---

## 6. What to Avoid Saying

| ❌ Vague | ✅ Specific |
|---|---|
| "make the table look nicer" | Specify header row treatment and row height |
| "add colors to the table" | Risks colored cell backgrounds that hurt readability |
| "improve the reports UI" | Too broad — no actionable direction |
| "make it colorful" | May produce garish output |

> Always specify: tab style, header row treatment, row height, alignment rules, value color logic, and border style — these are the exact levers that turn a plain table into a professional report.

---

## 7. Dark Mode Compatibility Notes

- Summary card background → `#334155` (dark card)
- Header row background → `#1E293B`
- Header text → `#94A3B8`
- Row odd → `#334155`
- Row even → `#2D3F55`
- Row border → `1px solid #475569`
- Accent colors stay the same in both modes
- Sidebar stays `#0F172A` navy in both modes