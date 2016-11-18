var p = {
  require: function () {}
};

if (p.require === window.require) p.require();

$__require.resolve('x');