'use strict';

var angular = require('angular');

angular.module('bd.form-state', [])
  .directive('bdSubmit', ['$parse', '$q', function ($parse, $q) {
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
            self.attempted = true;
            self.attempts++;
          },
          success: function () {
            self.succeeded = true;
            self.failed = false;
            self.pending = false;
            self.error = null;
          },
          failure: function () {
            self.succeeded = false;
            self.failed = true;
            self.pending = false;
            self.error
          }
        }
      },
      compile: function ($element, attributes) {
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
              scope.$apply(function () {
                $q.when(fn(scope, {$event: event}))
                  .then(function () {
                    // submitController
                  });
              });
            });
          }
        };
      }
    };
  }]);

module.exports = 'bd.form-state';
