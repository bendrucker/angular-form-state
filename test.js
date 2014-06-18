'use strict';

/* globals describe:false, beforeEach:false, it:false, sinon:false, expect:false */
/* jshint expr:true */

var angular = require('angular');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('./')));

  describe('bdSubmit', function () {

    var $compile, $timeout, $q, scope, element, controller;
    beforeEach(angular.mock.inject(function ($injector) {
      $compile   = $injector.get('$compile');
      $timeout   = $injector.get('$timeout');
      $q         = $injector.get('$q');
      scope      = $injector.get('$rootScope').$new();
      element    = $compile('<form bd-submit="submitHandler()" />')(scope);
      controller = element.controller('bdSubmit');
    }));

    beforeEach(function () {
      scope.submitHandler = sinon.stub();
    });

    it('attaches submission state to FormController', function () {
      expect(element.controller('form'))
        .to.have.a.property('submission', controller);
    });

    it('starts with clean state', function () {
      expect(controller).to.contain({
        succeeded: false,
        failed: false,
        attempted: false,
        pending: false,
        attempts: 0,
        error: null
      });
    });

    it('tracks attempts', function() {
      sinon.spy(controller.set, 'pending');
      element.triggerHandler('submit');
      expect(controller.set.pending).to.have.been.called;
      expect(controller.pending).to.be.true;
      expect(controller.attempts).to.equal(1);
    });

    it('succeeds when the expression does not return a promise', function () {
      sinon.spy(controller.set, 'success');
      element.triggerHandler('submit');
      expect(controller.set.success).to.not.have.been.called;
      $timeout.flush();
      expect(controller.set.success).to.have.been.called;
    });

    it('succeeds when the expression returns a fulfilled promise', function () {
      var deferred = $q.defer();
      scope.submitHandler.returns(deferred.promise);
      sinon.spy(controller.set, 'success');
      element.triggerHandler('submit');
      expect(controller.set.success).to.not.have.been.called;
      $timeout.flush();
      deferred.resolve();
      expect(controller.set.success).to.not.have.been.called;
      $timeout.flush();
      expect(controller.set.success).to.have.been.called;
    });

    it('fails when the expression returns a rejected promise', function () {
      var deferred = $q.defer();
      scope.submitHandler.returns(deferred.promise);
      sinon.spy(controller.set, 'failure');
      element.triggerHandler('submit');
      var err = new Error();
      deferred.reject(err);
      $timeout.flush();
      expect(controller.set.failure).to.have.been.calledWith(err);
      expect(controller.error).to.equal(err);
    });

    describe('Replicating ngSubmit behavior', function () {

      // Tests adapted from Angular's own suite
      // https://github.com/angular/angular.js/blob/master/test/ng/directive/ngEventDirsSpec.js#L12-L41

      it('should get called on form submit', function() {
        expect(scope.submitHandler).to.not.have.been.called;
        element.triggerHandler('submit');
        expect(scope.submitHandler).to.have.been.called;
      });

      it('should expose $event on form submit', function () {
        element = $compile('<form bd-submit="submitHandler($event)" />')(scope);
        expect(scope.submitHandler).to.not.have.been.called;
        element.triggerHandler('submit');
        expect(scope.submitHandler).to.have.been.calledWith(sinon.match.has('preventDefault'));
      });

    });
    
  });

});
