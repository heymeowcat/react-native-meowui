# React Native MeowUI

**Mochi Press — a zero-dependency UI kit for React Native, soft retro instruments pressed in cream and ink.**

MeowUI is a complete component library for apps that should feel warm, tactile
and quick — oat-cream paper, espresso ink, blueberry keys, pill controls and
soft paper casts. Hairline borders over heavy shadows, a single restrained
accent, quiet motion, and a semantic token system that works in any app out of
the box. Subtle retro, a little cute, and engineered to stay out of your frame
budget.

```tsx
import { MeowProvider, Button, Card, Text } from 'react-native-meowui';

export default function App() {
  return (
    <MeowProvider>
      <Card style={{ padding: 16, gap: 12 }}>
        <Text variant="headline">Welcome back</Text>
        <Text variant="body">Your workspace is up to date.</Text>
        <Button onPress={openWorkspace}>Open workspace</Button>
      </Card>
    </MeowProvider>
  );
}
```

[![CI](https://github.com/heymeowcat/react-native-meowui/actions/workflows/ci.yml/badge.svg)](https://github.com/heymeowcat/react-native-meowui/actions/workflows/ci.yml)
[![Docs](https://github.com/heymeowcat/react-native-meowui/actions/workflows/website.yml/badge.svg)](https://heymeowcat.github.io/react-native-meowui/)

## Why MeowUI

- **Zero runtime dependencies.** The only peer dependencies are `react` and
  `react-native`. No Reanimated, no Gesture Handler, no Expo modules, no Babel
  plugin, nothing to configure in your host app. Install and go.
- **Fast by construction.** Every component is memoized, static styles are
  hoisted to module scope, themes are frozen objects, and animations run on the
  native driver (opacity/transform only). No worklet runtime, no JS bridge
  chatter, no library-level re-render storms.
- **A look you can't mistake.** Oat-cream grounds, espresso ink, 1px warm
  hairlines, a 2px paper cast under every key and blurred `softElevation` only
  for floating layers. Fraunces headlines over DM Sans body and DM Mono
  metadata, with a blueberry primary and soft semantic pairs. Light and dark
  palettes are both tuned for AA contrast.
- **Complete.** 35+ components covering actions, inputs, feedback, overlays,
  data display and navigation — typed end to end, with accessibility roles and
  states wired through.
- **2026 toolchain.** Strict TypeScript, dual CJS/ESM output with declarations,
  ESLint flat config, Jest + Testing Library tests, GitHub Actions CI.

## Installation

```bash
npm install react-native-meowui
# or
yarn add react-native-meowui
# or
pnpm add react-native-meowui
```

Requires `react >= 18.2` and `react-native >= 0.74`. Works with the New
Architecture (Fabric) — no compatibility shims needed.

## Theming

### Light and dark mode

`MeowProvider` follows the OS color scheme by default:

```tsx
<MeowProvider>{/* your app */}</MeowProvider>

<MeowProvider mode="dark">{/* force dark */}</MeowProvider>
```

Switch modes at runtime with the controller:

```tsx
import { useThemeController, Button } from 'react-native-meowui';

function ThemeToggle() {
  const { mode, toggleMode } = useThemeController();
  return <Button variant="ghost" onPress={toggleMode}>{mode === 'dark' ? 'Light' : 'Dark'} mode</Button>;
}
```

### Overrides

Every token is overridable — colors, the type scale, spacing, radii, control
metrics, motion durations and stacking order:

```tsx
import { MeowProvider } from 'react-native-meowui';

<MeowProvider
  overrides={{
    colors: { primary: '#2F6B4F', onPrimary: '#FFFFFF' },
    radii: { md: 9, lg: 14 },
    typography: { body: { fontSize: 16, lineHeight: 23 } },
    fonts: {
      regular: 'DMSans_400Regular',
      medium: 'DMSans_500Medium',
      semibold: 'DMSans_600SemiBold',
      displaySemibold: 'Fraunces_600SemiBold',
      monoRegular: 'DMMono_400Regular',
    },
  }}
>
  {children}
</MeowProvider>
```

### Fonts

The kit's three voices are Fraunces, DM Sans and DM Mono. Load them (for
example with `@expo-google-fonts`) and map the family names through
`theme.fonts`: sans slots (`regular` / `medium` / `semibold`) carry body and
controls, display slots (`displayRegular` / `displayMedium` /
`displaySemibold`) carry `display`, `headline`, `title` and `subtitle`, and
mono slots (`monoRegular` / `monoBold`) carry `overline` and `mono`. Any
unmapped slot falls back to the system font.

### Fully custom themes

```tsx
import { createTheme, MeowProvider } from 'react-native-meowui';

const brand = createTheme({ mode: 'dark', colors: { primary: '#C9A227', onPrimary: '#1A1608' } });

<MeowProvider theme={brand}>{children}</MeowProvider>
```

Read the token grammar in the [theming docs](https://heymeowcat.github.io/react-native-meowui/theming/overview/).

## Components

| Area | Components |
| --- | --- |
| **Primitives** | `Text`, `Surface`, `Divider`, `Pressable`, `Portal` / `PortalHost`, `Icon` (+ `setIconRenderer`) |
| **Actions** | `Button`, `IconButton`, `FAB`, `FABGroup`, `Chip`, `SegmentedButtons`, `ToggleButton` / `ToggleButtonGroup` |
| **Inputs** | `TextInput`, `Checkbox`, `Radio` / `RadioGroup`, `Switch`, `Slider`, `Searchbar`, `Select` |
| **Feedback** | `ActivityIndicator`, `ProgressBar`, `Skeleton`, `Badge`, `Banner`, `Snackbar`, `Toast` (`ToastProvider` + `useToast`) |
| **Overlays** | `Dialog`, `AlertDialog`, `Modal`, `BottomSheet`, `Menu` / `MenuItem`, `Tooltip` |
| **Display** | `Avatar`, `Card` (`CardCover`, `CardTitle`, `CardContent`, `CardActions`), `List` (`ListSection`, `ListItem`, `ListAccordion`), `Collapsible`, `DataTable` (`DataTableHeader`, `DataTableCell`, `DataTableRow`, `DataTablePagination`) |
| **Navigation** | `Appbar` (`AppbarContent`, `AppbarAction`, `AppbarBackAction`), `Tabs`, `BottomNavigation`, `Drawer` (`DrawerSection`, `DrawerItem`) |

### Actions

```tsx
<Button variant="solid">Primary</Button>
<Button variant="tonal" tone="success">Approved</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
<Button loading>Processing</Button>

<IconButton icon={<Icon name="settings" />} accessibilityLabel="Settings" />

<FABGroup
  icon={<Icon name="add" />}
  actions={[
    { icon: <Icon name="camera" />, label: 'Camera', onPress: openCamera },
    { icon: <Icon name="document" />, label: 'Document', onPress: openDocument },
  ]}
/>
```

Icons work with any icon library. Register a renderer once and use the `Icon`
adapter, or pass any element to `icon` props directly:

```tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { setIconRenderer } from 'react-native-meowui';

setIconRenderer(Ionicons);
```

### Inputs

```tsx
<TextInput label="Email" placeholder="you@example.com" helperText="Work address" />
<TextInput label="Password" error helperText="At least 8 characters" secureTextEntry />

<Checkbox checked={agreed} onValueChange={setAgreed} label="I agree to the terms" />
<RadioGroup value={plan} onValueChange={setPlan}>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>
<Switch checked={dark} onValueChange={setDark} accessibilityLabel="Dark mode" />
<Slider value={volume} onValueChange={setVolume} min={0} max={1} step={0.05} />
```

### Overlays and feedback

Every floating component renders through the kit's `Portal` system and layers by
`theme.zIndex` — dialogs never cover toasts, menus never cover dialogs:

```tsx
const { show } = useToast();
show({ message: 'Saved', tone: 'success' });

<Dialog visible={open} onDismiss={close} title="Delete project"
  actions={<><Button variant="ghost" onPress={close}>Cancel</Button><Button tone="error" onPress={destroy}>Delete</Button></>}>
  <Text>This cannot be undone.</Text>
</Dialog>

<AlertDialog visible tone="error" title="Delete?" message="This action is permanent." ... />
<BottomSheet visible={sheet} onDismiss={close}><FilterPanel /></BottomSheet>
```

## Performance notes

- **No animation library.** Press feedback is a 1px shift and a collapsed cast
  recomputed on `Pressable`; entrances and slides use RN `Animated` with the
  native driver. Nothing runs on the JS thread per frame except measured-height
  expansions and the determinate progress fill (both documented at the call
  site).
- **Casts are cheap.** In-flow depth is one absolutely-positioned translucent
  view behind the control — no blur filter, no gradient. Platform shadows are
  reserved for floating layers through `softElevation`.
- **No context re-render storms.** The theme object is frozen and its identity
  only changes when the mode or overrides actually change; the controller lives
  in a separate context from the theme itself.
- **Memoized everything.** All public components are `React.memo`'d; static
  styles are module-level `StyleSheet.create`.

## Documentation

Full documentation lives at **[heymeowcat.github.io/react-native-meowui](https://heymeowcat.github.io/react-native-meowui/)**
(built with Astro Starlight — guides, theming reference, and a page for every component).

- [Contributing](CONTRIBUTING.md) — conventions every component follows
- [Changelog](CHANGELOG.md)

## Example

An Expo kitchen-sink showcase lives in [`example/`](example) — four screens
(Kit, Forms, Layers, Tokens) covering every component, light and dark. See
[example/README.md](example/README.md) to run it.

## License

[MIT](LICENSE)
