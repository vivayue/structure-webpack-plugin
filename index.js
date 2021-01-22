const pluginName = 'StructureWebpackPlugin';

class StructureWebpackPlugin {
  constructor(options = {}){
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
        // 在生成文件中，创建一个头部字符串：
        var filelist = 'In this build:\n\n';
        // 遍历所有编译过的资源文件，
        // 对于每个文件名称，都添加一行内容。
        for (var filename in compilation.assets) {
          filelist += '- ' + filename + '\n';
        }
        // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
        compilation.assets['filelist.md'] = {
          source: function() {
            return filelist;
          },
          size: function() {
            return filelist.length;
          }
        };
        // console.log(`当前工作目录是: ${process.cwd()}`);
        // 使用 webpack 提供的 plugin API 操作构建结果
        // compilation.addModule(/* ... */);
        callback();
      }
    );
  }
}

module.exports = StructureWebpackPlugin;