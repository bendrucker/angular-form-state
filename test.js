'use strict';

/* globals describe:false, beforeEach:false, it:false, sinon:false, expect:false */
/* jshint expr:true */

var angular = require('angular');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('./')));

  describe('bdSubmit', function () {

    var $compile, scope;
    beforeEach(angular.mock.inject(function (_$compile_, $rootScope) {
      $compile = _$compile_;
      scope = $rootScope.$new();
    }));

    describe('Replicating ngSubmit behavior', function () {

      // Tests adapted from Angular's own suite
      // https://github.com/angular/angular.js/blob/master/test/ng/directive/ngEventDirsSpec.js#L12-L41

      it('should get called on form submit', function() {
        var element = $compile('<form bd-submit="submitted = true" />')(scope);
        scope.$digest();
        expect(scope.submitted).to.be.undefined;
        element.triggerHandler('submit');
        expect(scope.submitted).to.equal(true);
      });

      it('should expose event on form submit', function () {
        scope.formSubmission = sinon.spy();
        var element = $compile('<form bd-submit="formSubmission($event)" />')(scope);
        scope.$digest();
        expect(scope.formSubmission).to.not.have.been.called;
        element.triggerHandler('submit');
        expect(scope.formSubmission).to.have.been.calledWith(sinon.match.has('preventDefault'));
      });

    });

    describe('Tracking state', function () {

      it('starts with clean state', function () {

      });

    });
    
  });

});
