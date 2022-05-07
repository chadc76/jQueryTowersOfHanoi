var path = require('path');
module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.join(__dirname, 'dst'),
    publicPath: '/dst/',
    filename: 'main.js',
  }
};
