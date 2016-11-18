'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    pre: function pre() {
      this.requires = [];
    },

    visitor: {
      CallExpression: function CallExpression(path, _ref2) {
        var _ref2$opts = _ref2.opts;
        var opts = _ref2$opts === undefined ? {} : _ref2$opts;

        var callee = path.node.callee;
        var args = path.node.arguments;

        var _opts$requireName = opts.requireName;
        var requireName = _opts$requireName === undefined ? 'require' : _opts$requireName;
        var _opts$mappedRequireNa = opts.mappedRequireName;
        var mappedRequireName = _opts$mappedRequireNa === undefined ? '$__require' : _opts$mappedRequireNa;
        var map = opts.map;

        // found a require

        if (t.isIdentifier(callee, { name: requireName }) && args.length == 1) {

          // require('x');
          if (t.isStringLiteral(args[0])) {

            var requiredModuleName = args[0].value;

            // mirror behaviour at https://github.com/systemjs/systemjs/blob/0.19.8/lib/cjs.js#L50 to remove trailing slash
            if (requiredModuleName[requiredModuleName.length - 1] == '/') {
              requiredModuleName = requiredModuleName.substr(0, requiredModuleName.length - 1);
            }

            if (typeof map === 'function') {
              requiredModuleName = map(requiredModuleName) || requiredModuleName;
            }

            this.requires.push(requiredModuleName);

            path.replaceWith(t.callExpression(t.identifier(mappedRequireName), [t.stringLiteral(requiredModuleName)]));
          }
          // require(expr)';
        }
      },
      Identifier: function Identifier(path, _ref3) {
        var _ref3$opts = _ref3.opts;
        var opts = _ref3$opts === undefined ? {} : _ref3$opts;

        if (t.isObjectProperty(path.parent) || t.isMemberExpression(path.parent) && path.parent.object !== path.node) {
          return;
        }

        var _opts$requireName2 = opts.requireName;
        var requireName = _opts$requireName2 === undefined ? 'require' : _opts$requireName2;
        var _opts$mappedRequireNa2 = opts.mappedRequireName;
        var mappedRequireName = _opts$mappedRequireNa2 === undefined ? '$__require' : _opts$mappedRequireNa2;


        if (path.node.name === requireName) {
          path.replaceWith(t.identifier(mappedRequireName));
        }
      }
    }
  };
};