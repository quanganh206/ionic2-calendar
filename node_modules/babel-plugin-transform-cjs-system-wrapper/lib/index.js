'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;


  var requireIdentifier = t.identifier('$__require');

  var buildTemplate = (0, _babelTemplate2.default)('\n    SYSTEM_GLOBAL.registerDynamic(MODULE_NAME, [DEPS], true, BODY);\n  ');

  var buildFactory = (0, _babelTemplate2.default)('\n    (function ($__require, exports, module) {\n      BODY\n      return module.exports;\n    })\n  ');

  var buildDefineGlobal = (0, _babelTemplate2.default)('\n     var define, global = this || self, GLOBAL = global;\n  ');

  var buildStaticFilePaths = (0, _babelTemplate2.default)('\n    var __filename = FILENAME, __dirname = DIRNAME;\n  ');

  var buildDynamicFilePaths = (0, _babelTemplate2.default)('\n    var $__pathVars = SYSTEM_GLOBAL.get(\'@@cjs-helpers\').getPathVars(module.id), __filename = $__pathVars.filename, __dirname = $__pathVars.dirname;\n  ');

  var buildRequireResolveFacade = (0, _babelTemplate2.default)('\n    $__require.resolve = function(request) {\n       return SYSTEM_GLOBAL.get(\'@@cjs-helpers\').requireResolve(request, module.id);\n    }\n  ');

  return {
    inherits: require('babel-plugin-transform-cjs-system-require'),
    pre: function pre() {
      this.usesFilePaths = false;
      this.usesRequireResolve = false;
    },

    visitor: {
      CallExpression: function CallExpression(_ref2, _ref3) {
        var node = _ref2.node;
        var _ref3$opts = _ref3.opts;
        var opts = _ref3$opts === undefined ? {} : _ref3$opts;

        var callee = node.callee;

        // test if require.resolve is present
        if (!this.usesRequireResolve && t.isMemberExpression(callee) && t.isIdentifier(callee.object, { name: opts.requireName || 'require' }) && t.isIdentifier(callee.property, { name: 'resolve' })) {
          this.usesRequireResolve = true;
        }
      },
      MemberExpression: function MemberExpression(path, _ref4) {
        var _ref4$opts = _ref4.opts;
        var opts = _ref4$opts === undefined ? {} : _ref4$opts;
        var node = path.node;

        // optimize process.env.NODE_ENV to 'production'

        if (opts.optimize && t.isIdentifier(node.object.object, { name: 'process' }) && t.isIdentifier(node.object.property, { name: 'env' }) && t.isIdentifier(node.property, { name: 'NODE_ENV' })) {
          path.replaceWith(t.stringLiteral('production'));
        }

        if (opts.systemGlobal != 'System' && t.isIdentifier(node.object, { name: 'System' }) && t.isIdentifier(node.property, { name: '_nodeRequire' })) {
          node.object = t.identifier(opts.systemGlobal);
        }
      },
      Identifier: function Identifier(_ref5) {
        var node = _ref5.node;

        // test if file paths are used
        if (t.isIdentifier(node, { name: '__filename' }) || t.isIdentifier(node, { name: '__dirname' })) {
          this.usesFilePaths = true;
        }
      },

      Program: {
        exit: function exit(_ref6, _ref7) {
          var node = _ref6.node;
          var _ref7$opts = _ref7.opts;
          var opts = _ref7$opts === undefined ? {} : _ref7$opts;

          opts.static = opts.static === true || false;

          var systemGlobal = t.identifier(opts.systemGlobal || 'System');

          var moduleName = this.getModuleName();
          moduleName = moduleName ? t.stringLiteral(moduleName) : null;

          var _opts$deps = opts.deps;
          var deps = _opts$deps === undefined ? [] : _opts$deps;

          deps = deps.map(function (d) {
            return t.stringLiteral(d);
          });

          if (this.usesRequireResolve && !opts.static) {
            node.body.unshift(buildRequireResolveFacade({
              SYSTEM_GLOBAL: systemGlobal
            }));
          }

          if (this.usesFilePaths && !opts.static) {
            node.body.unshift(buildDynamicFilePaths({
              SYSTEM_GLOBAL: systemGlobal
            }));
          }

          if (this.usesFilePaths && opts.static) {
            var filename = opts.path || '';
            var dirname = filename.split('/').slice(0, -1).join('/');

            node.body.unshift(buildStaticFilePaths({
              FILENAME: t.stringLiteral(filename),
              DIRNAME: t.stringLiteral(dirname)
            }));
          }

          node.body.unshift(buildDefineGlobal());

          var globals = opts.globals;

          if (globals && Object.keys(globals).length) {
            var globalAssignments = Object.keys(globals).filter(function (g) {
              return globals[g];
            }).map(function (g) {
              var globalIdentifier = t.identifier(g);
              var value = t.callExpression(requireIdentifier, [t.stringLiteral(globals[g])]);
              var assignment = t.assignmentPattern(globalIdentifier, value);
              return t.variableDeclarator(assignment);
            });
            globals = t.variableDeclaration('var', globalAssignments);
            node.body.unshift(globals);
          }

          var factory = buildFactory({
            BODY: node.body
          });

          factory.expression.body.directives = node.directives;
          node.directives = [];

          node.body = [buildTemplate({
            SYSTEM_GLOBAL: systemGlobal,
            MODULE_NAME: moduleName,
            DEPS: deps,
            BODY: factory
          })];
        }
      }
    }
  };
};

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }