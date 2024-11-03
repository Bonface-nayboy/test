const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Set the entry point to your App.js file
  config.entry = './App.js';

  // Set output configuration
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Ensure unique chunk names using contenthash
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

  // Add a rule for handling asset files
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|ico|eot|ttf|woff|woff2|pdf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]', // Customize output file naming as needed
          outputPath: 'assets/', // Output directory for assets
        },
      },
    ],
  });

  // Set performance hints and limits
  config.performance = {
    hints: 'warning',
    maxAssetSize: 2 * 1024 * 1024, // Increase the limit to 2 MiB
    maxEntrypointSize: 2 * 1024 * 1024, // Increase the limit to 2 MiB
  };

  // Add the CleanWebpackPlugin to clean the output directory before each build
  config.plugins.push(new CleanWebpackPlugin());

  return config;
};
