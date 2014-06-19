'use strict';

var angular = require('angular');

describe('bd.form-state', function () {

  beforeEach(angular.mock.module(require('../')));

  describe('bdSubmit', require('./bd-submit'));
  describe('submitButton', require('./submit-button'));

});
