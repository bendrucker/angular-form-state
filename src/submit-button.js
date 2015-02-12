'use strict';

module.exports = function ($interpolate, $parse) {
  return {
    require: '^bdSubmit',
    restrict: 'A',
    compile: function (element, attributes) {
      if (!attributes.type) {
        attributes.$set('type', 'submit');
      }
      return function (scope, element, attributes, controller) {
        var original = element.text();
        scope.submission = controller;
        scope.$watch('submission.pending', function (pending) {
          var disabled = pending;
          if (!disabled && attributes.ngDisabled) {
            disabled = disabled || $parse(attributes.ngDisabled)(scope);
          }
          attributes.$set('disabled', disabled);
          element.text($interpolate(pending ? attributes.pending : original)(scope));
        });
      };
    }
  };
};
module.exports.$inject = ['$interpolate', '$parse'];
