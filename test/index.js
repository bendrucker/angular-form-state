'use strict';

var angular         = require('angular');
global.expect       = require('chai').use(require('sinon-chai')).expect;
global.sinon        = require('sinon');
var sinonAsPromised = require('sinon-as-promised');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('../')));
  beforeEach(angular.mock.inject(function ($q, $rootScope) {
    sinonAsPromised($q);
    sinonAsPromised.setScheduler(function (fn) {
      $rootScope.$evalAsync(fn);
    });
  }));
  describe('bdSubmit', require('./bd-submit'));
  describe('submitButton', require('./submit-button'));

});
