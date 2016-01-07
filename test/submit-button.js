'use strict'

/*global describe beforeEach it*/

var angular = require('angular')
require('angular-mocks/ngMock')
var expect = require('chai').expect

module.exports = function () {
  var $compile, scope, element, submission
  beforeEach(angular.mock.inject(function ($injector) {
    $compile = $injector.get('$compile')
    scope = $injector.get('$rootScope').$new()
    element = $compile('<form bd-submit><button submit-button ng-disabled="disabled" pending="Submitting {{name}}">Submit {{name}}</button></form>')(scope).find('button')
    submission = element.controller('bdSubmit')
    scope.name = 'Form'
    scope.$digest()
  }))

  it('uses the initial text', function () {
    expect(element.text()).to.equal('Submit Form')
  })

  it('handles model changes in the initial text', function () {
    scope.name = 'My Form'
    scope.$digest()
    expect(element.text()).to.equal('Submit My Form')
  })

  it('adds type=submit', function () {
    expect(element.attr('type')).to.equal('submit')
  })

  describe('becoming pending', function () {
    beforeEach(function () {
      submission.setPending()
      scope.$digest()
    })

    it('changes the text', function () {
      expect(element.text()).to.equal('Submitting Form')
    })

    it('leaves the original text when no replacement is supplied', function () {
      element = $compile('<form bd-submit><button submit-button>Submit</button></form>')(scope).find('button')
      submission = element.controller('bdSubmit')
      submission.setPending()
      scope.$digest()
      expect(element.text()).to.equal('Submit')
    })

    it('disables the button', function () {
      expect(element.attr('disabled')).to.equal('disabled')
    })

  })

  describe('leaving pending', function () {
    beforeEach(function () {
      submission.setSuccess()
      scope.$digest()
    })

    it('resets the text', function () {
      expect(element.text()).to.equal('Submit Form')
    })

    it('enables the button', function () {
      expect(element.attr('disabled')).to.equal(undefined)
    })

    it('does not enable the button with ngDisabled=true', function () {
      submission.setPending()
      scope.$digest()
      scope.disabled = true
      scope.$digest()
      submission.setSuccess()
      scope.$digest()
      expect(element.attr('disabled')).to.equal('disabled')
    })

  })

}
