---
name: Papercraft Subtle
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#45474c'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#9b4500'
  on-secondary: '#ffffff'
  secondary-container: '#fd8a42'
  on-secondary-container: '#682c00'
  tertiary: '#051426'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b293b'
  on-tertiary-container: '#8290a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e9e1dd'
typography:
  display-lg: { fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: '600', lineHeight: 44, letterSpacing: -0.02em }
  display-lg-mobile: { fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: '600', lineHeight: 34, letterSpacing: -0.015em }
  headline-lg: { fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: '600', lineHeight: 30, letterSpacing: -0.01em }
  headline-md: { fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: '500', lineHeight: 26, letterSpacing: -0.01em }
  headline-sm: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: '500', lineHeight: 24 }
  body-lg: { fontFamily: 'Inter', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: -0.005em }
  body-md: { fontFamily: 'Inter', fontSize: 14, fontWeight: '400', lineHeight: 20 }
  body-sm: { fontFamily: 'Inter', fontSize: 13, fontWeight: '400', lineHeight: 18, letterSpacing: 0.005em }
  label-lg: { fontFamily: 'Inter', fontSize: 14, fontWeight: '500', lineHeight: 18, letterSpacing: 0.01em }
  label-md: { fontFamily: 'Inter', fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 0.015em }
  label-mono: { fontFamily: 'Space Mono', fontSize: 11, fontWeight: '400', lineHeight: 14, letterSpacing: 0.04em }
  caption: { fontFamily: 'Inter', fontSize: 11, fontWeight: '400', lineHeight: 14, letterSpacing: 0.01em }
rounded:
  sm: 4
  DEFAULT: 6
  md: 8
  lg: 10
  xl: 12
  full: 9999
---

## Brand & Style
The design system operates at the intersection of high-grade mid-century stationery and crisp, utilitarian digital interface engineering. Drawing inspiration from tactile paper stocks, archival print design, and contemporary mobile toolkits, it treats the screen as an illuminated parchment surface rather than a cold sheet of glass.

The aesthetic marries restrained modernism with subtle tactile cues: precision 1px ink borders, dense letterpress-like micro shadows, and warm alabaster planes. The emotional response is one of reliability, intellectual clarity, and physical presence.

## Colors
- **Canvas & Surfaces:** Base `#FAFAF7` (alabaster), Elevated card `#FFFFFF`, Inset well `#F4F3EE`.
- **Ink:** Headings `#1C1917`, Body `#292524`, Muted `#78716C`.
- **Borders:** Default `#E2E0D8`, Strong `#D6D3CD`, hairline `#EAE8E1`; interactive emphasis border `#332F2B`.
- **Accents:** Primary heritage slate `#1E293B` (buttons, active nav, focus); Secondary burnished amber `#B45309`; success `#15803D`, warning `#B45309`, critical `#B91C1C`, informational `#0369A1`.
- **Soft tone fills (badges):** emerald-50/200, sky-50/200, amber-50/200, red-50/300 pairs with -800 text.

## Typography
Space Grotesk for display/headings; Inter for body and controls; Space Mono for metadata, counters and tags (uppercase, 0.04em tracking).

## Elevation & Depth
- Level 1 (cards): 1px border `#E2E0D8`, shadow `0 1px 2px rgba(28,25,23,0.04)`.
- Level 2 (dropdowns): 1px border `#D6D3CD`, shadow `0 2px 4px rgba(28,25,23,0.05)`.
- Level 3 (dialogs/sheets): 1px border `#D6D3CD`, shadow `0 8px 16px -2px rgba(28,25,23,0.08)`.
- Pressed: surface → `#F4F3EE`, shadows collapse.
- **Tactile controls** (buttons, chips, segmented, switch): 1.5px hard cast `1.5px 1.5px 0px rgba(27,24,21,0.9)`; pressed translates +1px/+1px, cast collapses to none.

## Shapes
Chips/badges/toggles 8px; cards/inputs/buttons/dialogs 12px; micro elements 6px; avatars and status pips circular.

## Components
- **Buttons:** Primary `#1E293B` bg, white text, ink border, 1.5px cast; Secondary paper outline; Tonal container-high; Destructive red-50 bg/red-300 border/error text; Ghost transparent. h44 (40 in catalog grid), radius 8, label Inter semibold 12px.
- **Cards:** white, 1px `#E2E0D8`, radius 12; hairline dividers `#EAE8E1`.
- **Inputs:** h44, bg `#FAF9F6`, 1px `#D6D3CD`, radius 8; focus white bg + primary border.
- **Checkbox:** 18px, 4px radius, active primary fill + white check. **Radio:** 18px circle, active 8px primary bullet. **Switch:** 48x28 pill, active primary, white thumb with grooves.
- **Chips:** h28 radius 8, well bg; active primary bg white text + check. **Badges:** h20-24, radius 6, soft tone bg + tone border + 6px dot, 11px Inter.
- **Lists:** 52px rows, 36px icon wells, chevron `#A8A29E`, hairline separators.
