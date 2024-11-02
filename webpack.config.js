const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// Optionally import the CleanWebpackPlugin to clean the output directory before each build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Set the entry point to your App.js file
  config.entry = './App.js';

  // Set output configuration with a template for unique chunk filenames
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // Use [name] for unique chunk names
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

  // If you have any CSS files, include this loader
  // webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};


  // Optionally, add the CleanWebpackPlugin to clean the output directory before each build
  config.plugins.push(new CleanWebpackPlugin());

  return config;
};
