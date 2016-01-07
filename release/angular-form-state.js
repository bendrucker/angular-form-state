(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularFormState = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict'

module.exports = function ($parse, $q, $exceptionHandler) {
  function SubmissionController () {
    this.succeeded = false
    this.failed = false
    this.pending = false
    this.attempted = false
    this.attempts = 0
    this.error = null
  }

  SubmissionController.prototype.setPending = function () {
    this.pending = true
    this.succeeded = false
    this.failed = false
    this.attempted = true
    this.attempts++
    this.error = null
  }

  SubmissionController.prototype.setSuccess = function () {
    this.succeeded = true
    this.failed = false
    this.pending = false
    this.error = null
  }

  SubmissionController.prototype.setFailure = function (err) {
    this.succeeded = false
    this.failed = true
    this.pending = false
    this.error = err
    $exceptionHandler(err)
  }

  return {
    require: ['form', 'bdSubmit'],
    controller: SubmissionController,
    compile: function () {
      return {
        pre: function (scope, element, attributes, controllers) {
          var formController = controllers[0]
          var submissionController = controllers[1]

          formController.submission = submissionController
        },
        post: function (scope, element, attributes, controllers) {
          var submissionController = controllers[1]
          var fn = $parse(attributes.bdSubmit)
          element.on('submit', function (event) {
            var result
            scope.$apply(function () {
              result = fn(scope, {$event: event})
              submissionController.setPending()
            })
            $q.when(result)
              .then(function () {
                submissionController.setSuccess()
              })
              .catch(function (err) {
                submissionController.setFailure(err)
              })
          })
        }
      }
    }
  }

}

module.exports.$inject = ['$parse', '$q', '$exceptionHandler']

},{}],2:[function(_dereq_,module,exports){
'use strict'

module.exports = function ($interpolate, $parse) {
  return {
    require: '^bdSubmit',
    restrict: 'A',
    compile: function (element, attributes) {
      if (!attributes.type) {
        attributes.$set('type', 'submit')
      }
      return function (scope, element, attributes, controller) {
        var original = element.text()

        return scope.$watch(isPending, onChange)

        function isPending () {
          return controller.pending
        }

        function ngDisabled () {
          return attributes.ngDisabled && !!$parse(attributes.ngDisabled)(scope)
        }

        function onChange (pending, previous) {
          if (pending === previous) return
          attributes.$set('disabled', pending || ngDisabled())
          var pendingText = attributes.pending
          element.text($interpolate(pending && pendingText != null ? pendingText : original)(scope))
        }
      }
    }
  }
}
module.exports.$inject = ['$interpolate', '$parse']

},{}],3:[function(_dereq_,module,exports){
(function (global){
'use strict'

module.exports = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
  .module('bd.form-state', [])
  .directive('bdSubmit', _dereq_('./bd-submit'))
  .directive('submitButton', _dereq_('./submit-button'))
  .name

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bd-submit":1,"./submit-button":2}]},{},[3])(3)
});