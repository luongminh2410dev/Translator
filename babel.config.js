module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          "@app": "./src",
        },
      },
    ],
    ["react-native-worklets-core/plugin"],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR'],
      },
    ],
  ],
};
