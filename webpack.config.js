const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Your modifications here...
  
  // Set the entry point to your App.js file
  config.entry = './App.js';

  // Set output configuration
  
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Ensure contenthash usage
    clean: true,
  };
  

  // Include the fallback for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    vm: false,
  };

  // Ensure Babel processes .js and .jsx files
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-expo'],
      },
    },
  });

  // Add a rule for handling CSS files
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader', 
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: false, // Ensure global styles are not treated as modules
        },
      },
    ],
  });

  // Add the CleanWebpackPlugin
  config.plugins.push(new CleanWebpackPlugin());

  return config;
};
