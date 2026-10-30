# MeowUI Showcase

Four authored screens — **Kit**, **Forms**, **Layers** and **Tokens** — built
with MeowUI, in light and dark mode. Fraunces, DM Sans and DM Mono are loaded
from Expo Google Fonts and mapped through `theme.fonts`; Ionicons is wired
through the `Icon` renderer.

## Run it

From the repository root:

```bash
npm install        # install library dev deps
npm run build      # produce dist/ (the example consumes the built package)
cd example
npm install        # installs expo + links react-native-meowui from file:..
npx expo start
```

Then press `i` for iOS or `a` for Android. Move between the four screens with
the bottom navigation and toggle light/dark from the sun/moon action in the
app bar.

For a quick desktop preview, run `npx expo start --web` and open
`http://localhost:8081`.
