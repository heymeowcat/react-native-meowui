import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme, type ThemeColors } from '../../theme';
import { softElevation } from '../../utils/cast';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

/**
 * Tones available to toasts. `primary` is intentionally absent — toasts speak
 * in semantics only.
 */
export type ToastTone = 'neutral' | 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastOptions {
  message: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. Defaults to `2500`. */
  duration?: number;
  action?: ToastAction;
}

type ToastTokens = Record<'muted' | 'onMuted', keyof ThemeColors>;

const TONE: Record<ToastTone, ToastTokens> = {
  neutral: { muted: 'inverseSurface', onMuted: 'inverseOnSurface' },
  success: { muted: 'successMuted', onMuted: 'onSuccessMuted' },
  error: { muted: 'errorMuted', onMuted: 'onErrorMuted' },
  info: { muted: 'infoMuted', onMuted: 'onInfoMuted' },
  warning: { muted: 'warningMuted', onMuted: 'onWarningMuted' },
};

/** Maximum simultaneous toasts; the oldest is dropped when exceeded. */
const MAX_TOASTS = 3;

const DEFAULT_DURATION = 2500;

interface ToastInstance {
  id: number;
  options: ToastOptions;
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Access the toast queue. `show()` enqueues a toast that auto-dismisses; safe
 * to call from anywhere under the `ToastProvider`. Without a provider the
 * call is a no-op (warned in development).
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (__DEV__ && !context) {
    console.warn(
      'MeowUI: useToast() was called outside a <ToastProvider> — the toast will not render.'
    );
  }
  return context ?? { show: () => undefined };
}

export interface ToastProviderProps {
  children?: ReactNode;
}

/**
 * Owns the app-wide toast queue and renders the stack through a `Portal`,
 * floating above all content. Mount it once near the root (inside
 * `<MeowProvider>`); call `useToast().show(...)` anywhere below it. Toasts
 * stack from the top of the viewport and are capped at 3 — the oldest drops
 * off when exceeded.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const { spacing, zIndex } = useTheme();
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const nextId = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((options: ToastOptions) => {
    nextId.current += 1;
    const instance: ToastInstance = { id: nextId.current, options };
    setToasts((prev) => [...prev, instance].slice(-MAX_TOASTS));
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal zIndex={zIndex.toast}>
        <View
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFill, { zIndex: zIndex.toast }]}
        >
          <View
            pointerEvents="box-none"
            style={[styles.stack, { paddingTop: spacing[5], paddingHorizontal: spacing[4], gap: spacing[2] }]}
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} instance={toast} onRemove={remove} />
            ))}
          </View>
        </View>
      </Portal>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  instance: ToastInstance;
  onRemove: (id: number) => void;
}

const ToastItem = memo(function ToastItem({ instance, onRemove }: ToastItemProps) {
  const { colors, spacing, motion } = useTheme();
  const { message, tone = 'neutral', duration = DEFAULT_DURATION, action } = instance.options;
  const progress = useRef(new Animated.Value(0)).current;

  const dismiss = useCallback(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: motion.durationBase,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onRemove(instance.id);
    });
  }, [progress, instance.id, onRemove, motion.durationBase]);

  useEffect(() => {
    const entrance = Animated.timing(progress, {
      toValue: 1,
      duration: motion.durationBase,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    entrance.start();
    const timer = setTimeout(dismiss, duration);
    return () => {
      clearTimeout(timer);
      entrance.stop();
    };
  }, [dismiss, duration, progress, motion.durationBase]);

  const tokens = TONE[tone];
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] });
  // A floating slip: tone-tinted ground, matching border and soft shadow.
  // Neutral sits on delicious espresso ink with cream copy.
  const borderColor = tone === 'neutral' ? colors.inverseOnSurface : colors[tone];

  return (
    <Animated.View pointerEvents="box-none" style={{ opacity: progress, transform: [{ translateY }] }}>
      <Surface
        radius="xl"
        outlined={false}
        backgroundColor={colors[tokens.muted]}
        accessibilityLiveRegion="polite"
        style={[
          {
            borderWidth: 1,
            borderColor,
            paddingVertical: spacing[3],
            paddingHorizontal: spacing[3] + spacing[1],
          },
          softElevation(2, colors.shadow),
        ]}
      >
        <View style={[styles.row, { gap: spacing[3] }]}>
          {tone !== 'neutral' && <View style={[styles.dot, { backgroundColor: colors[tone] }]} />}
          <Text variant="body" style={{ flex: 1, color: colors[tokens.onMuted] }} numberOfLines={2}>
            {message}
          </Text>
          {action != null && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={action.label}
              onPress={() => {
                action.onPress();
                dismiss();
              }}
            >
              <Text
                variant="label"
                weight="600"
                style={{ color: colors[tokens.onMuted] }}
                numberOfLines={1}
              >
                {action.label}
              </Text>
            </Pressable>
          )}
        </View>
      </Surface>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  stack: {
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
});
