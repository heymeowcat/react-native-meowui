import {
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
  type ReactElement,
} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { softElevation } from '../../utils/cast';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

const AUTO_HIDE_MS = 2000;
/** Gap between the bubble edge and the wrapped element. */
const GAP = 6;
const DIAMOND_SIZE = 6;
/** Minimum distance the bubble keeps from the screen edges when clamping. */
const EDGE_MARGIN = 8;

export interface TooltipProps {
  /**
   * Single element (usually a `Pressable`-derivative) the tooltip describes.
   * Its `onLongPress` is captured by the wrapper; its `onPress` keeps working.
   */
  children: ReactElement;
  label: string;
  /** Which side of the child the bubble appears on. Defaults to `'top'`. */
  side?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Long-press hint bubble anchored to the wrapped element — an espresso ink
 * stamp: `inverseSurface` ground, cream `inverseOnSurface` border, `lg` radius,
 * mono caption, rendered through a `Portal` with a small rotated-diamond tail.
 * Auto-hides after two seconds; tapping the bubble dismisses it early. Note the
 * wrapper captures the long-press — the child's own `onLongPress` is replaced.
 */
export const Tooltip = memo(function Tooltip({
  children,
  label,
  side = 'top',
  style,
  testID,
}: TooltipProps) {
  const { colors, motion, zIndex } = useTheme();
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );
  const [bubbleHeight, setBubbleHeight] = useState<number | null>(null);
  const [bubbleWidth, setBubbleWidth] = useState<number | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const wrapperRef = useRef<ComponentRef<typeof View> | null>(null);
  const { width: windowWidth } = useWindowDimensions();

  const show = useCallback(() => {
    wrapperRef.current?.measureInWindow((x, y, width, height) => {
      setRect({ x, y, width, height });
      setOpen(true);
    });
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const entrance = Animated.timing(progress, {
        toValue: 1,
        duration: motion.durationFast,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
      entrance.start();
      return () => entrance.stop();
    }
    if (rendered) {
      const exit = Animated.timing(progress, {
        toValue: 0,
        duration: motion.durationFast,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      });
      exit.start(({ finished }) => {
        if (finished) setRendered(false);
      });
      return () => exit.stop();
    }
  }, [open, rendered, progress, motion.durationFast]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(hide, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [open, hide]);

  // Capture the long-press on the wrapped element; its own handler is
  // intentionally replaced (see JSDoc).
  const wrappedChild = cloneElement(children as ReactElement<{ onLongPress?: () => void }>, {
    onLongPress: show,
  });

  // Keep the bubble on screen: center it on the anchor, then clamp so the
  // tail drifts off-center rather than the label clipping at the edge.
  const halfWidth = (bubbleWidth ?? 0) / 2;
  const minCenterX = EDGE_MARGIN + halfWidth;
  const maxCenterX = Math.max(minCenterX, windowWidth - EDGE_MARGIN - halfWidth);
  const anchorCenterX = rect != null ? rect.x + rect.width / 2 : 0;
  const bubbleCenterX = Math.min(Math.max(anchorCenterX, minCenterX), maxCenterX);
  const tailLeft =
    bubbleWidth != null
      ? Math.max(
          EDGE_MARGIN,
          Math.min(bubbleWidth - EDGE_MARGIN, anchorCenterX - (bubbleCenterX - halfWidth))
        )
      : null;
  const bubbleTop =
    rect != null
      ? side === 'top'
        ? rect.y - GAP - (bubbleHeight ?? 0)
        : rect.y + rect.height + GAP
      : 0;

  const handleBubbleLayout = (event: LayoutChangeEvent) => {
    setBubbleHeight(event.nativeEvent.layout.height);
    setBubbleWidth(event.nativeEvent.layout.width);
  };

  return (
    <View ref={wrapperRef} collapsable={false} style={style} testID={testID}>
      {wrappedChild}
      {rendered && rect != null && (
        <Portal zIndex={zIndex.tooltip}>
          <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { zIndex: zIndex.tooltip }]}>
            <Animated.View
              pointerEvents={open ? 'box-none' : 'none'}
              style={{ position: 'absolute', left: bubbleCenterX, top: bubbleTop, opacity: progress }}
            >
              <View style={styles.bubbleShift} onLayout={handleBubbleLayout}>
                <Pressable accessibilityRole="button" onPress={hide}>
                  <View>
                    <Surface
                      backgroundColor={colors.inverseSurface}
                      radius="lg"
                      outlined={false}
                      style={[
                        styles.bubble,
                        { borderWidth: 1, borderColor: colors.inverseOnSurface },
                        softElevation(1, colors.shadow),
                      ]}
                    >
                      <Text variant="mono" color={colors.inverseOnSurface}>
                        {label}
                      </Text>
                    </Surface>
                    <View
                      style={[
                        styles.diamond,
                        { backgroundColor: colors.inverseSurface },
                        side === 'top' ? styles.diamondAbove : styles.diamondBelow,
                        tailLeft != null && { left: tailLeft },
                      ]}
                    />
                  </View>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  bubbleShift: {
    transform: [{ translateX: '-50%' }],
  },
  bubble: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  diamond: {
    position: 'absolute',
    left: '50%',
    marginLeft: -DIAMOND_SIZE / 2,
    width: DIAMOND_SIZE,
    height: DIAMOND_SIZE,
    transform: [{ rotate: '45deg' }],
  },
  diamondAbove: {
    bottom: -DIAMOND_SIZE / 2,
  },
  diamondBelow: {
    top: -DIAMOND_SIZE / 2,
  },
});
