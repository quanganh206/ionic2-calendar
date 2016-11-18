(function (foo) {
  if (typeof foo != 'undefined' && eval('typeof foo') == 'undefined') {
    exports.cjs = true;
  }
  if (false) {
    foo('foo');
    foo('bar/');
    foo('some' + 'expression');
  }
})(foo);