'use strict';

require('angular').module('bd.form-state', [])
  .directive('bdSubmit', [
    '$parse',
    '$q',
    require('./bd-submit')
  ])
  .directive('submitButton', require('./submit-button.js'));

module.exports = 'bd.form-state';
