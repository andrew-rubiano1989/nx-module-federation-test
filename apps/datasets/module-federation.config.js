// // @ts-check

// /**
//  * @type {import('@nrwl/react/module-federation').ModuleFederationConfig}
//  **/

const moduleFederationConfig = {
  name: 'datasets',
  exposes: {
    './App': './src/app/app',
    './Test': './src/app/Test',
  },
};

module.exports = moduleFederationConfig;
