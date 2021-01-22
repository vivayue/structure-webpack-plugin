# structure-webpack-plugin
The plugin is used to output a directory structure file

## Getting Started
To begin, you'll need to install structure-webpack-plugin:
```
npm install structure-webpack-plugin --save-dev
// or
yarn add structure-webpack-plugin --dev
```
Then add the plugin to your vue.config.js. For example:
```
const StructureWebpackPlugin = require('structure-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StructureWebpackPlugin()
    ]
  }
}
```