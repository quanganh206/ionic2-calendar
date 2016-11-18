var p = {
  require: function() {
    
  }
};

if (p.require === window.require)
  p.require();

require.resolve('x');