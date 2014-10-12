angular-form-state [![Build Status](https://travis-ci.org/bendrucker/angular-form-state.svg?branch=master)](https://travis-ci.org/bendrucker/angular-form-state)
==================

Smarter AngularJS forms for reacting to submission states

## Setup

```bash
$ npm install --save angular-form-state
```
```js
angular.module('yourApp', [
  require('angular-form-state')
]);
```

## Usage

Replace your `ngSubmit` directives with `bdSubmit`. 

```html
<form bd-submit="submitForm()"></form>
```

In addition to standard `ngSubmit` behavior, the expression passed to `bdSubmit` can return a promise. 

An `submission` objection is attached to [`ngFormController`](https://docs.angularjs.org/api/ng/type/form.FormController) containing:
* **succeeded** *boolean*: `true` if the `bdSubmit` expression returns a value or fulfilled promise
* **failed** *boolean*: `true` if the expression returns a rejected promise
* **error** *object*: The `Error` from a rejected promise returned by the `bdSubmit` expression. Otherwise `null`.
* **pending** *boolean*: `true` if the expression returned a promise that is still pending (not resolved or rejected)
* **attempted** *boolean*: `true` if submission has been attempted at least once
* **attempts** *number*: The number of times that form submission has been attempted. 
