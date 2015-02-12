'use strict';

var angular         = require('angular');
global.expect       = require('chai').use(require('sinon-chai')).expect;
global.sinon        = require('sinon');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('../')));
  beforeEach(angular.mock.module(function ($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));
  beforeEach(angular.mock.inject(function ($q) {
    require('sinon-as-promised')($q);
  }));
  describe('bdSubmit', require('./bd-submit'));
  describe('submitButton', require('./submit-button'));

});
