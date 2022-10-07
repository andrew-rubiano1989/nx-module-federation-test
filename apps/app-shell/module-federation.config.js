// @ts-check

/**
 * @type {import('@nrwl/react/module-federation').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'app-shell',
  remotes: [['datasets', 'http://localhost:4201/remoteEntry.js']],
};

module.exports = moduleFederationConfig;
