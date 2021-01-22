const fs = require('fs');
const pluginName = 'StructureWebpackPlugin';
const NOOL = () => { };

class StructureWebpackPlugin {
  constructor(options = {}){
    /**
      * OPTIONS FORMAT
      * const options = {
      *   filename: 'modules.json',
      *   includeNodeModules: false,
      *   callback: () => {},
      * }
      */
     this.options = options;
     this.modules = {};
     this.handleBuildModule = this.handleBuildModule.bind(this);
     this.handleFinishModules = this.handleFinishModules.bind(this);
  }
  handleBuildModule(module) {
    const { loaders } = module;
    const { includeNodeModules } = this.options;
    module.dependencies.forEach(item=>{
      const rawRequest = item.userRequest.replace(process.cwd(), '');
      if (includeNodeModules || !rawRequest.includes('node_modules')) {
        this.modules[rawRequest] = {
          start: (new Date()).getTime(),
          loaders,
          name: rawRequest,
        };
      }
    });
  }
  handleFinishModules(modules) {
    const {
      callback = NOOL,
      filename = 'modules.json',
    } = this.options;
    try {
      const data = JSON.stringify(this.modules);
      const writeToFilePath = `${process.cwd()}/${filename}`;
      /**
        * OUTPUT FORMAT
        * modules.json = {
        *   'src/index.js': {
        *     name: 'src/index.js',
        *     start: 1,
        *     end: 4,
        *     time: 3,
        *     loaders: [ ... ]
        *   },
        *   ...
        * }
        */
      fs.writeFile(writeToFilePath, data, 'utf8', callback);
    } catch (e) {
      console.error(`[${pluginName} ERROR]: `, e);
    }
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(
      pluginName,
      compilation => {
        // 在模块构建开始之前触发
        compilation.hooks.buildModule.tap(
          pluginName,
          this.handleBuildModule
        );
        // 所有模块都完成构建
        compilation.hooks.finishModules.tap(
          pluginName,
          this.handleFinishModules
        );
      }
    );
  }
}

module.exports = StructureWebpackPlugin;