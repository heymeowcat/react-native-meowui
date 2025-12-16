# React Native MeowUI

A modern, playful UI framework for React Native


##  Installation

```bash
npm install react-native-meowui
```

### Peer Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler expo-linear-gradient
```

## Quick Start

```tsx
import { MeowProvider, Button, Card, Text } from 'react-native-meowui';

export default function App() {
  return (
    <MeowProvider>
      <Card variant="gradient">
        <Text variant="headline">Welcome to MeowUI! 🐱</Text>
        <Button gradient onPress={() => console.log('Meow!')}>
          Get Started
        </Button>
      </Card>
    </MeowProvider>
  );
}
```

##  Theme

### Colors

MeowUI uses a vibrant gradient-based color palette:

- **Primary**: Purple → Pink gradient
- **Secondary**: Orange → Yellow gradient  
- **Accent**: Blue → Cyan gradient

### Customization

```tsx
import { MeowProvider, createTheme } from 'react-native-meowui';

const customTheme = createTheme({
  colors: {
    primary: ['#8B5CF6', '#EC4899'],
    secondary: ['#F97316', '#FBBF24'],
  },
});

<MeowProvider theme={customTheme}>
  {/* Your app */}
</MeowProvider>
```

##  Components

### Button
```tsx
<Button variant="filled" gradient>Click me</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="ghost">Ghost</Button>
```

### Card
```tsx
<Card elevation={2} gradient>
  <Text>Beautiful card!</Text>
</Card>
```

### Input
```tsx
<Input 
  label="Email"
  placeholder="Enter your email"
  leftIcon="mail"
/>
```

### More Components
- `Text` - Typography with gradient support
- `Surface` - Base container with elevation
- `Avatar` - User avatars with gradient border
- `Badge` - Notification badges
- `Chip` - Selectable chips
- `FAB` - Floating action button
- `Modal` - Animated modals
- `BottomSheet` - Gesture-driven sheets
- `Snackbar` - Toast notifications
- `IconButton` - Icon-only buttons
- `Divider` - Visual separators
- `GradientBackground` - Full-screen gradients

##  License

MIT
