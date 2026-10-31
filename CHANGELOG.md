# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.4.0] — 2026-10-31

Mochi Press: a tactile, soft-retro visual rebuild on the same zero-dependency
engine.

### Added

- Three typographic voices with new `theme.fonts` slots: display
  (`displayRegular` / `displayMedium` / `displaySemibold`) for `display` through
  `subtitle`, and mono (`monoRegular` / `monoBold`) for `overline` and `mono`.
  Body variants keep the sans `regular` / `medium` / `semibold` slots.
- Warm paper depth: `Surface` exposes `cast` (0–3), a shared `Cast` primitive
  sits behind every key, and `primaryOutline` plus tone `*Outline` tokens carry
  tinted borders.
- `softElevation(level, color)` now takes the theme shadow color, so floating
  layers keep their light/dark warmth without a separate opacity knob.
- New four-screen Expo showcase (Kit, Forms, Layers, Tokens) with Fraunces,
  DM Sans and DM Mono loaded through `@expo-google-fonts`.

### Changed

- Full Mochi Press palette and type scale: oat-cream paper, espresso ink,
  blueberry primary, soft-cut controls, retuned radii (3–16), metrics
  (34/44/52, 30/40/48, 46/54) and motion (110/170/240/220 ms).
- Press model: keys shift down 1px (framed keys scale to 0.985–0.99) and
  collapse their 2px warm cast; flat keys tint instead.
- Depth split: in-flow surfaces use the unblurred `cast`; menus, dialogs,
  sheets, snackbars and tooltips use blurred `softElevation` at `xl` radius
  with an `outlineStrong` hairline.
- Card defaults to `elevation={1}` (a `cast`), `xl` radius; pressable cards
  tint `surfaceMuted` and collapse their cast.
- IconButton defaults to `outline` with 30/40/48 boxes and a 50% icon; Chip
  selected fills a solid tone and every enabled chip carries an `outlineStrong`
  border; Badge defaults to `neutral` with a status pip; ProgressBar defaults
  to a 12dp gauge.
- ProgressBar now exposes the `progressbar` role and, when determinate, its
  `accessibilityValue`. Badge hides zero counts unless `showZero`.
- README and documentation rewritten for Mochi Press; package, example and
  website bumped to 0.4.0.

### Fixed

- The component reference now matches the shipped APIs: `Surface` uses `cast`
  (never `elevation`), `outlined` defaults to true and `radius` to `xl`;
  Avatar is documented as always circular; Menu, Dialog and BottomSheet report
  `xl` radius and soft shadows; control sizes, Chip fills, FAB shape, menu row
  heights and text metrics are corrected.

## [0.3.0] — 2026-10-27

A ground-up redesign: same package, completely new engine and visual language.

### Added

- Token-based theme system: semantic color grammar (`surface*` / `on*` /
  `*Muted` / `outline*` / `inverse*` across five tones), 4pt spacing scale,
  restrained radii, control metrics, motion durations, and a zIndex layering
  contract — with light and dark reference palettes tuned for AA contrast.
- Core primitives: `Portal` / `PortalHost` (zIndex-sorted overlay teleporting),
  `Text` (typed variants), `Surface`, `Divider`, `Pressable`, `Icon` adapter
  (`setIconRenderer`).
- Actions: `Button` (solid/tonal/outline/ghost × 5 tones), `IconButton`, `FAB`,
  `FABGroup`, `Chip` (assist/filter/input), `SegmentedButtons`, `ToggleButton`
  + `ToggleButtonGroup`.
- Inputs: `TextInput`, `Checkbox`, `Radio` + `RadioGroup`, `Switch`, `Slider`
  (PanResponder drag, adjustable a11y actions), `Searchbar`, `Select`.
- Feedback: `ActivityIndicator`, `ProgressBar` (determinate + indeterminate),
  `Skeleton`, `Banner`, `Snackbar`, imperative `Toast` system
  (`ToastProvider` / `useToast`).
- Overlays: `Dialog`, `AlertDialog`, `Modal`, `BottomSheet`, `Menu` /
  `MenuItem`, `Tooltip` — all Portal-based, layered by `theme.zIndex`.
- Display & navigation: `Avatar`, `Badge`, compound `Card`, `List` with
  `ListAccordion`, `Collapsible`, `Tabs` (animated indicator), compound
  `Appbar`, `BottomNavigation`, `Drawer`, compound `DataTable` with pagination.
- Toolchain: strict TypeScript 5.9, dual CJS/ESM build with declarations,
  ESLint 10 flat config, Prettier, Jest 30 + Testing Library suite,
  GitHub Actions CI, CONTRIBUTING with component conventions.

### Changed

- **Zero runtime dependencies.** Peer dependencies are now exactly
  `react >= 18.2` and `react-native >= 0.74`. Reanimated, Gesture Handler,
  expo-blur, expo-linear-gradient and masked-view are no longer used — no Babel
  plugin, no host-app configuration.
- New design language: calm and professional — hairline borders over heavy
  shadows, small radii, one restrained accent, quiet motion (no springs, no
  bounce), neutral disabled states.
- Build output is tree-shakeable (`sideEffects: false`) with `exports` maps.

### Removed

- The comic-era decorative components: `PencilBurst`, `GradientBackground`,
  and the gradient/blur effects they depended on. The legacy implementation is
  preserved on the `legacy/comic-ui` branch.

## [0.2.0]

Initial published prototype — playful/comic design, Reanimated-based
animations, gradient components.

## [0.1.0]

Prototype.
