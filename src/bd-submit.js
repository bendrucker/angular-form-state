'use strict';

module.exports = function ($parse, $q, $exceptionHandler) {

  function SubmissionController () {
    this.succeeded = false;
    this.failed = false;
    this.pending = false;
    this.attempted = false;
    this.attempts = 0;
    this.error = null;
  }

  SubmissionController.prototype.setPending = function () {
    this.pending = true;
    this.succeeded = false;
    this.failed = false;
    this.attempted = true;
    this.attempts++;
    this.error = null;
  };

  SubmissionController.prototype.setSuccess = function () {
    this.succeeded = true;
    this.failed = false;
    this.pending = false;
    this.error = null;
  };

  SubmissionController.prototype.setFailure = function (err) {
    this.succeeded = false;
    this.failed = true;
    this.pending = false;
    this.error = err;
    $exceptionHandler(err);
  };

  return {
    require: ['form', 'bdSubmit'],
    controller: SubmissionController,
    compile: function () {
      return {
        pre: function (scope, element, attributes, controllers) {
          var formController = controllers[0];
          var submissionController = controllers[1];

          formController.submission = submissionController;
        },
        post: function (scope, element, attributes, controllers) {
          var submissionController = controllers[1];
          var fn = $parse(attributes.bdSubmit);
          element.on('submit', function (event) {
            var result;
            scope.$apply(function () {
              result = fn(scope, {$event: event});
              submissionController.setPending();
            });
            $q.when(result)
              .then(function () {
                submissionController.setSuccess();
              })
              .catch(function (err) {
                submissionController.setFailure(err);
              });
          });
        }
      };
    }
  };

};

module.exports.$inject = ['$parse', '$q', '$exceptionHandler'];
