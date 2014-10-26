angular-form-state [![Build Status](https://travis-ci.org/bendrucker/angular-form-state.svg?branch=master)](https://travis-ci.org/bendrucker/angular-form-state)
==================

Smarter AngularJS forms for reacting to submission states

## Install

```bash
# npm
$ npm install angular-form-state
# bower
$ bower install angular-form-state
```

## Setup

```js
// node module exports the string 'angular-form-state' for convenience
angular.module('myApp', [
  require('angular-form-state')
]);
// otherwise, include the code first then the module name
angular.module('myApp', [
  'angular-form-state'
]);
```

## Usage

### bdSubmit

Replace your `ngSubmit` directives with `bdSubmit`. 

```html
<form bd-submit="submitForm()"></form>
```

In addition to standard `ngSubmit` behavior, the expression passed to `bdSubmit` can return a promise. 

A `submission` objection is attached to [`ngFormController`](https://docs.angularjs.org/api/ng/type/form.FormController) containing:
* **succeeded** *boolean*: `true` if the `bdSubmit` expression returns a value or fulfilled promise
* **failed** *boolean*: `true` if the expression returns a rejected promise
* **error** *object*: The `Error` from a rejected promise returned by the `bdSubmit` expression. Otherwise `null`.
* **pending** *boolean*: `true` if the expression returned a promise that is still pending (not resolved or rejected)
* **attempted** *boolean*: `true` if submission has been attempted at least once
* **attempts** *number*: The number of times that form submission has been attempted. 

Form submission can be reattempted an unlimited number of times. If you wish to prevent users from resubmitting a form that was successfully sent, for example, you should implement that yourself. Submission state (`succeeded`, `failed`, `error`, `pending`) is reset on every new submission attempt and will always reflect the active/most recent submission.

```js
$scope.submit = function () {
  // return a promise, probably from $http
};
```
```html
<form bd-submit="submitForm()" name="myForm">
  <button type="submit">Submit</button>
  <p ng-show="myForm.submission.pending">Submitting...</p>
  <p>Form submitted {{myForm.submission.attempts}} times</p>
</form>
```

### submitButton
`submitButton` can be combined with `bdSubmit` to create a simple text button that:

* Disables itself and changes its text to a customizable message while form submission is pending
* Adds classes that track form submission
* Re-enables itself and restores its text when form submission completes (succeeds or fails)

```html
<form bd-submit="submitForm()" name="myForm">
  <button submit-button pending="Submitting...">Submit</button>
</form>
```

The directive will automatically add `type="submit"` to the element. The following classes are toggled on the element during the form submission lifecycle:

* submit-pending
* submit-suceeded
* submit-failed
