import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import {
  useFonts as useFraunces,
  Fraunces_600SemiBold,
} from '@expo-google-fonts/fraunces';
import {
  useFonts as useDMSans,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
} from '@expo-google-fonts/dm-sans';
import {
  useFonts as useDMMono,
  DMMono_400Regular,
  DMMono_500Medium,
} from '@expo-google-fonts/dm-mono';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ActivityIndicator,
  AlertDialog,
  Appbar,
  Avatar,
  Badge,
  Banner,
  BottomNavigation,
  BottomSheet,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Checkbox,
  Chip,
  Dialog,
  FAB,
  Icon,
  IconButton,
  lightTheme,
  ListItem,
  ListSection,
  MeowProvider,
  Menu,
  MenuItem,
  ProgressBar,
  Radio,
  RadioGroup,
  Searchbar,
  SegmentedButtons,
  Select,
  setIconRenderer,
  Skeleton,
  Slider,
  Snackbar,
  Surface,
  Switch,
  Text,
  TextInput,
  ToastProvider,
  Tooltip,
  useTheme,
  useThemeController,
  useToast,
} from 'react-native-meowui';
import type {
  SwitchTone,
  ThemeOverrides,
  TypographyVariantName,
} from 'react-native-meowui';

setIconRenderer(Ionicons);

const INSTALL = 'npm i react-native-meowui';

const FONT_OVERRIDES: ThemeOverrides = {
  fonts: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    semibold: 'DMSans_600SemiBold',
    displayRegular: 'Fraunces_600SemiBold',
    displayMedium: 'Fraunces_600SemiBold',
    displaySemibold: 'Fraunces_600SemiBold',
    monoRegular: 'DMMono_400Regular',
    monoBold: 'DMMono_500Medium',
  },
};

const TYPE_SAMPLES: Array<{ name: TypographyVariantName; sample: string }> = [
  { name: 'display', sample: 'Mochi Press' },
  { name: 'headline', sample: 'Blueberry ink' },
  { name: 'title', sample: 'Field notes' },
  { name: 'body', sample: 'Cream paper, espresso ink, one blueberry key.' },
  { name: 'label', sample: 'Section label' },
  { name: 'overline', sample: 'METADATA' },
  { name: 'mono', sample: 'npm i react-native-meowui' },
];

const RADIUS_KEYS = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
const SPACE_KEYS = [1, 2, 3, 4, 6, 8] as const;

const PRINCIPLES = [
  {
    title: 'Warm, not loud',
    body: 'Cream paper and espresso ink carry the page. Color appears only where it means something.',
  },
  {
    title: 'Pressed, not floating',
    body: 'Controls rest on a warm 2px cast that collapses under the finger. Overlays alone blur.',
  },
  {
    title: 'Fast by default',
    body: 'Zero runtime dependencies. Opacity and transform always run on the native driver.',
  },
];

export default function Root() {
  const [fraunces] = useFraunces({ Fraunces_600SemiBold });
  const [sans] = useDMSans({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });
  const [mono] = useDMMono({ DMMono_400Regular, DMMono_500Medium });

  if (!fraunces || !sans || !mono) {
    return <View style={{ flex: 1, backgroundColor: lightTheme.colors.background }} />;
  }

  return (
    <MeowProvider overrides={FONT_OVERRIDES}>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </MeowProvider>
  );
}

function Shell() {
  const { colors, mode } = useTheme();
  const [tab, setTab] = useState('kit');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <View style={{ flex: 1, paddingTop: 44 }}>
        <Header />
        <View style={{ flex: 1 }}>
          {tab === 'kit' && <KitScreen onOpenTokens={() => setTab('tokens')} />}
          {tab === 'forms' && <FormsScreen />}
          {tab === 'layers' && <LayersScreen />}
          {tab === 'tokens' && <TokensScreen />}
        </View>
      </View>
      <BottomNavigation
        value={tab}
        onChange={setTab}
        items={[
          { value: 'kit', label: 'Kit', icon: <Icon name="grid-outline" /> },
          { value: 'forms', label: 'Forms', icon: <Icon name="create-outline" /> },
          { value: 'layers', label: 'Layers', icon: <Icon name="layers-outline" /> },
          { value: 'tokens', label: 'Tokens', icon: <Icon name="color-palette-outline" /> },
        ]}
      />
    </View>
  );
}

function Header() {
  const { colors } = useTheme();
  const { mode, toggleMode } = useThemeController();
  const copy = useCopy();

  return (
    <Appbar>
      <View style={[styles.row, { flex: 1, gap: 10, paddingHorizontal: 16 }]}>
        <Surface
          cast={2}
          radius="lg"
          backgroundColor={colors.primary}
          borderColor={colors.primaryActive}
          style={styles.brandMark}
        >
          <Text variant="title" color={colors.onPrimary} style={{ fontSize: 22, lineHeight: 26 }}>
            m
          </Text>
        </Surface>
        <View style={{ flex: 1, gap: 1 }}>
          <Text variant="subtitle">MeowUI</Text>
          <Text variant="caption" color={colors.onSurfaceMuted}>
            Mochi Press · v0.4
          </Text>
        </View>
        <IconButton
          variant="ghost"
          size="sm"
          icon={<Icon name="terminal-outline" size={18} />}
          onPress={() => copy(INSTALL, 'Install command copied')}
          accessibilityLabel="Copy install command"
        />
        <IconButton
          variant="ghost"
          size="sm"
          icon={<Icon name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={18} />}
          onPress={toggleMode}
          accessibilityLabel={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        />
      </View>
    </Appbar>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingTop: 8, gap: 16, paddingBottom: 40 }}
    >
      {children}
    </ScrollView>
  );
}

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <Surface cast={1} radius="xl" style={{ padding: 16, gap: 14 }}>
      <View style={{ gap: 2 }}>
        <Text variant="title">{title}</Text>
        {hint !== undefined && (
          <Text variant="caption" color={colors.onSurfaceMuted}>
            {hint}
          </Text>
        )}
      </View>
      {children}
    </Surface>
  );
}

function Intro({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  const { colors } = useTheme();

  return (
    <View style={{ gap: 6, paddingTop: 8 }}>
      <Text variant="overline" color={colors.primary}>
        {kicker}
      </Text>
      <Text variant="headline">{title}</Text>
      <Text variant="body" color={colors.onSurfaceMuted}>
        {body}
      </Text>
    </View>
  );
}

function FieldLabel({ children }: { children: string }) {
  const { colors } = useTheme();

  return (
    <Text variant="overline" color={colors.onSurfaceMuted}>
      {children}
    </Text>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, gap: 1 }}>
      <Text variant="title" color={colors.primary}>
        {value}
      </Text>
      <Text variant="caption" color={colors.onSurfaceMuted}>
        {label}
      </Text>
    </View>
  );
}

function ToggleRow({
  title,
  description,
  value,
  onChange,
  tone,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: (next: boolean) => void;
  tone?: SwitchTone;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.spread}>
      <View style={{ flex: 1, gap: 2, paddingRight: 12 }}>
        <Text variant="body" weight="500">
          {title}
        </Text>
        <Text variant="caption" color={colors.onSurfaceMuted}>
          {description}
        </Text>
      </View>
      <Switch checked={value} onValueChange={onChange} tone={tone} accessibilityLabel={title} />
    </View>
  );
}

function useCopy() {
  const { show } = useToast();

  return (text: string, message: string) => {
    void Clipboard.setStringAsync(text);
    show({ message, tone: 'info' });
  };
}

function KitScreen({ onOpenTokens }: { onOpenTokens: () => void }) {
  const { colors } = useTheme();
  const { show } = useToast();
  const copy = useCopy();
  const [scope, setScope] = useState('Week');
  const [haptics, setHaptics] = useState(true);
  const [filter, setFilter] = useState('All');
  const [pinned, setPinned] = useState(false);
  const notify = (message: string) => show({ message, tone: 'success' });

  return (
    <Screen>
      <Surface cast={2} radius="xl" style={{ padding: 18, gap: 14 }}>
        <View style={styles.spread}>
          <Badge tone="primary" content="Mochi Press" dot />
          <Text variant="mono" color={colors.onSurfaceMuted}>
            v0.4
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text variant="display" style={{ fontSize: 30, lineHeight: 35 }}>
            Soft retro instruments,
          </Text>
          <Text
            variant="display"
            color={colors.primary}
            style={{ fontSize: 30, lineHeight: 35 }}
          >
            pressed in cream & ink.
          </Text>
        </View>
        <Text variant="body" color={colors.onSurfaceMuted}>
          A warm little React Native kit of 40+ primitives, zero runtime dependencies
          and motion that never leaves the native driver.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            borderTopWidth: 1,
            borderTopColor: colors.outline,
            paddingTop: 12,
          }}
        >
          <Stat value="36" label="on show" />
          <Stat value="0" label="dependencies" />
          <Stat value="2" label="themes" />
        </View>
        <View style={styles.buttonRow}>
          <Button
            style={{ flex: 1 }}
            onPress={() => copy(INSTALL, 'Install command copied')}
            trailingIcon={<Icon name="arrow-forward" size={14} />}
          >
            Get the kit
          </Button>
          <Button style={{ flex: 1 }} variant="outline" onPress={onOpenTokens}>
            Read the tokens
          </Button>
        </View>
        <Surface
          cast={0}
          radius="md"
          backgroundColor={colors.surfaceMuted}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 12,
            paddingRight: 4,
            paddingVertical: 4,
          }}
        >
          <Text variant="mono" color={colors.onSurfaceMuted} numberOfLines={1} style={{ flex: 1 }}>
            {INSTALL}
          </Text>
          <IconButton
            variant="ghost"
            size="sm"
            icon={<Icon name="copy-outline" size={16} />}
            onPress={() => copy(INSTALL, 'Install command copied')}
            accessibilityLabel="Copy install command"
          />
        </Surface>
      </Surface>

      <Panel title="Actions" hint="Soft keys with a 2px cast that collapses as they press.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button onPress={() => notify('New note pressed in')}>New note</Button>
          <Button variant="tonal" onPress={() => notify('Note duplicated')}>
            Duplicate
          </Button>
          <Button variant="outline" onPress={() => notify('Preview opened')}>
            Preview
          </Button>
          <Button variant="ghost" onPress={() => notify('Draft discarded')}>
            Discard
          </Button>
        </View>
        <View
          style={[
            styles.row,
            { gap: 8, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 },
          ]}
        >
          <Tooltip label="Keep for later">
            <IconButton
              variant="outline"
              icon={<Icon name="heart-outline" size={18} />}
              onPress={() => notify('Kept for later')}
              accessibilityLabel="Keep for later"
            />
          </Tooltip>
          <IconButton
            variant="outline"
            icon={<Icon name="bookmark-outline" size={18} />}
            onPress={() => notify('Bookmark pressed')}
            accessibilityLabel="Bookmark"
          />
          <Tooltip label="Share this page">
            <IconButton
              variant="outline"
              icon={<Icon name="share-outline" size={18} />}
              onPress={() => notify('Share sheet pressed')}
              accessibilityLabel="Share"
            />
          </Tooltip>
          <IconButton
            variant={pinned ? 'tonal' : 'ghost'}
            selected={pinned}
            icon={<Icon name={pinned ? 'heart' : 'heart-outline'} size={18} />}
            onPress={() => setPinned((next) => !next)}
            accessibilityLabel="Pin this page"
          />
          <View style={{ flex: 1 }} />
          <Text variant="caption" color={colors.onSurfaceMuted}>
            Hold a key for its tooltip
          </Text>
        </View>
        <View style={[styles.row, { gap: 10, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }]}>
          <FAB
            icon={<Icon name="add" size={20} />}
            label="Compose"
            onPress={() => notify('Composer opened')}
          />
          <FAB
            size="sm"
            icon={<Icon name="sparkles-outline" size={16} />}
            onPress={() => notify('A small surprise')}
            accessibilityLabel="Surprise me"
          />
        </View>
      </Panel>

      <Panel title="Chips & badges" hint="Pills for filtering, badges for state.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          <Badge tone="success" content="In sync" />
          <Badge tone="primary" content="Ready" />
          <Badge tone="warning" content="Low stock" />
          <Badge tone="info" content="Draft" />
          <Badge tone="neutral" content="Archived" />
        </View>
        <View
          style={[
            styles.row,
            { flexWrap: 'wrap', gap: 8, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 },
          ]}
        >
          {['All', 'Drafts', 'Shared'].map((label) => (
            <Chip
              key={label}
              label={label}
              variant="filter"
              selected={filter === label}
              onPress={() => setFilter(label)}
            />
          ))}
          <Chip
            label="Archive"
            variant="assist"
            icon={<Icon name="archive-outline" size={14} />}
            onPress={() => notify('Archive opened')}
          />
        </View>
      </Panel>

      <Panel title="Controls" hint="Recessed trays, pocket gauges, pressed keys.">
        <ToggleRow
          title="Tactile feedback"
          description="A tiny click on every soft key."
          value={haptics}
          onChange={setHaptics}
        />
        <View style={{ gap: 8, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }}>
          <View style={styles.spread}>
            <FieldLabel>Cadence</FieldLabel>
            <Text variant="mono" color={colors.onSurfaceMuted}>
              {scope.toUpperCase()}
            </Text>
          </View>
          <SegmentedButtons
            value={scope}
            onChange={setScope}
            options={[
              { value: 'Day', label: 'Day' },
              { value: 'Week', label: 'Week' },
              { value: 'Month', label: 'Month' },
            ]}
          />
        </View>
        <View style={{ gap: 6, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }}>
          <View style={styles.spread}>
            <Text variant="caption" color={colors.onSurfaceMuted}>
              Chapter 3 · The long press
            </Text>
            <Text variant="mono" color={colors.primary}>
              62%
            </Text>
          </View>
          <ProgressBar progress={0.62} />
        </View>
        <View style={{ gap: 6 }}>
          <View style={styles.spread}>
            <Text variant="caption" color={colors.onSurfaceMuted}>
              Warm-up
            </Text>
            <Text variant="mono" color={colors.success}>
              100%
            </Text>
          </View>
          <ProgressBar progress={1} color={colors.success} trackColor={colors.successMuted} />
        </View>
        <View style={[styles.row, { gap: 12, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }]}>
          <ActivityIndicator size="sm" />
          <View style={{ flex: 1, gap: 6 }}>
            <Skeleton width="55%" height={9} />
            <Skeleton width="85%" height={9} />
          </View>
          <Text variant="mono" color={colors.onSurfaceMuted}>
            PRESSING
          </Text>
        </View>
      </Panel>

      <View style={{ gap: 8, paddingTop: 4 }}>
        <FieldLabel>Card</FieldLabel>
        <Card elevation={2}>
          <CardTitle
            leading={<Avatar label="MF" size={36} />}
            title="Field notes"
            subtitle="Small experiments, pressed daily"
          />
          <CardContent>
            <Text variant="body" color={colors.onSurfaceMuted}>
              A quiet place for the experiments that are not ready to become a feature yet.
            </Text>
            <View style={[styles.row, { gap: 6, marginTop: 10 }]}>
              <Badge tone="success" content="In sync" />
              <Badge tone="primary" content="Draft 04" />
            </View>
          </CardContent>
          <CardActions>
            <Button size="sm" variant="ghost" onPress={() => notify('Card opened')}>
              Open
            </Button>
            <Button size="sm" variant="tonal" onPress={() => notify('Card shared')}>
              Share
            </Button>
          </CardActions>
        </Card>
      </View>

      <View style={{ gap: 8 }}>
        <FieldLabel>List</FieldLabel>
        <Surface cast={1} radius="xl" style={{ overflow: 'hidden' }}>
          <ListSection header="Reading list">
            <ListItem
              leading={<Icon name="book-outline" size={18} />}
              title="The Press Book"
              description="12 pages · updated this morning"
              trailing={<Badge tone="primary" content="New" />}
              onPress={() => notify('Press Book opened')}
            />
            <ListItem
              leading={<Icon name="notifications-outline" size={18} />}
              title="Press alerts"
              description="One small tap when a new issue lands"
              trailing={
                <Switch checked={haptics} onValueChange={setHaptics} accessibilityLabel="Press alerts" />
              }
            />
            <ListItem
              leading={<Icon name="color-palette-outline" size={18} />}
              title="Swatch library"
              description="48 colors · light and dark"
              trailing={<Icon name="chevron-forward" size={16} color={colors.onSurfaceSubtle} />}
              onPress={() => notify('Swatch library opened')}
            />
          </ListSection>
        </Surface>
      </View>

      <Footer />
    </Screen>
  );
}

function FormsScreen() {
  const { colors } = useTheme();
  const { show } = useToast();
  const [name, setName] = useState('Mina Fern');
  const [email, setEmail] = useState('mina@');
  const [paper, setPaper] = useState<string | null>('oat');
  const [search, setSearch] = useState('');
  const [chapters, setChapters] = useState(true);
  const [studio, setStudio] = useState(false);
  const [rhythm, setRhythm] = useState<string | null>('weekly');
  const [sound, setSound] = useState(true);
  const [weight, setWeight] = useState(0.62);

  const emailError = email.length > 0 && !email.includes('@');

  const reset = () => {
    setName('Mina Fern');
    setEmail('mina@');
    setPaper('oat');
    setSearch('');
    setChapters(true);
    setStudio(false);
    setRhythm('weekly');
    setSound(true);
    setWeight(0.62);
    show({ message: 'Form reset to its first pressing', tone: 'info' });
  };

  return (
    <Screen>
      <Intro
        kicker="Forms · Mochi Press"
        title="Fields with warm edges."
        body="Every field is a 46px sheet of cream paper with a strong hairline and a blueberry focus. Labels speak in a small sans; the words inside use DM Sans."
      />

      <Panel title="Identity" hint="Quiet inputs that hold their shape.">
        <TextInput
          label="Your name"
          value={name}
          onChangeText={setName}
          leading={<Icon name="person-outline" size={18} />}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          helperText={
            emailError
              ? 'Add a full address — we only write when there is something worth pressing.'
              : 'Warm mail only, never a newsletter.'
          }
          keyboardType="email-address"
          autoCapitalize="none"
          leading={<Icon name="mail-outline" size={18} />}
        />
        <TextInput
          label="Workspace key"
          value="press-9f2a"
          onChangeText={() => undefined}
          disabled
          helperText="Issued when you first pressed the kit."
          leading={<Icon name="key-outline" size={18} />}
        />
        <View style={{ gap: 6 }}>
          <FieldLabel>Paper stock</FieldLabel>
          <Select
            value={paper}
            onValueChange={setPaper}
            placeholder="Choose a paper"
            options={[
              { value: 'oat', label: 'Oat — warm and toothy' },
              { value: 'cream', label: 'Cream — smooth and bright' },
              { value: 'carbon', label: 'Carbon — dark and quiet' },
            ]}
          />
        </View>
        <Searchbar
          value={search}
          onChangeText={setSearch}
          placeholder="Search the archive…"
        />
      </Panel>

      <Panel title="Preferences" hint="Small choices, softly stated.">
        <View style={{ gap: 2 }}>
          <Text variant="body" weight="500">
            Send me
          </Text>
          <Text variant="caption" color={colors.onSurfaceMuted}>
            Occasional notes, always hand-pressed.
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Checkbox
            checked={chapters}
            onValueChange={setChapters}
            label={<Text variant="body">New chapters</Text>}
          />
          <Checkbox
            checked={studio}
            onValueChange={setStudio}
            label={<Text variant="body">Studio notes</Text>}
          />
          <Checkbox
            checked={false}
            disabled
            label={<Text variant="body" color={colors.onSurfaceSubtle}>Events · sold out</Text>}
          />
        </View>
        <View style={{ gap: 8, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }}>
          <FieldLabel>Rhythm</FieldLabel>
          <RadioGroup value={rhythm} onValueChange={setRhythm}>
            <Radio value="daily" label="Daily, gently" />
            <Radio value="weekly" label="Weekly digest" />
            <Radio value="monthly" label="Monthly bundle" />
          </RadioGroup>
        </View>
      </Panel>

      <Panel title="Delivery" hint="A switch, a slider and a note in the margin.">
        <ToggleRow
          title="Sound on press"
          description="A tiny click for every soft key."
          value={sound}
          onChange={setSound}
          tone="success"
        />
        <View style={{ gap: 8, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 }}>
          <View style={styles.spread}>
            <FieldLabel>Paper weight</FieldLabel>
            <Text variant="mono" color={colors.primary}>
              {Math.round(weight * 100)} gsm
            </Text>
          </View>
          <Slider
            value={weight}
            onValueChange={setWeight}
            min={0.2}
            max={1}
            step={0.05}
            accessibilityLabel="Paper weight"
          />
          <View style={styles.spread}>
            <Text variant="caption" color={colors.onSurfaceMuted}>
              Light
            </Text>
            <Text variant="caption" color={colors.onSurfaceMuted}>
              Heavy
            </Text>
          </View>
        </View>
        <Banner
          visible
          tone="info"
          text="Your studio trial ends in three days. Keep the kit and everything stays pressed."
          icon={<Icon name="leaf-outline" size={18} />}
          actions={[
            {
              label: 'Keep the kit',
              onPress: () => show({ message: 'Trial kept — thank you', tone: 'success' }),
            },
            {
              label: 'Not now',
              onPress: () => show({ message: 'Trial reminder postponed', tone: 'info' }),
            },
          ]}
        />
      </Panel>

      <View style={styles.buttonRow}>
        <Button
          style={{ flex: 1 }}
          onPress={() => show({ message: 'Preferences saved', tone: 'success' })}
        >
          Save preferences
        </Button>
        <Button style={{ flex: 1 }} variant="outline" onPress={reset}>
          Reset
        </Button>
      </View>

      <Footer />
    </Screen>
  );
}

function LayersScreen() {
  const { colors, zIndex } = useTheme();
  const { show } = useToast();
  const [dialog, setDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [menu, setMenu] = useState(false);
  const [snack, setSnack] = useState(false);
  const [note, setNote] = useState('');

  const notify = (message: string) => show({ message, tone: 'success' });

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Intro
          kicker="Layers · Mochi Press"
          title="Things that float, softly."
          body="Dialogs, sheets and menus sit on a blurred warm shadow and a quiet scrim. They are the only parts of the kit allowed to leave the paper."
        />

        <Panel title="Overlay instruments" hint="Four portals, one warm scrim.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Button
              variant="tonal"
              icon={<Icon name="browsers-outline" size={16} />}
              onPress={() => setDialog(true)}
            >
              Dialog
            </Button>
            <Button
              variant="outline"
              tone="error"
              icon={<Icon name="trash-outline" size={16} />}
              onPress={() => setAlert(true)}
            >
              Alert
            </Button>
            <Button
              variant="outline"
              icon={<Icon name="download-outline" size={16} />}
              onPress={() => setSheet(true)}
            >
              Sheet
            </Button>
            <Button
              variant="outline"
              icon={<Icon name="ellipsis-horizontal" size={16} />}
              onPress={() => setMenu(true)}
            >
              Menu
            </Button>
            <Button variant="ghost" onPress={() => setSnack(true)}>
              Snackbar
            </Button>
          </View>
          <View
            style={[
              styles.row,
              { gap: 10, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 12 },
            ]}
          >
            <Tooltip label="Saved for later">
              <IconButton
                icon={<Icon name="bookmark-outline" size={18} />}
                onPress={() => notify('Bookmark pressed')}
                accessibilityLabel="Bookmark"
              />
            </Tooltip>
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="body" weight="500">
                Tooltip
              </Text>
              <Text variant="caption" color={colors.onSurfaceMuted}>
                Press and hold the book key.
              </Text>
            </View>
            <Text variant="mono" color={colors.onSurfaceMuted}>
              HOLD
            </Text>
          </View>
        </Panel>

        <Panel title="Banners" hint="In-flow notes that keep their tone.">
          <Banner
            visible
            tone="success"
            text="Your kit is up to date — v0.4 was pressed this morning."
            icon={<Icon name="checkmark-circle-outline" size={18} />}
          />
          <Banner
            visible
            tone="warning"
            text="Only two pages remain in your studio trial."
            icon={<Icon name="time-outline" size={18} />}
            actions={[
              {
                label: 'Upgrade',
                onPress: () => notify('Upgrade sheet pressed'),
              },
            ]}
          />
        </Panel>

        <Panel title="Stacking" hint="One host, ordered from paper to pin.">
          {(['menu', 'sheet', 'dialog', 'toast', 'tooltip'] as const).map((layer) => (
            <View key={layer} style={styles.spread}>
              <Text variant="body" weight="500">
                {layer}
              </Text>
              <Text variant="mono" color={colors.onSurfaceMuted}>
                {zIndex[layer]}
              </Text>
            </View>
          ))}
        </Panel>

        <Footer />
      </Screen>

      <Dialog
        visible={dialog}
        onDismiss={() => setDialog(false)}
        title="Publish this issue?"
        actions={
          <>
            <Button variant="ghost" size="sm" onPress={() => setDialog(false)}>
              Not yet
            </Button>
            <Button
              size="sm"
              onPress={() => {
                setDialog(false);
                notify('Issue published to 48 readers');
              }}
            >
              Publish
            </Button>
          </>
        }
      >
        <Text variant="body" color={colors.onSurfaceMuted}>
          The October notes will be pressed and sent to 48 readers. You can still edit
          the pages afterwards.
        </Text>
      </Dialog>

      <AlertDialog
        visible={alert}
        onDismiss={() => setAlert(false)}
        title="Delete this draft?"
        message="The pages will be pulped. This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Keep"
        tone="error"
        onConfirm={() => {
          setAlert(false);
          notify('Draft deleted');
        }}
      />

      <BottomSheet
        visible={sheet}
        onDismiss={() => setSheet(false)}
        title="New note"
      >
        <View style={{ gap: 12 }}>
          <TextInput
            label="Title"
            value={note}
            onChangeText={setNote}
            placeholder="A small observation"
            leading={<Icon name="create-outline" size={18} />}
          />
          <View style={styles.buttonRow}>
            <Button variant="outline" style={{ flex: 1 }} onPress={() => setSheet(false)}>
              Cancel
            </Button>
            <Button
              style={{ flex: 1 }}
              onPress={() => {
                setSheet(false);
                notify(note.trim().length > 0 ? 'Note pressed into the book' : 'Blank note pressed in');
                setNote('');
              }}
            >
              Press note
            </Button>
          </View>
        </View>
      </BottomSheet>

      <Menu visible={menu} onDismiss={() => setMenu(false)} width={220}>
        <MenuItem
          label="Copy link"
          leading={<Icon name="link-outline" size={16} color={colors.onSurfaceMuted} />}
          onPress={() => {
            setMenu(false);
            notify('Link copied');
          }}
        />
        <MenuItem
          label="Duplicate page"
          leading={<Icon name="copy-outline" size={16} color={colors.onSurfaceMuted} />}
          onPress={() => {
            setMenu(false);
            notify('Page duplicated');
          }}
        />
        <MenuItem
          label="Archive"
          leading={<Icon name="archive-outline" size={16} color={colors.onSurfaceMuted} />}
          onPress={() => {
            setMenu(false);
            notify('Page archived');
          }}
        />
      </Menu>

      <Snackbar
        visible={snack}
        message="Page moved to the archive."
        action={{ label: 'Undo', onPress: () => setSnack(false) }}
        onDismiss={() => setSnack(false)}
      />
    </View>
  );
}

function TokensScreen() {
  const { colors, spacing, radii, metrics, motion } = useTheme();
  const { mode, toggleMode } = useThemeController();
  const copy = useCopy();

  const swatches = [
    { name: 'Background', value: colors.background },
    { name: 'Surface', value: colors.surface },
    { name: 'Oat', value: colors.surfaceMuted },
    { name: 'Pressed', value: colors.surfaceActive },
    { name: 'Ink', value: colors.onSurface },
    { name: 'Hairline', value: colors.outlineStrong },
    { name: 'Blueberry', value: colors.primary },
    { name: 'Periwinkle', value: colors.primaryMuted },
    { name: 'Sage', value: colors.success },
    { name: 'Amber', value: colors.warning },
    { name: 'Clay', value: colors.error },
    { name: 'Tide', value: colors.info },
  ];

  return (
    <Screen>
      <Intro
        kicker="Tokens · Mochi Press"
        title="The recipe, written down."
        body="Twelve surfaces, one accent family, three voices and a 4pt beat. Every component reads from the same paper."
      />

      <Panel title="Mode" hint="Every token has a warm, low-light twin.">
        <View style={styles.spread}>
          <View style={{ flex: 1, gap: 2, paddingRight: 12 }}>
            <Text variant="body" weight="500">
              {mode === 'dark' ? 'Espresso after hours' : 'Cream by daylight'}
            </Text>
            <Text variant="caption" color={colors.onSurfaceMuted}>
              The switch wins; system mode is only the beginning.
            </Text>
          </View>
          <Switch
            checked={mode === 'dark'}
            onValueChange={toggleMode}
            accessibilityLabel="Dark mode"
          />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          <Badge tone="primary" content={`mode: ${mode}`} dot={false} />
          <Badge tone="neutral" content={`fast ${motion.durationFast}ms`} dot={false} />
          <Badge tone="neutral" content={`base ${motion.durationBase}ms`} dot={false} />
          <Badge tone="neutral" content={`slow ${motion.durationSlow}ms`} dot={false} />
        </View>
      </Panel>

      <Panel title="Palette" hint="Cream paper, espresso ink, one blueberry accent.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {swatches.map((swatch) => (
            <View
              key={swatch.name}
              style={{
                flexBasis: '47%',
                flexGrow: 1,
                borderRadius: radii.md,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: colors.outline,
                backgroundColor: colors.surface,
              }}
            >
              <View style={{ height: 44, backgroundColor: swatch.value }} />
              <View style={{ paddingHorizontal: 10, paddingVertical: 8, gap: 1 }}>
                <Text variant="caption">{swatch.name}</Text>
                <Text variant="mono" color={colors.onSurfaceMuted} style={{ fontSize: 10 }}>
                  {swatch.value.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Panel>

      <Panel title="Type" hint="Fraunces for display, DM Sans for reading, DM Mono for metadata.">
        {TYPE_SAMPLES.map((sample, index) => (
          <View
            key={sample.name}
            style={{
              gap: 4,
              paddingBottom: index === TYPE_SAMPLES.length - 1 ? 0 : 10,
              marginBottom: index === TYPE_SAMPLES.length - 1 ? 0 : 4,
              borderBottomWidth: index === TYPE_SAMPLES.length - 1 ? 0 : 1,
              borderBottomColor: colors.outline,
            }}
          >
            <Text variant={sample.name} numberOfLines={1}>
              {sample.sample}
            </Text>
            <Text variant="mono" color={colors.onSurfaceMuted} style={{ fontSize: 10 }}>
              {sample.name}
            </Text>
          </View>
        ))}
      </Panel>

      <Panel title="Shape & space" hint="Six radii, a 4pt beat, three control heights.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {RADIUS_KEYS.map((key) => (
            <View key={key} style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: radii[key] === 9999 ? 22 : radii[key],
                  backgroundColor: colors.primaryMuted,
                  borderWidth: 1,
                  borderColor: colors.primaryOutline,
                }}
              />
              <Text variant="mono" color={colors.onSurfaceMuted} style={{ fontSize: 10 }}>
                {key}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            gap: 6,
            borderTopWidth: 1,
            borderTopColor: colors.outline,
            paddingTop: 12,
          }}
        >
          {SPACE_KEYS.map((key) => (
            <View key={key} style={[styles.row, { gap: 8 }]}>
              <Text variant="mono" color={colors.onSurfaceMuted} style={{ width: 20 }}>
                {key}
              </Text>
              <View
                style={{
                  height: 8,
                  width: spacing[key],
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                }}
              />
              <Text variant="mono" color={colors.onSurfaceMuted}>
                {spacing[key]}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            gap: 4,
            borderTopWidth: 1,
            borderTopColor: colors.outline,
            paddingTop: 12,
          }}
        >
          <Text variant="mono" color={colors.onSurfaceMuted}>
            control {metrics.control.sm} · {metrics.control.md} · {metrics.control.lg}
          </Text>
          <Text variant="mono" color={colors.onSurfaceMuted}>
            input {metrics.input.md} · {metrics.input.lg}
          </Text>
          <Text variant="mono" color={colors.onSurfaceMuted}>
            icon {metrics.icon.sm} · {metrics.icon.md} · {metrics.icon.lg}
          </Text>
        </View>
      </Panel>

      <Panel title="Principles" hint="Three rules keep the kit quiet.">
        {PRINCIPLES.map((principle, index) => (
          <View key={principle.title} style={[styles.row, { gap: 12, alignItems: 'flex-start' }]}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primaryMuted,
              }}
            >
              <Text variant="mono" color={colors.onPrimaryMuted}>
                {index + 1}
              </Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="body" weight="500">
                {principle.title}
              </Text>
              <Text variant="caption" color={colors.onSurfaceMuted}>
                {principle.body}
              </Text>
            </View>
          </View>
        ))}
      </Panel>

      <Surface
        cast={0}
        radius="lg"
        backgroundColor={colors.surfaceMuted}
        style={{ padding: 14, gap: 8, alignItems: 'center' }}
      >
        <Text variant="mono" color={colors.onSurfaceMuted}>
          mochi press · pressed with care
        </Text>
        <Button
          size="sm"
          variant="outline"
          icon={<Icon name="copy-outline" size={14} />}
          onPress={() => copy(INSTALL, 'Install command copied')}
        >
          {INSTALL}
        </Button>
      </Surface>
    </Screen>
  );
}

function Footer() {
  const { colors } = useTheme();

  return (
    <View style={{ alignItems: 'center', gap: 2, paddingVertical: 8 }}>
      <Text variant="mono" color={colors.onSurfaceMuted}>
        zero deps · native driver
      </Text>
      <Text variant="caption" color={colors.onSurfaceMuted}>
        MeowUI · Mochi Press
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  brandMark: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
