/**
 * MeowUI Color System
 * Vibrant gradient-based color palette inspired by modern design
 */
export const gradients = {
    primary: ['#D946EF', '#D946EF'],
    secondary: ['#FACC15', '#FACC15'],
    accent: ['#06B6D4', '#06B6D4'],
    success: ['#22C55E', '#22C55E'],
    warning: ['#F97316', '#F97316'],
    error: ['#EF4444', '#EF4444'],
    neutral: ['#1F2937', '#1F2937'],
    sunset: ['#FACC15', '#F97316', '#EF4444'],
    ocean: ['#06B6D4', '#3B82F6', '#6366F1'],
    aurora: ['#A3E635', '#22C55E', '#10B981'],
    fire: ['#FCA5A5', '#EF4444', '#B91C1C'],
};
export const lightColors = {
    // Surfaces
    background: '#FFD54F',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    // Content (High Contrast)
    onBackground: '#000000',
    onSurface: '#000000',
    onSurfaceVariant: '#374151',
    // Primary (Magenta/Pink)
    primary: '#D946EF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FAE8FF',
    onPrimaryContainer: '#86198F',
    // Secondary (Cyan)
    secondary: '#06B6D4',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#CFFAFE',
    onSecondaryContainer: '#155E75',
    // Accent (Lime/Green)
    accent: '#84CC16',
    onAccent: '#000000',
    // Semantic
    success: '#22C55E',
    onSuccess: '#FFFFFF',
    warning: '#F97316',
    onWarning: '#FFFFFF',
    error: '#EF4444',
    onError: '#FFFFFF',
    // Borders & Dividers (Thick Black)
    outline: '#000000',
    outlineVariant: '#000000',
    // Overlay
    scrim: 'rgba(0,0,0,0.5)',
    backdrop: 'rgba(255,255,255,0.9)',
    // Shadows (Solid Black)
    shadow: '#000000',
    shadowStrong: '#000000',
    // No glass
    glass: '#FFFFFF',
    glassStrong: '#FFFFFF',
};
export const darkColors = {
    // Surfaces
    background: '#111827', // Deep Navy
    surface: '#1F2937', // Dark Gray cards
    surfaceVariant: '#374151',
    // Content
    onBackground: '#FFFFFF',
    onSurface: '#F9FAFB',
    onSurfaceVariant: '#D1D5DB',
    // Primary (Neon Green)
    primary: '#4ADE80',
    onPrimary: '#000000',
    primaryContainer: '#14532D',
    onPrimaryContainer: '#DCFCE7',
    // Secondary (Neon Pink)
    secondary: '#F472B6',
    onSecondary: '#500724',
    secondaryContainer: '#831843',
    onSecondaryContainer: '#FBCFE8',
    // Accent (Cyan)
    accent: '#22D3EE',
    onAccent: '#083344',
    // Semantic
    success: '#4ADE80',
    onSuccess: '#000000',
    warning: '#FBBF24',
    onWarning: '#451A03',
    error: '#F87171',
    onError: '#450A0A',
    // Borders (White or Neon)
    outline: '#FFFFFF',
    outlineVariant: '#9CA3AF',
    // Overlay
    scrim: 'rgba(0,0,0,0.8)',
    backdrop: 'rgba(0,0,0,0.8)',
    // Shadows (Deep Black)
    shadow: '#000000',
    shadowStrong: '#000000',
    // No glass
    glass: '#1F2937',
    glassStrong: '#1F2937',
};
export const getGradient = (name) => gradients[name];
export default {
    gradients,
    light: lightColors,
    dark: darkColors,
};
