'use strict';

module.exports = function () {
  return {
    require: '^bdSubmit',
    restrict: 'A',
    scope: {
      pending: '@'
    },
    link: function (scope, element, attributes, controller) {
      var defaultText = element.text();
      scope.$watch(function () {
        return controller;
      }, function (current, previous) {

        if (!previous.pending && current.pending) {
          element.text(scope.pending);
          attributes.$set('disabled', true);
          element.addClass('submit-pending');
        }
        if (previous.pending && !current.pending) {
          element.text(defaultText);
          attributes.$set('disabled', false);
          element.removeClass('submit-pending');
        }

        if (!previous.succeeded && current.succeeded) {
          element.addClass('submit-succeeded');
        }

        if (!previous.failed && current.failed) {
          element.addClass('submit-failed');
        }
        if (previous.failed && !current.failed) {
          element.removeClass('submit-failed');
        }
      }, true);
    }
  };
};
