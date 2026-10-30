const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// The library links in via `file:..` (a symlink to the repo root). Metro
// resolves through the symlink to real paths, so hierarchical lookup from
// the library's files would find the repo root's `react` / `react-native`
// and the app would bundle two copies of React ("Invalid hook call").
// Intercept both peers and pin them to the app's own copies.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const isReact = moduleName === 'react' || moduleName.startsWith('react/');
  const isReactNative =
    moduleName === 'react-native' || moduleName.startsWith('react-native/');

  if (isReact || isReactNative) {
    try {
      return {
        type: 'sourceFile',
        filePath: require.resolve(moduleName, { paths: [projectRoot] }),
      };
    } catch {
      // fall through to the default resolver
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Watch the linked library so edits to it rebuild the app.
config.watchFolders = [path.resolve(projectRoot, '..')];

module.exports = config;
