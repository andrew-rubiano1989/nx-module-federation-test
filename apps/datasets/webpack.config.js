// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const { withModuleFederation } = require('@nrwl/react/module-federation');
const path = require('path');
const baseConfig = require('./module-federation.config');
const TarWebpackPlugin = require('tar-webpack-plugin').default;

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
      config.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'dts-loader',
            options: {
              ...baseConfig,
              typesOutputDir: '.wp_federation',
            },
          },
        ],
      });

      const tarPlugin = new TarWebpackPlugin({
        // package node-tar as webpack-plugin
        action: 'c', // node-tar method, such as 'c'/'create', 'x'/'extract'
        gzip: true, // Set to any truthy value to create a gzipped archive, or an object with settings for zlib.Gzip()
        cwd: path.resolve(process.cwd(), 'apps/datasets/.wp_federation'), // The current working directory for creating the archive. Defaults to process.cwd().
        file: path.resolve(
          process.cwd(),
          'dist/apps/datasets/datasets-dts.tgz'
        ), // Write the tarball archive to the specified filename. If this is specified, then the callback will be fired when the file has been written, and a promise will be returned that resolves when the file is written. If a filename is not specified, then a Readable Stream will be returned which will emit the file data.
        fileList: ['datasets'], // an array of paths to add to the tarball. Adding a directory also adds its children recursively.
      });

      config.plugins.push(tarPlugin);

      return fn(config);
    });
  });
});
