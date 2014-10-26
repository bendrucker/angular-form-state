!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.angularFormState=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);

module.exports = function ($parse, $q) {
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

module.exports.$inject = ['$parse', '$q'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

module.exports = function () {
  return {
    require: '^bdSubmit',
    restrict: 'A',
    scope: {
      pending: '@'
    },
    link: function (scope, element, attributes, controller) {
      if (!attributes.type) {
        attributes.$set('type', 'submit');
      }
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

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

(typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null).module('bd.form-state', [])
  .directive('bdSubmit', require('./bd-submit'))
  .directive('submitButton', require('./submit-button.js'));

module.exports = 'bd.form-state';

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bd-submit":1,"./submit-button.js":2}]},{},[3])(3)
});