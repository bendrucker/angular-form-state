'use strict';

module.exports = require('angular')
  .module('bd.form-state', [])
  .directive('bdSubmit', require('./bd-submit'))
  .directive('submitButton', require('./submit-button.js'))
  .name;
