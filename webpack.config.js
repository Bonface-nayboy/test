const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      // Add other polyfills if necessary
    },
  },
  // other configurations if necessary
};
