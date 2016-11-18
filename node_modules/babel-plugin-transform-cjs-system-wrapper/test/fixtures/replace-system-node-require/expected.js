SystemJS.registerDynamic([], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  SystemJS._nodeRequire("foo");
  SystemJS._nodeRequire("bar");
  return module.exports;
});