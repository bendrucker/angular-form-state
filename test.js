'use strict';

/* globals describe:false, beforeEach:false, it:false, sinon:false, expect:false */
/* jshint expr:true */

var angular = require('angular');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('./')));

  describe('bdSubmit', function () {

    var $compile, scope, element, controller;
    beforeEach(angular.mock.inject(function (_$compile_, $rootScope) {
      $compile   = _$compile_;
      scope      = $rootScope.$new();
      element    = $compile('<form bd-submit="submitHandler()" />')(scope);
      controller = element.controller('bdSubmit');
    }));

    it('attaches submission state to FormController', function () {
      expect(element.controller('form'))
        .to.have.a.property('submission', controller);
    });

    it('starts with clean state', function () {
      expect(controller).to.contain({
        succeeded: false,
        failed: false,
        attempted: false,
        attempts: 0,
        error: null
      });
    });

    describe('Replicating ngSubmit behavior', function () {

      beforeEach(function () {
        scope.submitHandler = sinon.spy();
        scope.$digest();
      });

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
