'use strict';

require('angular').module('bd.form-state', [])
  .directive('bdSubmit', ['$parse', function ($parse) {
    return {
      require: 'form',
      compile: function ($element, attributes) {
        var fn = $parse(attributes.bdSubmit);
        return function (scope, element) {
          element.on('submit', function (event) {
            scope.$apply(function () {
              fn(scope, {$event: event});
            });
          });
        };
      }
    };
  }]);

module.exports = 'bd.form-state';
