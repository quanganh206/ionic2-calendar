SystemJS.registerDynamic('foobar', ['bar'], true, function ($__require, exports, module) {
  'use strict';

  var f = $__require('foo');
  var define,
      global = this || self,
      GLOBAL = global;
  var $__pathVars = SystemJS.get('@@cjs-helpers').getPathVars(module.id),
      __filename = $__pathVars.filename,
      __dirname = $__pathVars.dirname;

  $__require.resolve = function (request) {
    return SystemJS.get('@@cjs-helpers').requireResolve(request, module.id);
  };

  console.log(__filename);

  (function ($__require) {

    if (typeof $__require != 'undefined' && eval('typeof require') == 'undefined') {
      exports.cjs = true;
    }

    if (false) {
      $__require('foo');
      $__require('bar');
      $__require('some' + 'expression');
    }
  })($__require);

  (function ($__require) {
    $__require.resolve('raboof');
  })($__require);

  exports.env = 'production';
  return module.exports;
});
