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
