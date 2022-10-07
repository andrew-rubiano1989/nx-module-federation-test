// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const { withModuleFederation } = require('@nrwl/react/module-federation');
const baseConfig = require('./module-federation.config');
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;

/**
 * @type {import('@nrwl/react/module-federation').ModuleFederationConfig}
 **/
const defaultConfig = {
  ...baseConfig,
};
const federatedWebpack = withModuleFederation(defaultConfig);

module.exports = new Promise((resolve) => {
  federatedWebpack.then((fn) => {
    resolve((config) => {
      const remoteTypesPlugin = new WebpackRemoteTypesPlugin({
        remotes: {
          datasets: 'datasets@http://localhost:4201/remoteEntry.js',
        },
        outputDir: './apps/app-shell/types', // supports [name] as the remote name
        remoteFileName: '[name]-dts.tgz', // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
      });

      config.plugins.push(remoteTypesPlugin);

      return fn(config);
    });
  });
});
