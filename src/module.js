'use strict';

require('angular').module('bd.form-state', [])
  .directive('bdSubmit', [
    '$parse',
    '$q',
    require('./bd-submit')
  ]);

module.exports = 'bd.form-state';
