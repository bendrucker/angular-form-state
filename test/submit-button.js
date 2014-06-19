'use strict';

var angular = require('angular');

module.exports = function () {

  var $compile, $timeout, scope, element, controller;
  beforeEach(angular.mock.inject(function ($injector) {
    $compile   = $injector.get('$compile');
    scope      = $injector.get('$rootScope').$new();
    $timeout   = $injector.get('$timeout');
    element    = $compile('<form bd-submit><button submit-button pending="Submitting">Submit</button></form>')(scope).children();
    controller = element.controller('bdSubmit');
    scope.$digest();
  }));

  it('uses the initial text', function () {
    expect(element.text()).to.equal('Submit');
  });

  describe('becoming pending', function () {

    beforeEach(function () {
      controller.pending = true;
      scope.$digest();
    });

    it('changes the text', function () {
      expect(element.text()).to.equal('Submitting');
    });

    it('adds a pending class', function () {
      expect(element.hasClass('submit-pending')).to.be.true;
    });

    it('disables the button', function () {
      expect(element.attr('disabled')).to.be.ok;
    });

  });

  describe('leaving pending', function () {

    beforeEach(function () {
      controller.pending = true;
      scope.$digest();
      controller.pending = false;
      scope.$digest();
    });

    it('resets the text', function () {
      expect(element.text()).to.equal('Submit');
    });

    it('removes the pending class', function () {
      expect(element.hasClass('submit-pending')).to.be.false;
    });

    it('enables the button', function () {
      expect(element.attr('disabled')).to.not.be.ok;
    });

  });

  it('adds a success class', function () {
    controller.succeeded = true;
    scope.$digest();
    expect(element.hasClass('submit-succeeded')).to.be.true;
  });

  it('toggles a failure class', function () {
    controller.failed = true;
    scope.$digest();
    expect(element.hasClass('submit-failed')).to.be.true;
    controller.failed = false;
    scope.$digest();
    expect(element.hasClass('submit-failed')).to.be.false;
  });

  it('reverts the text when the form finishes', function () {
    controller.pending = true;
    scope.$digest();
    controller.pending = false;
    scope.$digest();
    expect(element.text()).to.equal('Submit');
  });

};
