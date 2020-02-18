// Application Webpack || Configuration
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// Application Module || Env
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const dev = "\'https://dev.the3rdapp.com\'";
const prod = "\'https://www.the3rdapp.com\'";
const stage = "\'https://stage.the3rdapp.com\'";
const local = "\'http://localhost:3000\'";


// Application Module || Export
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = {
  webpack: function (config, env) {
    if (config.plugins[3]['definitions']) {
      config.plugins[3]['definitions']['process.env']['ReactAppBuild'] = `\'${process.env['SERVER']}\'`;
      config.plugins[3]['definitions']['process.env']['ReactAppDomain'] = eval(process.env['SERVER']);
      config.plugins[3]['definitions']['process.env']['ReactAppVersion'] = JSON.stringify(require('./package.json').version);
    }

    if (config.plugins[3]['replacements']) {
      config.plugins[3]['replacements']['ReactAppBuild'] = `\'${process.env['SERVER']}\'`;
      config.plugins[3]['replacements']['ReactAppDomain'] = eval(process.env['SERVER']);
      config.plugins[3]['replacements']['ReactAppVersion'] = JSON.stringify(require('./package.json').version);
    }

    config.module.rules.push(
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: [/node_modules/, /client-production/],
        loader: 'eslint-loader',
        options: {
          emitError: false,
          emitWarning: false,
        },
      },
    );

    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    config.resolve.alias = Object.assign(config.resolve.alias, {
      src: path.resolve(__dirname, 'client-apps/'),
      '@': path.resolve(__dirname, 'client-apps/'),
      '@static': path.resolve(__dirname, 'client-assets/'),
      '@template': path.resolve(__dirname, 'client-assets/client-styles/'),
      '@environment': path.resolve(__dirname, 'client-apps/set-environment/'),
    });

    return config;
  },

  devServer: function (config) {
    return config;
  },

  paths: function (paths, env) {
    paths.appHtml = path.resolve(__dirname, 'index.html');
    paths.appPublic = path.resolve(__dirname, 'client-assets');
    paths.appIndexJs = path.resolve(__dirname, 'client-apps/index.js');
    paths.appBuild = path.resolve(__dirname, 'client-production');
    paths.appSrc = path.resolve(__dirname, 'client-apps');
    return paths;
  },
};
