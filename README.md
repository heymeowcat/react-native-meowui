# React Native MeowUI

A modern, playful UI framework for React Native with comic-style animations.

## Installation

```bash
npm install react-native-meowui
```

### Peer Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler expo-linear-gradient expo-blur @react-native-masked-view/masked-view
```

## Quick Start

```tsx
import { MeowProvider, Button, Card, Text } from 'react-native-meowui';

export default function App() {
  return (
    <MeowProvider>
      <Card variant="elevated">
        <Text variant="headline">Welcome to MeowUI</Text>
        <Button onPress={() => console.log('Pressed!')}>
          Get Started
        </Button>
      </Card>
    </MeowProvider>
  );
}
```

## Theme

MeowUI supports light and dark modes with automatic system detection.

```tsx
import { MeowProvider } from 'react-native-meowui';

// Auto-detect system theme
<MeowProvider theme="auto">
  {/* Your app */}
</MeowProvider>

// Force dark mode
<MeowProvider theme="dark">
  {/* Your app */}
</MeowProvider>
```

### Custom Theme

```tsx
import { MeowProvider, createTheme } from 'react-native-meowui';

const customTheme = createTheme({
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
  },
});

<MeowProvider theme={customTheme}>
  {/* Your app */}
</MeowProvider>
```

## Components

### Core

| Component | Description |
|-----------|-------------|
| `Button` | Primary action button with variants: filled, outlined, ghost |
| `Card` | Container with elevation and border styling |
| `Text` | Typography components for all text variants |
| `Input` | Text input with label and validation support |
| `Surface` | Base container with theming |

### Form Controls

| Component | Description |
|-----------|-------------|
| `Checkbox` | Animated checkbox |
| `RadioButton` | Radio button for single selection |
| `Switch` | Toggle switch |
| `SegmentedButtons` | Button group for selection |
| `Combobox` | Dropdown select |
| `HelperText` | Form field help/error text |

### Feedback

| Component | Description |
|-----------|-------------|
| `Snackbar` | Bottom notification bar |
| `Toast` | Lightweight notification with queue support |
| `Banner` | Full-width alert with actions |
| `ActivityIndicator` | Animated loading spinner |
| `ProgressBar` | Progress indicator |
| `AlertDialog` | Modal alert with animations |

### Navigation

| Component | Description |
|-----------|-------------|
| `Appbar` | Top app bar with actions |
| `FAB` | Floating action button |
| `FABGroup` | Expandable FAB with multiple actions |
| `Menu` | Dropdown menu |
| `Modal` | Animated modal overlay |
| `BottomSheet` | Gesture-driven bottom sheet |
| `Tooltip` | Press/long-press tooltip |

### Display

| Component | Description |
|-----------|-------------|
| `Avatar` | User avatar with border |
| `Badge` | Notification badge |
| `Chip` | Selection chip |
| `Divider` | Visual separator |
| `List` | List with sections and accordions |
| `Collapsible` | Animated collapsible container |
| `IconButton` | Icon-only button |
| `ToggleButton` | Toggle with group support |

### Decorative

| Component | Description |
|-----------|-------------|
| `GradientBackground` | Full-screen gradient |
| `PencilBurst` | Comic-style click animation |

## Button Example

```tsx
import { Button } from 'react-native-meowui';

<Button variant="filled" onPress={handlePress}>
  Primary Action
</Button>

<Button variant="outlined" onPress={handlePress}>
  Secondary
</Button>

<Button variant="ghost" onPress={handlePress}>
  Tertiary
</Button>

// Disable the pencil burst animation
<Button enablePencilBurst={false} onPress={handlePress}>
  No Animation
</Button>
```

## Toast Example

```tsx
import { ToastProvider, useToast, Button } from 'react-native-meowui';

function App() {
  return (
    <ToastProvider>
      <MyScreen />
    </ToastProvider>
  );
}

function MyScreen() {
  const { show } = useToast();
  
  return (
    <Button onPress={() => show({ message: 'Saved!', type: 'success' })}>
      Save
    </Button>
  );
}
```

## FAB Group Example

```tsx
import { FABGroup } from 'react-native-meowui';

<FABGroup
  icon={<Icon name="add" />}
  actions={[
    { icon: <Icon name="camera" />, label: 'Photo', onPress: handlePhoto },
    { icon: <Icon name="document" />, label: 'Document', onPress: handleDoc },
  ]}
/>
```

## Hooks

| Hook | Description |
|------|-------------|
| `useTheme` | Access current theme and toggle dark mode |
| `usePencilBurst` | Trigger pencil burst animation programmatically |
| `useAnimatedPress` | Press animation utilities |
| `useGradient` | Gradient color utilities |

## License

MIT
