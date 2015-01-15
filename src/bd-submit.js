'use strict';

var angular = require('angular');

module.exports = function ($parse, $q, $exceptionHandler) {
  return {
    require: ['form', 'bdSubmit'],
    controller: function () {
      var self = this;
      this.succeeded = false;
      this.failed = false;
      this.error = null;
      this.pending = false;
      this.attempted = false;
      this.attempts = 0;
      this.set = {
        pending: function () {
          self.pending = true;
          self.succeeded = false;
          self.failed = false;
          self.attempted = true;
          self.attempts++;
          self.error = null;
        },
        success: function () {
          self.succeeded = true;
          self.failed = false;
          self.pending = false;
          self.error = null;
        },
        failure: function (err) {
          self.succeeded = false;
          self.failed = true;
          self.pending = false;
          self.error = err;
          $exceptionHandler(err);
        }
      };
    },
    compile: function () {
      return {
        pre: function (scope, element, attributes, controllers) {
          var formController = controllers[0];
          var submitController = controllers[1];

          angular.extend(formController, {
            submission: submitController
          });
        },
        post: function (scope, element, attributes, controllers) {
          var submitController = controllers[1];
          var fn = $parse(attributes.bdSubmit);
          element.on('submit', function (event) {
            var result;
            scope.$apply(function () {
              result = fn(scope, {$event: event});
              submitController.set.pending();
            });
            $q.when(result)
              .then(function () {
                submitController.set.success();
              })
              .catch(function (err) {
                submitController.set.failure(err);
              });
          });
        }
      };
    }
  };
};

module.exports.$inject = ['$parse', '$q', '$exceptionHandler'];
