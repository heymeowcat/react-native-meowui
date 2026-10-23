import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';

interface PortalEntry {
  key: string;
  children: ReactNode;
  /** Stacking level. Entries sort by this; ties keep mount order. */
  zIndex: number;
}

interface PortalManager {
  mount: (entry: PortalEntry) => void;
  unmount: (key: string) => void;
}

const PortalContext = createContext<PortalManager | null>(null);

export interface PortalHostProps {
  children?: ReactNode;
}

/**
 * Renders portaled content above its children. `<MeowProvider>` already
 * includes a host, so most apps never mount one directly — nest additional
 * hosts when content must layer inside a specific region (e.g. a modal).
 */
export function PortalHost({ children }: PortalHostProps) {
  const [entries, setEntries] = useState<PortalEntry[]>([]);

  const mount = useCallback((entry: PortalEntry) => {
    setEntries((prev) => [...prev.filter((e) => e.key !== entry.key), entry]);
  }, []);

  const unmount = useCallback((key: string) => {
    setEntries((prev) => prev.filter((e) => e.key !== key));
  }, []);

  const manager = useMemo<PortalManager>(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <PortalContext.Provider value={manager}>
      {children}
      <View
        style={styles.overlay}
        pointerEvents="box-none"
        collapsable={false}
      >
        {[...entries]
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((entry) => (
            // Each entry is its own fullscreen layer: Yoga positions absolute
            // children against their immediate parent, so a wrap-content entry
            // View (height 0) would pin scrims and centered sheets to the top
            // of the screen. Fullscreen entries give overlays a real canvas.
            <View
              key={entry.key}
              style={StyleSheet.absoluteFill}
              pointerEvents="box-none"
              collapsable={false}
            >
              {entry.children}
            </View>
          ))}
      </View>
    </PortalContext.Provider>
  );
}

export interface PortalProps {
  children?: ReactNode;
  /** Stacking level within the host (see `theme.zIndex`). Defaults to `0`. */
  zIndex?: number;
}

let portalCounter = 0;

/**
 * Teleport children to the nearest `PortalHost` above the surrounding tree.
 * Content keeps rendering (and re-rendering) normally — only its position in
 * the hierarchy changes, which is what lets menus, dialogs and toasts escape
 * clipped or stacked parents.
 *
 * Pass `zIndex` (usually `theme.zIndex.*`) so overlapping overlays stack by
 * token instead of mount order.
 */
export function Portal({ children, zIndex = 0 }: PortalProps) {
  const manager = useContext(PortalContext);
  const key = useMemo(() => `portal-${++portalCounter}`, []);

  useEffect(() => {
    if (manager) manager.mount({ key, children, zIndex });
    return () => {
      if (manager) manager.unmount(key);
    };
  }, [manager, key, children, zIndex]);

  if (!manager) {
    if (__DEV__) {
      console.warn(
        'MeowUI: <Portal> rendered without a <PortalHost>. <MeowProvider> includes one by default — mount a <PortalHost> explicitly if you removed it.'
      );
    }
    return null;
  }
  return null;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
