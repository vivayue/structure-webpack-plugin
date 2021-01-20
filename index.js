const fs = require('fs');
const pluginName = 'StructureWebpackPlugin';

class StructureWebpackPlugin {
  constructor(options = {}){
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
        console.log('This is an example plugin!');
        console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

        // 使用 webpack 提供的 plugin API 操作构建结果
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}

module.exports = StructureWebpackPlugin;