import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // GitHub Pages deployment — adjust `base` if you serve from a custom domain.
  site: 'https://heymeowcat.github.io',
  base: '/react-native-meowui',
  integrations: [
    starlight({
      title: 'MeowUI',
      description: 'Soft retro instruments pressed in cream and ink — a zero-dependency UI kit for React Native.',
      favicon: '/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/heymeowcat/react-native-meowui',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Introduction', slug: '' },
        {
          label: 'Getting started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick start', slug: 'getting-started/quick-start' },
            { label: 'Performance', slug: 'getting-started/performance' },
            { label: 'Migrating from 0.2', slug: 'getting-started/migrating' },
          ],
        },
        {
          label: 'Theming',
          items: [
            { label: 'Overview', slug: 'theming/overview' },
            { label: 'Color tokens', slug: 'theming/colors' },
            { label: 'Type & layout tokens', slug: 'theming/tokens' },
            { label: 'Customizing', slug: 'theming/customizing' },
            { label: 'Dark mode', slug: 'theming/dark-mode' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Portals & overlays', slug: 'concepts/portals' },
            { label: 'Icons', slug: 'concepts/icons' },
            { label: 'Accessibility', slug: 'concepts/accessibility' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Overview', slug: 'components' },
            {
              label: 'Primitives',
              collapsed: true,
              items: [
                { label: 'Text', slug: 'components/text' },
                { label: 'Surface', slug: 'components/surface' },
                { label: 'Divider', slug: 'components/divider' },
                { label: 'Pressable', slug: 'components/pressable' },
                { label: 'Portal', slug: 'components/portal' },
                { label: 'Icon', slug: 'components/icon' },
              ],
            },
            {
              label: 'Actions',
              collapsed: true,
              items: [
                { label: 'Button', slug: 'components/button' },
                { label: 'IconButton', slug: 'components/icon-button' },
                { label: 'FAB', slug: 'components/fab' },
                { label: 'Chip', slug: 'components/chip' },
                { label: 'SegmentedButtons', slug: 'components/segmented-buttons' },
                { label: 'ToggleButton', slug: 'components/toggle-button' },
              ],
            },
            {
              label: 'Inputs',
              collapsed: true,
              items: [
                { label: 'TextInput', slug: 'components/text-input' },
                { label: 'Checkbox', slug: 'components/checkbox' },
                { label: 'Radio', slug: 'components/radio' },
                { label: 'Switch', slug: 'components/switch' },
                { label: 'Slider', slug: 'components/slider' },
                { label: 'Searchbar', slug: 'components/searchbar' },
                { label: 'Select', slug: 'components/select' },
              ],
            },
            {
              label: 'Feedback',
              collapsed: true,
              items: [
                { label: 'ActivityIndicator', slug: 'components/activity-indicator' },
                { label: 'ProgressBar', slug: 'components/progress-bar' },
                { label: 'Skeleton', slug: 'components/skeleton' },
                { label: 'Badge', slug: 'components/badge' },
                { label: 'Banner', slug: 'components/banner' },
                { label: 'Snackbar', slug: 'components/snackbar' },
                { label: 'Toast', slug: 'components/toast' },
              ],
            },
            {
              label: 'Overlays',
              collapsed: true,
              items: [
                { label: 'Dialog', slug: 'components/dialog' },
                { label: 'Modal', slug: 'components/modal' },
                { label: 'BottomSheet', slug: 'components/bottom-sheet' },
                { label: 'Menu', slug: 'components/menu' },
                { label: 'Tooltip', slug: 'components/tooltip' },
              ],
            },
            {
              label: 'Display & navigation',
              collapsed: true,
              items: [
                { label: 'Avatar', slug: 'components/avatar' },
                { label: 'Card', slug: 'components/card' },
                { label: 'List', slug: 'components/list' },
                { label: 'Collapsible', slug: 'components/collapsible' },
                { label: 'Tabs', slug: 'components/tabs' },
                { label: 'Appbar', slug: 'components/appbar' },
                { label: 'BottomNavigation', slug: 'components/bottom-navigation' },
                { label: 'Drawer', slug: 'components/drawer' },
                { label: 'DataTable', slug: 'components/data-table' },
              ],
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Contributing', slug: 'resources/contributing' },
            { label: 'Changelog', slug: 'resources/changelog' },
          ],
        },
      ],
    }),
  ],
});
