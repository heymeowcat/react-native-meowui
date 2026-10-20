import { createTheme, darkTheme, lightTheme } from '../src/theme/theme';
import { typography } from '../src/theme/tokens';

describe('createTheme', () => {
  it('defaults to the light theme', () => {
    const theme = createTheme();
    expect(theme.mode).toBe('light');
    expect(theme.colors.primary).toBe(lightTheme.colors.primary);
  });

  it('builds on the dark base when mode is dark', () => {
    const theme = createTheme({ mode: 'dark' });
    expect(theme.mode).toBe('dark');
    expect(theme.colors.background).toBe(darkTheme.colors.background);
  });

  it('deep-merges color overrides without mutating the base', () => {
    const theme = createTheme({ colors: { primary: '#123456' } });
    expect(theme.colors.primary).toBe('#123456');
    expect(theme.colors.onPrimary).toBe(lightTheme.colors.onPrimary);
    expect(lightTheme.colors.primary).not.toBe('#123456');
  });

  it('merges partial typography overrides per variant', () => {
    const theme = createTheme({ typography: { body: { fontSize: 16 } } });
    expect(theme.typography.body.fontSize).toBe(16);
    expect(theme.typography.body.lineHeight).toBe(typography.body.lineHeight);
    expect(theme.typography.title.fontSize).toBe(typography.title.fontSize);
  });

  it('merges metrics per group', () => {
    const theme = createTheme({ metrics: { control: { md: 44 } } });
    expect(theme.metrics.control.md).toBe(44);
    expect(theme.metrics.control.sm).toBe(lightTheme.metrics.control.sm);
    expect(theme.metrics.icon.md).toBe(lightTheme.metrics.icon.md);
  });

  it('returns frozen themes', () => {
    expect(Object.isFrozen(createTheme())).toBe(true);
    expect(Object.isFrozen(lightTheme)).toBe(true);
    expect(Object.isFrozen(darkTheme)).toBe(true);
  });
});
