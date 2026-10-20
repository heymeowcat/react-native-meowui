import type { ThemeColors } from './types';

/**
 * Light palette — Mochi Press.
 * Oat-cream paper, espresso ink, blueberry primary and soft semantic wells.
 * Control borders (`outlineStrong`) clear 3:1 against the milk surface; every
 * enabled `on*` pair clears AA. `onSurfaceSubtle` is reserved for disabled
 * states and quiet chrome.
 */
export const lightColors: ThemeColors = {
  background: '#F8F0E3',
  surface: '#FFFBF3',
  surfaceMuted: '#F1E6D4',
  surfaceActive: '#E8D9C2',
  inverseSurface: '#3A322A',
  inverseOnSurface: '#FFF8EC',

  onSurface: '#352F28',
  onSurfaceMuted: '#6B6053',
  onSurfaceSubtle: '#8C7C67',

  outline: '#E7D9C2',
  outlineStrong: '#A38F72',

  primary: '#3F528C',
  onPrimary: '#FFF8ED',
  primaryMuted: '#E5E8F3',
  onPrimaryMuted: '#2F3E6E',
  primaryActive: '#324578',
  primaryOutline: '#BEC7DF',

  success: '#37704B',
  onSuccess: '#F5FFF7',
  successMuted: '#E3EFE2',
  onSuccessMuted: '#2D5B3D',
  successOutline: '#BCD8BD',

  warning: '#946312',
  onWarning: '#FFF9EA',
  warningMuted: '#F8EACB',
  onWarningMuted: '#6F4A0C',
  warningOutline: '#E8D19C',

  error: '#AF3B31',
  onError: '#FFF7F5',
  errorMuted: '#F9E1DD',
  onErrorMuted: '#842B23',
  errorOutline: '#EDC1BA',

  info: '#2F6F73',
  onInfo: '#F4FDFD',
  infoMuted: '#E0EEEE',
  onInfoMuted: '#245457',
  infoOutline: '#B9D8D8',

  scrim: 'rgba(45, 36, 27, 0.42)',
  shadow: 'rgba(62, 52, 42, 0.18)',
  shadowSoft: 'rgba(62, 52, 42, 0.08)',
  focusRing: '#3F528C',
};

/**
 * Dark palette — the cocoa desk.
 * Surfaces lift by brightness, the blueberry primary flips to pale periwinkle
 * with espresso content, and semantic tones lighten while their wells deepen.
 */
export const darkColors: ThemeColors = {
  background: '#211C17',
  surface: '#2A241E',
  surfaceMuted: '#352D25',
  surfaceActive: '#40362B',
  inverseSurface: '#F7F0E4',
  inverseOnSurface: '#332E28',

  onSurface: '#F5EDDE',
  onSurfaceMuted: '#C6B8A4',
  onSurfaceSubtle: '#9C8E7C',

  outline: '#453A2F',
  outlineStrong: '#8A745B',

  primary: '#9FB0E8',
  onPrimary: '#1D2647',
  primaryMuted: '#2D3350',
  onPrimaryMuted: '#C3CCEE',
  primaryActive: '#B3C0F0',
  primaryOutline: '#46527C',

  success: '#86C89A',
  onSuccess: '#0E2A1A',
  successMuted: '#20372A',
  onSuccessMuted: '#A9DCB8',
  successOutline: '#3C5E49',

  warning: '#EFC36C',
  onWarning: '#3A2A0B',
  warningMuted: '#3B2F1A',
  onWarningMuted: '#F2D79C',
  warningOutline: '#6D551F',

  error: '#F19A8F',
  onError: '#3D1512',
  errorMuted: '#3E241F',
  onErrorMuted: '#F5BFB8',
  errorOutline: '#6D3A32',

  info: '#9ACBD4',
  onInfo: '#102F35',
  infoMuted: '#23373A',
  onInfoMuted: '#BDE2E7',
  infoOutline: '#3F6165',

  scrim: 'rgba(0, 0, 0, 0.55)',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowSoft: 'rgba(0, 0, 0, 0.25)',
  focusRing: '#9FB0E8',
};
