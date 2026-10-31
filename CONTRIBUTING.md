# Contributing to MeowUI

Thanks for helping build a warm, tactile UI kit for React Native. This document
defines the conventions every component must follow — they exist so the kit feels
like it was designed by one person.

## Principles

1. **Zero runtime dependencies.** The only peer dependencies are `react` and
   `react-native`. No animation libraries, no gesture libraries, no utility libs.
   Use React Native's built-in `Animated` (with `useNativeDriver: true` for
   opacity/transform) and `Pressable`.
2. **Mochi Press visual language.** Oat-cream grounds, espresso ink, blueberry
   keys, 1px warm hairlines, 2px paper casts under controls and cards, blurred
   `softElevation` only for floating layers. Fraunces + DM Sans + DM Mono
   voices, mechanical press states (shift down 1px, slight scale on framed keys,
   cast collapses) — see `stitch_mochi_press/DESIGN.md`.
3. **Structure over decoration.** Every component works in any app because color
   comes from the theme, never hardcoded. If you are adding a hex value to a
   component, you are doing it wrong — add a token instead.
4. **Speed is a feature.** Memoize components, hoist static styles to module scope,
   avoid unnecessary Views, never subscribe more of the tree than needed.

## Component conventions

### File layout

```
src/components/<Name>/<Name>.tsx   — implementation (one primary component per folder)
src/components/<Name>/index.ts     — re-exports
src/components/index.ts            — kit-wide barrel
```

### Code style

- Strict TypeScript. Use `import type` / inline `type` imports (enforced by
  `verbatimModuleSyntax`).
- Props interface exported as `<Name>Props`, extending the closest RN props type.
- Size prop is `'sm' | 'md' | 'lg'`, resolved through `theme.metrics`.
- Colorful intent uses the `Tone` union (`'neutral' | 'primary' | 'success' |
  'warning' | 'error' | 'info'`), resolved through `theme.colors`.
- Theme access: `const { colors, spacing, radii, metrics } = useTheme();`
- Static styles: `StyleSheet.create` at module scope. Dynamic values (theme colors,
  sizes) may be inline — they are cheap; do not build style-cache machinery.
- Wrap the component in `React.memo`. Use `forwardRef` only when a ref is genuinely
  useful (inputs, pressables).
- Every public component and non-obvious prop gets a JSDoc comment.
- Accessibility is not optional: thread `accessibilityRole`, `accessibilityState`
  and `accessibilityLabel` (or an explicit prop) through interactive components.

### Press feedback

Interactive components render RN `Pressable` and communicate the pressed state
**mechanically**: the key shifts down 1px and framed keys scale slightly
(0.985–0.99) while the 2px warm cast collapses (via `usePressState` + `Cast`
from `src/utils/cast`). Flat elements use a background tint. No springs, no
bounce animation. Disabled controls use muted colors and drop the cast
entirely.

### Exports

Each new component must be exported from `src/components/index.ts` and
`src/index.ts`, with its props type(s).

## Development

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # jest + @testing-library/react-native
npm run build       # dual CJS/ESM emit to dist/
cd website && npm install && npm run dev   # docs site on localhost:4321
```

All four must pass before a commit lands.
